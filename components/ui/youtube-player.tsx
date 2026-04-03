'use client'

import { useRef, useState, useEffect } from 'react'
import { Volume2, VolumeX, Maximize } from 'lucide-react'

interface YTPlayer {
  destroy: () => void
  mute: () => void
  unMute: () => void
  setVolume: (vol: number) => void
}

interface YTWindow extends Window {
  YT?: {
    Player: new (
      el: HTMLDivElement,
      config: {
        videoId: string
        playerVars: Record<string, number>
        events: { onReady: () => void }
      },
    ) => YTPlayer
  }
  onYouTubeIframeAPIReady?: () => void
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtube\.com\/embed\/([^?]+)/,
    /youtu\.be\/([^?]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      return match[1]
    }
  }
  return null
}

let apiLoaded = false
let apiLoading = false
const apiCallbacks: (() => void)[] = []

function loadYouTubeAPI(): Promise<void> {
  if (apiLoaded) {
    return Promise.resolve()
  }
  return new Promise((resolve) => {
    apiCallbacks.push(resolve)
    if (apiLoading) {
      return
    }
    apiLoading = true

    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(script)

    const w = window as unknown as YTWindow
    w.onYouTubeIframeAPIReady = () => {
      apiLoaded = true
      apiCallbacks.forEach((cb) => cb())
      apiCallbacks.length = 0
    }
  })
}

interface YouTubePlayerProps {
  youtubeUrl: string
  title?: string
}

export function YouTubePlayer({ youtubeUrl, title = 'Video' }: YouTubePlayerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const playerDivRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YTPlayer | null>(null)
  const [muted, setMuted] = useState(true)
  const [ready, setReady] = useState(false)
  const videoId = extractYouTubeId(youtubeUrl)

  useEffect(() => {
    if (!videoId || !playerDivRef.current) {
      return
    }
    let destroyed = false

    loadYouTubeAPI().then(() => {
      if (destroyed || !playerDivRef.current) {
        return
      }

      const w = window as unknown as YTWindow
      if (!w.YT) {
        return
      }

      playerRef.current = new w.YT.Player(playerDivRef.current, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          playsinline: 1,
          disablekb: 1,
          iv_load_policy: 3,
          fs: 0,
        },
        events: {
          onReady: () => {
            if (!destroyed) {
              setReady(true)
            }
          },
        },
      })
    })

    return () => {
      destroyed = true
      playerRef.current?.destroy()
      playerRef.current = null
    }
  }, [videoId])

  const toggleMute = () => {
    const player = playerRef.current
    if (!player) {
      return
    }
    if (muted) {
      player.unMute()
      player.setVolume(100)
    } else {
      player.mute()
    }
    setMuted(!muted)
  }

  const toggleFullscreen = () => {
    const el = wrapperRef.current
    if (!el) {
      return
    }
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      el.requestFullscreen()
    }
  }

  if (!videoId) {
    return null
  }

  return (
    <div
      ref={wrapperRef}
      className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-black"
    >
      <div ref={playerDivRef} className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)]" />

      {/* Click shield - prevents YouTube default interactions */}
      <div className="absolute inset-0 z-[1]" />

      {ready && (
        <>
          <button
            onClick={toggleMute}
            className="absolute bottom-4 left-4 z-10 p-2.5 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-sm transition-colors"
            aria-label={muted ? 'Zapnout zvuk' : 'Vypnout zvuk'}
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <button
            onClick={toggleFullscreen}
            className="absolute bottom-4 right-4 z-10 p-2.5 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-sm transition-colors"
            aria-label={`${title} - Celá obrazovka`}
          >
            <Maximize className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  )
}
