
'use client'

import { motion } from 'framer-motion'
import { type Project } from '@/lib/projects-data'

interface ProjectCardProps {
  project: Project
  isHovered: boolean
  onClick: () => void
}

export default function ProjectCard({ project, isHovered, onClick }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="glass cursor-pointer group h-full"
      onClick={onClick}
    >
      {/* Project Visual */}
      <div className="h-48 bg-gradient-to-br from-[var(--surface)] to-[var(--bg)] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl opacity-20 group-hover:opacity-40 transition-opacity duration-300">
            {project.domain === 'Transportation' && '🚛'}
            {project.domain === 'Healthcare' && '🏥'}
            {project.domain === 'Supply Chain' && '⛓️'}
            {project.domain === 'Cloud' && '☁️'}
            {project.domain === 'Fintech' && '💳'}
            {project.domain === 'E-commerce' && '🛒'}
          </div>
        </div>
        
        {/* Hover Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[var(--accent-bright)]/10 to-[var(--accent)]/10"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '100%' : '-100%' }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Status Badge */}
        <div className={`absolute top-4 right-4 px-2 py-1 text-xs font-mono uppercase tracking-wide rounded ${
          project.status === 'Production' 
            ? 'bg-green-500/20 text-green-400' 
            : project.status === 'Development'
            ? 'bg-yellow-500/20 text-yellow-400'
            : 'bg-blue-500/20 text-blue-400'
        }`}>
          {project.status}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-[var(--accent-bright)] uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-xs text-[var(--muted)] font-mono">
              {project.year}
            </span>
          </div>
          <h3 className="text-lg font-medium text-white group-hover:text-[var(--accent-bright)] transition-colors duration-300">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-mono bg-[var(--surface)] text-[var(--muted)] rounded"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 text-xs font-mono text-[var(--accent-bright)]">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Company */}
        {project.company && (
          <div className="text-xs text-[var(--muted)] font-mono">
            @ {project.company}
          </div>
        )}

        {/* Learn More */}
        <div className="pt-2 border-t border-[var(--border)]">
          <span className="text-sm font-mono text-[var(--accent-bright)] group-hover:text-white transition-colors duration-300">
            Learn More →
          </span>
        </div>
      </div>
    </motion.div>
  )
}
