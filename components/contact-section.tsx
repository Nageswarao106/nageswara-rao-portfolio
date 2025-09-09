
'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

const contactInfo = [
  {
    icon: '📧',
    label: 'Email',
    value: 'nageswarao1830@gmail.com',
    href: 'mailto:nageswarao1830@gmail.com'
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: 'Connect with me',
    href: 'https://www.linkedin.com/in/innamuri-nageswara-rao'
  },
  {
    icon: '💻',
    label: 'GitHub',
    value: 'View my code',
    href: 'https://github.com/Nageswarao106'
  },
  {
    icon: '📱',
    label: 'Location',
    value: 'United States',
    href: null
  }
]

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Save to database
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          form_type: 'contact'
        }),
      })

      if (response?.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        
        // Also create mailto link as backup
        const emailBody = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
        )
        const emailSubject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`)
        window.open(`mailto:nageswarao1830@gmail.com?subject=${emailSubject}&body=${emailBody}`)
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Form submission error:', error)
      
      // Fallback to mailto
      const emailBody = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
      )
      const emailSubject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`)
      window.open(`mailto:nageswarao1830@gmail.com?subject=${emailSubject}&body=${emailBody}`)
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  return (
    <section className="min-h-screen py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
            Get In <span className="text-[var(--accent-bright)]">Touch</span>
          </h2>
          <p className="text-[var(--muted)] text-lg max-w-3xl mx-auto">
            Let's discuss how we can work together to build exceptional software solutions. 
            I'm always open to new opportunities and interesting projects.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-light mb-6">Let's Connect</h3>
              <p className="text-[var(--muted)] leading-relaxed mb-8">
                Whether you're looking for a senior developer to join your team, need consultation 
                on your next project, or just want to chat about technology, I'd love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  className="flex items-center space-x-4 p-4 glass hover:glass-strong transition-all duration-300 group"
                >
                  <div className="text-2xl">{info.icon}</div>
                  <div>
                    <h4 className="font-mono text-sm text-[var(--accent-bright)] uppercase tracking-wider mb-1">
                      {info.label}
                    </h4>
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith('http') ? '_blank' : '_self'}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-[var(--muted)] hover:text-white transition-colors duration-300"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-[var(--muted)]">{info.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-4 pt-8"
            >
              <h4 className="font-mono text-sm text-[var(--accent-bright)] uppercase tracking-wider">
                Quick Actions
              </h4>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:nageswarao1830@gmail.com?subject=Let's discuss your project"
                  className="btn-primary text-center"
                >
                  Email Me Directly
                </a>
                <a
                  href="https://www.linkedin.com/in/innamuri-nageswara-rao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-[var(--accent)] text-[var(--accent)] hover:text-black hover:border-[var(--accent-bright)] transition-all duration-300 font-mono text-sm uppercase tracking-wider text-center relative overflow-hidden group"
                >
                  <span className="relative z-10">LinkedIn Profile</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-bright)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="glass p-8 space-y-6">
              <h3 className="text-2xl font-light mb-6">Send a Message</h3>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded font-mono text-sm">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded font-mono text-sm">
                  Sorry, there was an error. Please try the email link instead.
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-sm text-[var(--accent-bright)] uppercase tracking-wider mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-transparent border-b border-[var(--border)] focus:border-[var(--accent-bright)] outline-none py-2 text-white transition-colors duration-300"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label className="block font-mono text-sm text-[var(--accent-bright)] uppercase tracking-wider mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-transparent border-b border-[var(--border)] focus:border-[var(--accent-bright)] outline-none py-2 text-white transition-colors duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-sm text-[var(--accent-bright)] uppercase tracking-wider mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b border-[var(--border)] focus:border-[var(--accent-bright)] outline-none py-2 text-white transition-colors duration-300"
                  placeholder="What would you like to discuss?"
                />
              </div>

              <div>
                <label className="block font-mono text-sm text-[var(--accent-bright)] uppercase tracking-wider mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full bg-transparent border border-[var(--border)] focus:border-[var(--accent-bright)] outline-none p-4 text-white transition-colors duration-300 resize-vertical"
                  placeholder="Tell me about your project or how I can help..."
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn-primary ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                
                <p className="text-xs text-[var(--muted)] mt-4 font-mono text-center">
                  Form data will be securely stored and I'll respond within 24 hours
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
