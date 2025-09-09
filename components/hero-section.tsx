
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import profilePic from '../profile.jpg'

interface HeroSectionProps {
  onExploreClick: () => void
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const parallaxYTitle = useTransform(scrollYProgress, [0, 1], [0, -100])
  const parallaxYSubtitle = useTransform(scrollYProgress, [0, 1], [0, -50])
  const parallaxYDesc = useTransform(scrollYProgress, [0, 1], [0, -30])
  const parallaxYStats = useTransform(scrollYProgress, [0, 1], [0, -20])
  const titleVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.35 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    })
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef?.current) return
      
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      const xPos = (clientX / innerWidth - 0.5) * 20
      const yPos = (clientY / innerHeight - 0.5) * 20
      
      heroRef.current.style.transform = `translate(${xPos}px, ${yPos}px)`
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6 z-10 max-w-7xl">
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          {/* Subtitle */}
          <div className="order-2 md:order-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-mono text-[var(--accent-bright)] text-sm uppercase tracking-[0.3em]"
              style={{ y: parallaxYSubtitle }}
            >
              Senior Java Developer
            </motion.div>

            {/* Main Title (two lines) */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.9]"
              style={{ y: parallaxYTitle }}
            >
              <motion.span
                className="block bg-gradient-to-r from-[var(--accent-bright)] to-[var(--accent)] bg-clip-text text-transparent uppercase"
                variants={titleVariants} initial="hidden" animate="visible" custom={0}
              >
                Nageswara Rao
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-[var(--accent-bright)] to-[var(--accent)] bg-clip-text text-transparent uppercase"
                variants={titleVariants} initial="hidden" animate="visible" custom={1}
              >
                Innamuri
              </motion.span>
            </motion.h1>

            {/* Detailed intro below name */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-[var(--muted)] text-lg md:text-xl max-w-2xl md:max-w-none leading-relaxed mt-6"
              style={{ y: parallaxYDesc }}
            >
              Architecting scalable enterprise solutions with cutting-edge technology. 
              Transforming complex business requirements into high-performance applications 
              that drive digital innovation across <span className="text-[var(--accent-bright)]">Transportation</span>, 
              <span className="text-[var(--accent-bright)]"> Healthcare</span>, and 
              <span className="text-[var(--accent-bright)]"> Supply Chain</span> domains.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 pt-8"
            >
              <motion.button
                onClick={onExploreClick}
                className="btn-primary"
                data-cursor
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Work
              </motion.button>
              
              <motion.button
                onClick={() => window.open('mailto:nageswarao1830@gmail.com')}
                className="px-6 py-3 border border-[var(--accent)] text-[var(--accent)] hover:text-black hover:border-[var(--accent-bright)] transition-all duration-300 font-mono text-sm uppercase tracking-wider relative overflow-hidden group"
                data-cursor
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Get in Touch</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-bright)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          </div>

          {/* Profile on Right with floating animation */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -8, 0]
              }}
              transition={{ 
                delay: 0.6, 
                duration: 0.8,
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative"
            >
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full p-1"
                   style={{ boxShadow: '0 0 40px rgba(73, 197, 182, 0.35), 0 0 80px rgba(39, 121, 167, 0.25)' }}>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--accent-bright)] shadow-[0_0_20px_rgba(73,197,182,0.8)]" />
                <div className="rounded-full ring-4 ring-[var(--accent-bright)]/60 overflow-hidden bg-black">
                  <Image src={profilePic} alt="Profile" width={600} height={600} className="w-72 h-72 md:w-96 md:h-96 object-cover" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats removed per request */}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={onExploreClick}
      >
        <div className="w-0.5 h-16 bg-gradient-to-b from-[var(--accent-bright)] to-transparent">
          <motion.div
            className="w-full h-8 bg-[var(--accent-bright)]"
            animate={{ y: [0, 32, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
