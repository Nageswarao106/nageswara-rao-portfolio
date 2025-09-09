'use client'

import { motion } from 'framer-motion'

export default function AboutSection() {

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
            About <span className="text-[var(--accent-bright)]">Me</span>
          </h2>
          <p className="text-[var(--muted)] text-lg max-w-3xl mx-auto">
            A passionate software architect with 7+ years of experience transforming complex business challenges into elegant, scalable solutions. I thrive on building enterprise-grade applications that drive real-world impact across diverse industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-light text-white mb-6">
              Crafting Digital <span className="text-[var(--accent-bright)]">Excellence</span>
            </h3>
            <p className="text-[var(--muted)] text-lg leading-relaxed mb-6">
              With over 7 years of experience in enterprise software development, I specialize in 
              building scalable, high-performance applications that drive business growth. My expertise 
              spans across multiple industries including transportation, healthcare, and supply chain management.
            </p>
            <p className="text-[var(--muted)] text-lg leading-relaxed mb-6">
              I believe in clean code, robust architecture, and continuous learning. Every project 
              is an opportunity to push boundaries and deliver solutions that exceed expectations.
            </p>
            <p className="text-[var(--muted)] text-lg leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
              or mentoring fellow developers. I'm passionate about creating software that not only works flawlessly 
              but also makes a meaningful difference in people's lives.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-8"
          >
            {[
              { number: '7+', label: 'Years Experience', icon: '🎯' },
              { number: '12+', label: 'Major Projects', icon: '🚀' },
              { number: '3', label: 'Industries', icon: '🌍' },
              { number: '50+', label: 'Technologies', icon: '⚡' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center glass p-6 rounded-lg hover:glass-strong transition-all duration-300"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-light text-[var(--accent-bright)] mb-2">
                  {stat.number}
                </div>
                <div className="text-sm uppercase tracking-wider text-[var(--muted)] font-mono">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}