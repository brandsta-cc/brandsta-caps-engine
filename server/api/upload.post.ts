import { defineEventHandler, readMultipartFormData, createError, getHeader } from 'h3'

// Utility to escape special characters for valid XML
const escapeXml = (str: string) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)
  if (!formData) throw createError({ statusCode: 400, statusMessage: 'No form data received' })

  const file = formData.find(item => item.name === 'file')
  if (!file) throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })

  const authHeader = getHeader(event, 'authorization')
  if (!authHeader) throw createError({ statusCode: 401, statusMessage: 'Missing authorization' })

  try {
    // 1. Decode your Vue Basic Auth header to get the raw Username & Password
    const base64Auth = authHeader.replace('Basic ', '')
    const [username, password] = Buffer.from(base64Auth, 'base64').toString('utf-8').split(':')

    // 2. Convert the image file to Base64 for the XML transport
    const fileBase64 = file.data.toString('base64')
    const safeName = escapeXml(file.filename || 'upload.jpg')
    const safeType = escapeXml(file.type || 'image/jpeg')

    // 3. Build the official WordPress XML-RPC payload for media uploads
    const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
<methodCall>
  <methodName>wp.uploadFile</methodName>
  <params>
    <param><value><int>1</int></value></param>
    <param><value><string>${escapeXml(username)}</string></value></param>
    <param><value><string>${escapeXml(password)}</string></value></param>
    <param>
      <value>
        <struct>
          <member>
            <name>name</name>
            <value><string>${safeName}</string></value>
          </member>
          <member>
            <name>type</name>
            <value><string>${safeType}</string></value>
          </member>
          <member>
            <name>bits</name>
            <value><base64>${fileBase64}</base64></value>
          </member>
        </struct>
      </value>
    </param>
  </params>
</methodCall>`

    // 4. Fire it securely to the WordPress.com XML-RPC backdoor
    const wpResponse = await fetch('https://hotelcapsfamily.wordpress.com/xmlrpc.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml',
        'User-Agent': 'BrandstaEngine/1.0'
      },
      body: xmlPayload
    })

    const textResponse = await wpResponse.text()

    // 5. Catch XML specific fault codes (like bad passwords)
    if (!wpResponse.ok || textResponse.includes('<name>faultCode</name>')) {
      const faultMatch = textResponse.match(/<name>faultString<\/name>\s*<value>\s*<string>([^<]+)<\/string>/)
      const faultMsg = faultMatch ? faultMatch[1] : 'Upload rejected by WP XML-RPC.'
      throw new Error(faultMsg)
    }

    // 6. Extract the CDN URL that WordPress returns inside the XML
    const urlMatch = textResponse.match(/<name>url<\/name>\s*<value>\s*<string>([^<]+)<\/string>/)
    if (!urlMatch || !urlMatch[1]) {
      throw new Error('Failed to parse uploaded image URL from WordPress response.')
    }

    return { url: urlMatch[1] }
  } catch (error: any) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }
})