
import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail, type ContactFormData } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { name, email, subject, message, timestamp, form_type } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Prepare contact form data
    const contactData: ContactFormData = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      timestamp: timestamp || new Date().toISOString(),
      form_type: form_type || 'contact'
    }

    // Log the submission
    console.log('Contact form submission:', contactData)

    // Send email notification
    const emailResult = await sendContactEmail(contactData)
    
    if (!emailResult.success) {
      console.error('Failed to send email:', emailResult.error)
      // Still return success to user, but log the error
    }

    return NextResponse.json(
      { 
        message: 'Contact form submitted successfully',
        id: `contact_${Date.now()}`,
        emailSent: emailResult.success
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form submission error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
