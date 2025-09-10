
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'
import { type Project } from '@/lib/projects-data'
import Lenis from 'lenis'

// Components
import LoadingScreen from '@/components/loading-screen'
import CustomCursor from '@/components/custom-cursor'
import Navigation from '@/components/navigation'
import HeroSection from '@/components/hero-section'
import AboutSection from '@/components/about-section'
import SkillsSection from '@/components/skills-section'
import ExperienceSection from '@/components/experience-section'
import ProjectsSection from '@/components/projects-section'
import ContactSection from '@/components/contact-section'
import ProjectDetailModal from '@/components/project-detail-modal'

// Clean imports without WebGL dependencies

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)
  const savedScrollPosition = useRef<number>(0)
  const { scrollYProgress } = useScroll()
  const layerGradY = useTransform(scrollYProgress, [0, 1], [0, 40])
  const layerGridY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const layerParticlesY = useTransform(scrollYProgress, [0, 1], [0, 80])

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Handle loading completion
  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  // Handle section changes
  const handleSectionChange = (section: string) => {
    setActiveSection(section)

    // Smooth scroll to section
    const element = document.getElementById(section)
    if (element) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(element, { duration: 1.1, easing: (t: number) => 1 - Math.pow(1 - t, 3) })
      } else {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  // Handle project selection
  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project)
    setIsProjectModalOpen(true)
  }

  const handleCloseProjectModal = () => {
    setIsProjectModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  // Handle scroll-based section detection
  useEffect(() => {
    // Don't run section detection when modal is open
    if (isProjectModalOpen) return

    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (activeSection !== section) {
              setActiveSection(section)
            }
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeSection, isProjectModalOpen])

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    if (prefersReducedMotion) return
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true
    })
    lenisRef.current = lenis

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [prefersReducedMotion])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isProjectModalOpen) {
      // Store the current scroll position BEFORE any changes
      savedScrollPosition.current = window.scrollY
      console.log('Modal opened, saved scroll position:', savedScrollPosition.current)
      
      // Lock the body in place immediately
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'
      document.body.style.width = '100%'
      document.body.style.height = '100%'
      
      // Prevent scroll events on the body only
      const preventBodyScroll = (e: Event) => {
        // Check if the event is coming from within the modal
        const target = e.target as Element
        const modal = document.querySelector('[data-modal="project-detail"]')
        
        if (modal && modal.contains(target)) {
          // Allow scrolling within the modal - don't prevent the event
          return
        }
        
        // For wheel events, check if we're inside the modal content area
        if (e.type === 'wheel') {
          const scrollableContent = modal?.querySelector('.overflow-y-auto') as HTMLElement
          if (scrollableContent && scrollableContent.contains(target)) {
            // Allow wheel events within the modal content
            return
          }
        }
        
        // Prevent scrolling on the body
        e.preventDefault()
        e.stopPropagation()
      }
      
      // Add event listeners to prevent body scrolling
      document.addEventListener('wheel', preventBodyScroll, { passive: false })
      document.addEventListener('touchmove', preventBodyScroll, { passive: false })
      document.addEventListener('scroll', preventBodyScroll, { passive: false })
      
      // Prevent keyboard scrolling on body only
      const preventKeyboardScroll = (e: KeyboardEvent) => {
        const target = e.target as Element
        const modal = document.querySelector('[data-modal="project-detail"]')
        
        if (modal && modal.contains(target)) {
          // Allow keyboard navigation within the modal
          return
        }
        
        // Prevent keyboard scrolling on body
        if ([32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
          e.preventDefault()
        }
      }
      
      document.addEventListener('keydown', preventKeyboardScroll, { passive: false })
      
      return () => {
        console.log('Modal closing, restoring scroll position:', savedScrollPosition.current)
        
        // Remove event listeners
        document.removeEventListener('wheel', preventBodyScroll)
        document.removeEventListener('touchmove', preventBodyScroll)
        document.removeEventListener('scroll', preventBodyScroll)
        document.removeEventListener('keydown', preventKeyboardScroll)
        
        // Restore body styles
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.right = ''
        document.body.style.overflow = ''
        document.body.style.width = ''
        document.body.style.height = ''
        
        // Restore scroll position immediately
        console.log('Restoring scroll to:', savedScrollPosition.current)
        window.scrollTo(0, savedScrollPosition.current)
        
        // Also restore with Lenis if available
        if (lenisRef.current) {
          lenisRef.current.scrollTo(savedScrollPosition.current, { immediate: true })
        }
        
        // Force a reflow to ensure the scroll position is set
        document.body.offsetHeight
        
        // Use a small timeout to ensure scroll position is properly restored
        setTimeout(() => {
          window.scrollTo(0, savedScrollPosition.current)
          if (lenisRef.current) {
            lenisRef.current.scrollTo(savedScrollPosition.current, { immediate: true })
          }
        }, 10)
      }
    }
  }, [isProjectModalOpen])

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: isLoading ? 0 : 0.2 }}
        className="relative"
      >
        {/* Custom Cursor disabled per request */}

        {/* Sophisticated CSS Background */}
        <div className="fixed inset-0 -z-10">
          {/* Subtle video texture */}
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-overlay"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          >
            <source src="https://cdn.coverr.co/videos/coverr-grainy-noise-3034/1080p.mp4" type="video/mp4" />
          </video>
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
          {/* Vignette for cinematic depth */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(100% 60% at 50% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.6) 100%)'
            }}
          />
          
          {/* Animated gradient overlay */}
          {!prefersReducedMotion && (
            <motion.div style={{ y: layerGradY }} className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-cyan-900/20 animate-pulse" />
          )}
          
          {/* Subtle grid pattern */}
          <motion.div 
            style={{ 
              y: layerGridY,
              backgroundImage: `radial-gradient(circle at 25% 25%, #49c5b6 1px, transparent 1px),
                               radial-gradient(circle at 75% 75%, #2779a7 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              backgroundPosition: '0 0, 25px 25px'
            }}
            className="absolute inset-0 opacity-5"
          />
          
          {/* Floating particles effect */}
          {!prefersReducedMotion && (
            <motion.div style={{ y: layerParticlesY }} className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-60" />
              <div className="absolute top-3/4 right-1/4 w-0.5 h-0.5 bg-blue-400 rounded-full animate-ping opacity-40" />
              <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse opacity-30" />
              <div className="absolute top-1/6 right-1/3 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-ping opacity-50" />
              <div className="absolute bottom-1/4 left-1/6 w-1 h-1 bg-blue-300 rounded-full animate-pulse opacity-40" />
            </motion.div>
          )}

          {/* Subtle noise overlay */}
          <div className="absolute inset-0 noise-overlay" />
        </div>

        {/* Navigation */}
        <Navigation 
          activeSection={activeSection} 
          onSectionChange={handleSectionChange}
        />

        {/* Main Content */}
        <main className="relative z-10">
          {/* Hero Section */}
          <section id="home">
            <HeroSection 
              onExploreClick={() => handleSectionChange('projects')}
            />
          </section>

          {/* About Section */}
          <section id="about">
            <AboutSection />
          </section>

          {/* Skills Section */}
          <section id="skills">
            <SkillsSection onSkillSelect={(skill) => console.log('Selected skill:', skill)} />
          </section>

          {/* Experience Section */}
          <section id="experience">
            <ExperienceSection />
          </section>

          {/* Projects Section */}
          <section id="projects">
            <ProjectsSection onProjectSelect={handleProjectSelect} />
          </section>

          {/* Contact Section */}
          <section id="contact">
            <ContactSection />
          </section>
        </main>

        {/* Project Detail Modal */}
        <ProjectDetailModal
          project={selectedProject}
          isOpen={isProjectModalOpen}
          onClose={handleCloseProjectModal}
        />

        {/* Back to Top Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: activeSection !== 'home' ? 1 : 0,
            scale: activeSection !== 'home' ? 1 : 0.8
          }}
          transition={{ duration: 0.3 }}
          onClick={() => handleSectionChange('home')}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 glass rounded-full flex items-center justify-center hover:glass-strong transition-all duration-300 group"
        >
          <span className="text-[var(--accent-bright)] group-hover:text-white transition-colors duration-300">
            ↑
          </span>
        </motion.button>

        {/* Footer */}
        <footer className="relative z-10 py-8 px-6 border-t border-[var(--border)]">
          <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center">
            <div className="font-mono text-sm text-[var(--muted)] mb-4 md:mb-0">
              © 2024 Nageswara Rao Innamuri. Crafted with precision.
            </div>
            
            <div className="flex items-center space-x-6">
              <a
                href="mailto:nageswarao1830@gmail.com"
                className="px-4 py-2 border border-red-500 text-red-400 hover:text-white hover:border-red-400 transition-all duration-300 font-mono text-sm uppercase tracking-wider relative overflow-hidden group"
              >
                <span className="relative z-10">Email</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </a>
              <a
                href="https://www.linkedin.com/in/innamuri-nageswara-rao"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-blue-500 text-blue-400 hover:text-white hover:border-blue-400 transition-all duration-300 font-mono text-sm uppercase tracking-wider relative overflow-hidden group"
              >
                <span className="relative z-10">LinkedIn</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </a>
              <a
                href="https://github.com/Nageswarao106"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-green-500 text-green-400 hover:text-white hover:border-green-400 transition-all duration-300 font-mono text-sm uppercase tracking-wider relative overflow-hidden group"
              >
                <span className="relative z-10">GitHub</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </footer>
      </motion.div>
    </>
  )
}
