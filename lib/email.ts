import nodemailer from 'nodemailer'

// Create a transporter using Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS  // Your Gmail App Password
    }
  })
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  timestamp?: string
  form_type?: string
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    const transporter = createTransporter()
    
    const mailOptions = {
      from: process.env.EMAIL_USER, // Your Gmail address
      to: process.env.EMAIL_USER,   // Send to yourself
      replyTo: data.email,          // Allow direct reply to sender
      subject: `Portfolio Contact: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #49c5b6; border-bottom: 2px solid #49c5b6; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Submitted:</strong> ${new Date(data.timestamp || Date.now()).toLocaleString()}</p>
            <p><strong>Form Type:</strong> ${data.form_type || 'contact'}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <div style="white-space: pre-wrap; line-height: 1.6;">
              ${data.message}
            </div>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #e8f5e8; border-radius: 8px;">
            <p style="margin: 0; color: #2d5a2d;">
              <strong>Quick Actions:</strong><br>
              • Reply directly to this email to respond to ${data.name}<br>
              • Email: ${data.email}
            </p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${data.name}
        Email: ${data.email}
        Subject: ${data.subject}
        Submitted: ${new Date(data.timestamp || Date.now()).toLocaleString()}
        Form Type: ${data.form_type || 'contact'}
        
        Message:
        ${data.message}
        
        Reply directly to this email to respond to ${data.name}
      `
    }
    
    const result = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', result.messageId)
    return { success: true, messageId: result.messageId }
    
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
