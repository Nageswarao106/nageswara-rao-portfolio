'use client'

import { motion } from 'framer-motion'

export default function ExperienceSection() {
  const experiences = [
    {
      company: 'Canadian Pacific Kansas City (CPKC)',
      position: 'Senior Java Developer',
      duration: 'Mar 2023 - Present',
      location: 'United States',
      description: 'Leading development of Transportation Logistics Management System processing bulk data for North America\'s largest railway network.',
      achievements: [
        'Architected microservices handling 1M+ daily transactions',
        'Improved system performance by 40% through optimization',
        'Led team of 5 developers in agile environment'
      ]
    },
    {
      company: 'Alliance One Industries India Pvt. Ltd',
      position: 'Java Full Stack Developer',
      duration: 'Feb 2021 - Dec 2022',
      location: 'India',
      description: 'Developed Supply Chain Management platform with global procurement and distribution operations.',
      achievements: [
        'Built platform serving 35+ countries',
        'Implemented real-time inventory tracking',
        'Reduced order processing time by 60%'
      ]
    },
    {
      company: 'Microspark Solution',
      position: 'Java/J2EE Developer',
      duration: 'Nov 2017 - Jan 2021',
      location: 'India',
      description: 'Developed Healthcare Management System for patient management and provider network solutions.',
      achievements: [
        'Built HIPAA-compliant patient management system',
        'Integrated with 20+ healthcare providers',
        'Achieved 99.9% system uptime'
      ]
    }
  ]

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Professional <span className="text-[var(--accent-bright)]">Journey</span>
          </h2>
          <p className="text-[var(--muted)] text-lg max-w-3xl mx-auto">
            Building enterprise solutions with a focus on scalability and performance
          </p>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="glass p-8 hover:glass-strong transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                <div>
                  <h4 className="text-xl font-medium text-[var(--accent-bright)] mb-2">
                    {exp.position}
                  </h4>
                  <p className="text-[var(--muted)] mb-1">{exp.company}</p>
                  <p className="text-sm text-[var(--muted)] font-mono">{exp.location}</p>
                </div>
                <span className="font-mono text-sm text-[var(--accent)] bg-[var(--surface)] px-3 py-1 rounded mt-2 lg:mt-0">
                  {exp.duration}
                </span>
              </div>
              
              <p className="text-[var(--muted)] mb-4 leading-relaxed">
                {exp.description}
              </p>
              
              <div className="space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <div key={i} className="flex items-center text-sm text-[var(--muted)]">
                    <span className="text-[var(--accent-bright)] mr-2">•</span>
                    {achievement}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
