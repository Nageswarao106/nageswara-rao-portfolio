
'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-[var(--bg)] z-50 flex items-center justify-center"
    >
      <div className="text-center space-y-8">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="text-4xl font-mono font-bold text-[var(--accent-bright)]">
            NR_DEV.
          </div>
          <motion.div
            className="absolute -inset-4 border border-[var(--accent-bright)]/30 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-4"
        >
          <div className="font-mono text-sm text-[var(--accent-bright)] uppercase tracking-[0.3em]">
            Initializing Portfolio
          </div>
          
          {/* Progress Bar */}
          <div className="w-64 h-1 bg-[var(--surface)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--accent-bright)] to-[var(--accent)]"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          <div className="font-mono text-xs text-[var(--muted)]">
            {progress}%
          </div>
        </motion.div>

        {/* Loading Messages */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="h-6"
        >
          {progress < 30 && (
            <div className="font-mono text-xs text-[var(--muted)] opacity-60">
              Loading 3D environments...
            </div>
          )}
          {progress >= 30 && progress < 60 && (
            <div className="font-mono text-xs text-[var(--muted)] opacity-60">
              Initializing particle systems...
            </div>
          )}
          {progress >= 60 && progress < 90 && (
            <div className="font-mono text-xs text-[var(--muted)] opacity-60">
              Preparing project showcase...
            </div>
          )}
          {progress >= 90 && (
            <div className="font-mono text-xs text-[var(--muted)] opacity-60">
              Almost ready...
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
