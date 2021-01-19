const sendgrid = require('@sendgrid/mail')

export default async function(req, res) {
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY)
  
    const { email, message } = req.body
  
    const content = {
      to: email,
      from: 'noreply@mhrsntrk.com',
      subject: `New Message`,
      text: message,
      html: `<p>${message}</p>`
    }
    try {
      await sendgrid.send(content)
      res.status(200).send('Message sent successfully.')
    } catch (error) {
      console.log('ERROR', error)
      res.status(400).send('Message not sent!')
    }
  }