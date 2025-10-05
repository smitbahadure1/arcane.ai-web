'use client'

import { SpiralAnimation } from "@/components/ui/spiral-animation"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import WavyBackground from "@/components/ui/blue-meshy-background"
import { useState, useEffect } from 'react'

const SpiralDemo = () => {
  const [titleVisible, setTitleVisible] = useState(false)
  const [blueBackgroundVisible, setBlueBackgroundVisible] = useState(false)

  // Handle navigation to sign-in page
  const navigateToSignIn = () => {
    window.location.href = "/signin"
  }

  // Animation sequence timing
  useEffect(() => {
    // Show title and blue background together after spiral animation completes
    const titleTimer = setTimeout(() => {
      setTitleVisible(true)
      setBlueBackgroundVisible(true) // Show both at the same time
    }, 15000)

    return () => {
      clearTimeout(titleTimer)
    }
  }, []) // Empty dependency array means this runs once on mount

  return (
    <>
      {/* Spiral Animation - fades out when title appears */}
      <div
        className={`
          absolute inset-0 transition-opacity duration-2000
          ${titleVisible ? 'opacity-0' : 'opacity-100'}
        `}
      >
        <SpiralAnimation />
      </div>

      {/* Blue Meshy Background - appears after spiral */}
      {blueBackgroundVisible && (
        <WavyBackground className="min-h-screen">
          <div className="relative z-10 flex min-h-screen items-center justify-center">
            <div className="text-center space-y-6 -mt-16">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white drop-shadow-2xl tracking-wide leading-tight">
                Turning Ideas Into Impact
              </h1>
              <div className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl tracking-[0.1em] uppercase font-bold text-white
                           drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]
                           [text-shadow:_0_0_30px_rgb(255_255_255_/_30%)]">
                ARCANE.AI
              </div>
            </div>
          </div>
        </WavyBackground>
      )}

      {/* Title Text - appears after animation (only when blue background is not visible) */}
      <div
        className={`
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10
          transition-all duration-2000 ease-out w-full
          ${titleVisible && !blueBackgroundVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'}
        `}
      >
        <div className="text-center px-4 w-full">
          <div className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl tracking-[0.1em] uppercase font-bold text-white text-center mb-8
                         drop-shadow-[0_0_20px_RGBA(255,255,255,0.3)]
                         [text-shadow:_0_0_30px_rgb(255_255_255_/_30%)]
                         whitespace-nowrap">
            ARCANE.AI
          </div>
        </div>
      </div>

      {/* Liquid Glass Button - appears below title (only when blue background is not visible) */}
      <div
        className={`
          absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-40 z-20
          transition-all duration-2000 ease-out delay-500
          ${titleVisible && !blueBackgroundVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
      >
        <div className="relative">
          <LiquidButton
            onClick={navigateToSignIn}
            className="text-white font-bold text-xl px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 border-2 border-white/50 shadow-2xl"
            size="xl"
          >
            Get Started
          </LiquidButton>
        </div>
      </div>
    </>
  )
}

export {SpiralDemo}
