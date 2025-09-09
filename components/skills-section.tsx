'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface SkillsSectionProps {
  onSkillSelect?: (skill: string) => void
}

export default function SkillsSection({ onSkillSelect }: SkillsSectionProps) {
  const [activeSkillCategory, setActiveSkillCategory] = useState('Backend Development')

  const skills = {
    'Backend Development': [
      'Java 8/11/17', 'Spring Boot', 'Spring MVC', 'Spring Security', 'Microservices',
      'Hibernate/JPA', 'REST APIs', 'GraphQL', 'Apache Kafka', 'RabbitMQ'
    ],
    'Frontend Technologies': [
      'Angular 2-16', 'React.js', 'Vue.js', 'TypeScript', 'HTML5/CSS3',
      'JavaScript', 'Bootstrap', 'Tailwind CSS'
    ],
    'Cloud & DevOps': [
      'AWS', 'Azure', 'Docker', 'Kubernetes', 'Jenkins', 'CI/CD',
      'Maven/Gradle', 'Terraform', 'PCF'
    ],
    'Databases': [
      'Oracle', 'PostgreSQL', 'MongoDB', 'MySQL', 'Redis',
      'DynamoDB', 'Cassandra', 'Elasticsearch'
    ],
    'Testing & Quality': [
      'JUnit', 'Mockito', 'TestNG', 'Selenium', 'Cucumber',
      'JMeter', 'Postman', 'SonarQube'
    ]
  }

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
            Technical <span className="text-[var(--accent-bright)]">Arsenal</span>
          </h2>
          <p className="text-[var(--muted)] text-lg max-w-3xl mx-auto">
            A comprehensive toolkit for building scalable, enterprise-grade applications
          </p>
        </motion.div>

        {/* Skills Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(skills).map((category) => (
            <button
              key={category}
              onClick={() => setActiveSkillCategory(category)}
              className={`px-6 py-2 font-mono text-sm uppercase tracking-wider transition-all duration-300 border ${
                activeSkillCategory === category
                  ? 'border-[var(--accent-bright)] text-[var(--accent-bright)] bg-[var(--surface)]'
                  : 'border-[var(--border)] text-[var(--muted)] hover:border-white hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          key={activeSkillCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {skills[activeSkillCategory as keyof typeof skills].map((skill, index) => (
            <motion.button
              key={skill}
              onClick={() => onSkillSelect?.(skill)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="px-4 py-2 glass text-sm font-mono text-[var(--accent-bright)] hover:glass-strong hover:scale-105 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {skill}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
