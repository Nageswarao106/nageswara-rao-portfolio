
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { type Project } from '@/lib/projects-data'
import { X } from 'lucide-react'

interface ProjectDetailModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Focus the modal for keyboard navigation
      modalRef.current.focus()
      
      // Handle mouse wheel events within the modal
      const handleWheel = (e: WheelEvent) => {
        const modal = modalRef.current
        if (modal && modal.contains(e.target as Node)) {
          const scrollableContent = modal.querySelector('.overflow-y-auto') as HTMLElement
          if (scrollableContent) {
            // Allow the scroll to happen naturally within the modal
            // Don't prevent the event, just let it scroll
            return
          }
        }
      }

      // Add wheel event listener to the modal
      modalRef.current.addEventListener('wheel', handleWheel, { passive: true })
      
      return () => {
        if (modalRef.current) {
          modalRef.current.removeEventListener('wheel', handleWheel)
        }
      }
    }
  }, [isOpen])

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            data-modal="project-detail"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden glass-strong rounded-lg focus:outline-none"
            tabIndex={-1}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center glass rounded-full hover:glass-strong transition-all duration-300 group"
            >
              <X size={20} className="text-[var(--muted)] group-hover:text-white transition-colors duration-300" />
            </button>

            {/* Content */}
            <div className="p-8 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--accent)] scrollbar-track-transparent hover:scrollbar-thumb-[var(--accent-bright)] overflow-x-hidden">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-mono text-[var(--accent-bright)] uppercase tracking-wider">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 text-xs font-mono uppercase tracking-wide rounded ${
                      project.status === 'Production' 
                        ? 'bg-green-500/20 text-green-400' 
                        : project.status === 'Development'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {project.status}
                    </span>
                    <span className="text-sm text-[var(--muted)] font-mono">
                      {project.year}
                    </span>
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-light mb-4 text-white">
                  {project.title}
                </h1>

                {project.company && (
                  <p className="text-[var(--muted)] font-mono text-sm mb-4">
                    @ {project.company}
                  </p>
                )}

                <p className="text-lg text-[var(--muted)] leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              {/* Visual Placeholder */}
              <div className="h-64 bg-gradient-to-br from-[var(--surface)] to-[var(--bg)] rounded-lg mb-8 flex items-center justify-center relative overflow-hidden">
                <div className="text-6xl opacity-20">
                  {project.domain === 'Transportation' && '🚛'}
                  {project.domain === 'Healthcare' && '🏥'}
                  {project.domain === 'Supply Chain' && '⛓️'}
                  {project.domain === 'Cloud' && '☁️'}
                  {project.domain === 'Fintech' && '💳'}
                  {project.domain === 'E-commerce' && '🛒'}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-bright)]/5 to-[var(--accent)]/5" />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Technologies */}
                <div>
                  <h3 className="text-xl font-medium text-[var(--accent-bright)] mb-4">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 glass text-sm font-mono text-[var(--accent-bright)] hover:glass-strong transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="text-xl font-medium text-[var(--accent-bright)] mb-4">
                    Key Features
                  </h3>
                  <div className="space-y-3">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-start text-sm text-[var(--muted)]">
                        <span className="text-[var(--accent-bright)] mr-3 mt-1">•</span>
                        <span className="leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="mt-8 pt-8 border-t border-[var(--border)]">
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h4 className="font-mono text-sm text-[var(--accent-bright)] uppercase tracking-wider mb-2">
                      Domain
                    </h4>
                    <p className="text-[var(--muted)]">{project.domain}</p>
                  </div>

                  <div>
                    <h4 className="font-mono text-sm text-[var(--accent-bright)] uppercase tracking-wider mb-2">
                      Year
                    </h4>
                    <p className="text-[var(--muted)]">{project.year}</p>
                  </div>

                  <div>
                    <h4 className="font-mono text-sm text-[var(--accent-bright)] uppercase tracking-wider mb-2">
                      Status
                    </h4>
                    <p className="text-[var(--muted)]">{project.status}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://github.com/Nageswarao106"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-center"
                >
                  View Source Code
                </a>
                <a
                  href="mailto:nageswarao1830@gmail.com?subject=Interested in the project: ${project.title}"
                  className="px-6 py-3 border border-purple-500 text-purple-400 hover:text-white hover:border-purple-400 transition-all duration-300 font-mono text-sm uppercase tracking-wider text-center relative overflow-hidden group"
                >
                  <span className="relative z-10">Discuss Project</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
