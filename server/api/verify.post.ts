import { defineEventHandler, createError, getHeader } from 'h3'

const escapeXml = (str: string) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization')
  
  if (!authHeader) {
    throw createError({ statusCode: 401, statusMessage: 'Missing credentials' })
  }

  try {
    const base64Auth = authHeader.replace('Basic ', '')
    const [username, password] = Buffer.from(base64Auth, 'base64').toString('utf-8').split(':')

    // XML-RPC payload for a lightweight identity check
    const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
<methodCall>
  <methodName>wp.getUsersBlogs</methodName>
  <params>
    <param><value><string>${escapeXml(username)}</string></value></param>
    <param><value><string>${escapeXml(password)}</string></value></param>
  </params>
</methodCall>`

    const wpResponse = await fetch('https://hotelcapsfamily.wordpress.com/xmlrpc.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml',
        'User-Agent': 'BrandstaEngine/1.0'
      },
      body: xmlPayload
    })

    const textResponse = await wpResponse.text()

    // Catch any XML-RPC rejection (like a bad password)
    if (!wpResponse.ok || textResponse.includes('<name>faultCode</name>')) {
      const faultMatch = textResponse.match(/<name>faultString<\/name>\s*<value>\s*<string>([^<]+)<\/string>/)
      const faultMsg = faultMatch ? faultMatch[1] : 'Invalid App Password.'
      throw new Error(faultMsg)
    }

    return { success: true }
  } catch (error: any) {
    throw createError({ statusCode: 401, statusMessage: error.message || 'Authentication failed' })
  }
})