import { defineEventHandler, readBody, createError, getHeader } from 'h3'


const escapeXml = (str: string) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { pageId, payload } = body

  if (!pageId || !payload) {
    throw createError({ statusCode: 400, statusMessage: 'Missing pageId or payload' })
  }

  const authHeader = getHeader(event, 'authorization')
  if (!authHeader) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  try {
    const base64Auth = authHeader.replace('Basic ', '')
    const [username, password] = Buffer.from(base64Auth, 'base64').toString('utf-8').split(':')

    // Format the payload safely for the WordPress visual editor
    const finalHtml = `<!-- wp:html --><pre>${JSON.stringify(payload, null, 2)}</pre><!-- /wp:html -->`
    const escapedHtml = escapeXml(finalHtml)

    // Build the official WordPress XML-RPC payload for saving page data
    const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
<methodCall>
  <methodName>wp.editPost</methodName>
  <params>
    <param><value><int>1</int></value></param>
    <param><value><string>${escapeXml(username)}</string></value></param>
    <param><value><string>${escapeXml(password)}</string></value></param>
    <param><value><int>${pageId}</int></value></param>
    <param>
      <value>
        <struct>
          <member>
            <name>post_content</name>
            <value><string>${escapedHtml}</string></value>
          </member>
        </struct>
      </value>
    </param>
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

    if (!wpResponse.ok || textResponse.includes('<name>faultCode</name>')) {
      const faultMatch = textResponse.match(/<name>faultString<\/name>\s*<value>\s*<string>([^<]+)<\/string>/)
      const faultMsg = faultMatch ? faultMatch[1] : 'Save rejected by WP XML-RPC.'
      throw new Error(faultMsg)
    }

    return { success: true }
  } catch (error: any) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }
})