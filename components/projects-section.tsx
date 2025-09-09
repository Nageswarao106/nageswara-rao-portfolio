
'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { projects, type Project } from '@/lib/projects-data'
import ProjectCard from './project-card'

interface ProjectsSectionProps {
  onProjectSelect: (project: Project) => void
}

const domains = ['All', 'Transportation', 'Healthcare', 'Supply Chain', 'Cloud', 'Fintech', 'E-commerce']

export default function ProjectsSection({ onProjectSelect }: ProjectsSectionProps) {
  const [selectedDomain, setSelectedDomain] = useState('All')
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const filteredProjects = selectedDomain === 'All' 
    ? projects 
    : projects.filter(project => project.domain === selectedDomain)

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
            Featured <span className="text-[var(--accent-bright)]">Projects</span>
          </h2>
          <p className="text-[var(--muted)] text-lg max-w-3xl mx-auto">
            Discover a collection of enterprise-grade applications built with cutting-edge 
            technologies across Transportation, Healthcare, and Supply Chain domains.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {domains.map((domain) => (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`px-6 py-2 font-mono text-sm uppercase tracking-wider transition-all duration-300 border ${
                selectedDomain === domain
                  ? 'border-[var(--accent-bright)] text-[var(--accent-bright)] bg-[var(--surface)]'
                  : 'border-[var(--border)] text-[var(--muted)] hover:border-white hover:text-white'
              }`}
            >
              {domain}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              <ProjectCard
                project={project}
                isHovered={hoveredProject === project.id}
                onClick={() => onProjectSelect(project)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Projects Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-16 font-mono text-sm text-[var(--muted)] uppercase tracking-wider"
        >
          Showing {filteredProjects.length} of {projects.length} projects
        </motion.div>
      </div>
    </section>
  )
}
