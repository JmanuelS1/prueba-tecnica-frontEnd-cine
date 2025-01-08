'use client'

import React from 'react'
import { motion } from 'framer-motion'

const MovieLoading = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="relative w-64 h-36 bg-gray-800 rounded-lg overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-mainGrey to-inputGrey"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-16 h-16 border-4 border-white rounded-full border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
        </div>
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-white"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        />
      </div>
      <motion.p
        className="absolute mt-24 text-white text-xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse' }}
      >
        Loading Movies...
      </motion.p>
    </div>
  )
}

export default MovieLoading

