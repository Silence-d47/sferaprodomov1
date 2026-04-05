'use client'

import { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'

interface BackgroundVideoProps {
  videoWebm?: string
  videoMp4?: string
  posterImage: string
  opacity?: number
}

export function BackgroundVideo({
  videoWebm,
  videoMp4,
  posterImage,
  opacity = 20,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Preload poster image for fast LCP
  ReactDOM.preload(posterImage, { as: 'image', fetchPriority: 'high' })

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return
    }

    const handleCanPlay = () => setIsVideoReady(true)
    const handleError = () => setHasError(true)

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('error', handleError)

    if (video.readyState >= 3) {
      handleCanPlay()
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('error', handleError)
    }
  }, [])

  const hasVideo = videoWebm || videoMp4
  const opacityValue = opacity / 100

  if (!hasVideo || hasError) {
    return (
      <div className="absolute inset-0">
        <img
          src={posterImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: opacityValue }}
        />
      </div>
    )
  }

  return (
    <div className="absolute inset-0">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={posterImage}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        style={{ opacity: opacityValue }}
      >
        {videoWebm && <source src={videoWebm} type="video/webm" />}
        {videoMp4 && <source src={videoMp4} type="video/mp4" />}
      </video>
    </div>
  )
}
