'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { Volume2, VolumeX, Maximize } from 'lucide-react'

interface YTPlayer {
  destroy: () => void
  mute: () => void
  unMute: () => void
  setVolume: (vol: number) => void
  getCurrentTime: () => number
  getDuration: () => number
  seekTo: (seconds: number, allowSeekAhead: boolean) => void
  getPlayerState: () => number
}

interface YTWindow extends Window {
  YT?: {
    Player: new (
      el: HTMLDivElement,
      config: {
        videoId: string
        playerVars: Record<string, number>
        events: { onReady: () => void; onStateChange?: (e: { data: number }) => void }
      },
    ) => YTPlayer
    PlayerState: {
      PLAYING: number
      PAUSED: number
      ENDED: number
    }
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

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

interface YouTubePlayerProps {
  youtubeUrl: string
  title?: string
}

export function YouTubePlayer({ youtubeUrl, title = 'Video' }: YouTubePlayerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const playerDivRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YTPlayer | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [muted, setMuted] = useState(true)
  const [ready, setReady] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [_isSeeking, setIsSeeking] = useState(false)
  const videoId = extractYouTubeId(youtubeUrl)

  const startProgressTracking = useCallback(() => {
    if (intervalRef.current) {
      return
    }
    intervalRef.current = setInterval(() => {
      const player = playerRef.current
      if (!player) {
        return
      }
      const dur = player.getDuration()
      const cur = player.getCurrentTime()
      if (dur > 0) {
        setDuration(dur)
        setCurrentTime(cur)
        setProgress((cur / dur) * 100)
      }
    }, 250)
  }, [])

  const stopProgressTracking = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

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
              startProgressTracking()
            }
          },
          onStateChange: (e) => {
            if (destroyed) {
              return
            }
            // 0 = ended, 1 = playing
            if (e.data === 0) {
              playerRef.current?.seekTo(0, true)
            } else if (e.data === 1) {
              startProgressTracking()
            } else {
              stopProgressTracking()
            }
          },
        },
      })
    })

    return () => {
      destroyed = true
      stopProgressTracking()
      playerRef.current?.destroy()
      playerRef.current = null
    }
  }, [videoId, startProgressTracking, stopProgressTracking])

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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setProgress(value)
    setCurrentTime((value / 100) * duration)
  }

  const commitSeek = () => {
    const seekTime = (progress / 100) * duration
    playerRef.current?.seekTo(seekTime, true)
    setIsSeeking(false)
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
          {/* Timeline slider at top */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent pb-8 pt-3 px-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/70 tabular-nums w-8 text-right">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progress}
                onChange={handleSeek}
                onMouseDown={() => setIsSeeking(true)}
                onMouseUp={commitSeek}
                onTouchStart={() => setIsSeeking(true)}
                onTouchEnd={commitSeek}
                className="flex-1 h-1 appearance-none bg-white/30 rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md"
                aria-label="Video timeline"
              />
              <span className="text-[10px] text-white/70 tabular-nums w-8">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Controls at bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/60 to-transparent pt-8 pb-3 px-3">
            <div className="flex items-center justify-between">
              <button
                onClick={toggleMute}
                className="p-1.5 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-sm transition-colors"
                aria-label={muted ? 'Zapnout zvuk' : 'Vypnout zvuk'}
              >
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-1.5 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-sm transition-colors"
                aria-label={`${title} - Celá obrazovka`}
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
