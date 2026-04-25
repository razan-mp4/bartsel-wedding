'use client'

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'

type Track = {
  title: string
  src: string
  image: string
}

type AudioPlayerContextType = {
  tracks: Track[]
  currentIndex: number
  currentTrack: Track
  isPlaying: boolean
  isReady: boolean
  play: () => Promise<void>
  pause: () => void
  stop: () => void
  next: () => void
  previous: () => void
  toggle: () => Promise<void>
}

const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null)

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext)
  if (!context) {
    throw new Error('useAudioPlayer must be used inside AudioPlayerProvider')
  }
  return context
}

export default function AudioPlayerProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const tracks = useMemo<Track[]>(
    () => [
      {
        title: 'Can\'t Help Falling in Love — Elvis Presley',
        src: '/music/song-1.m4a',
        image: '/music/song-1.webp',
      },
      {
        title: 'Perfect — Ed Sheeran & Beyoncé',
        src: '/music/song-2.m4a',
        image: '/music/song-2.webp',
      },
      {
        title: 'Until I Found You — Stephen Sanchez',
        src: '/music/song-3.m4a',
        image: '/music/song-3.webp',
      },
      {
        title: 'A Thousand Years — Christina Perri',
        src: '/music/song-4.m4a',
        image: '/music/song-4.webp',
      },
    ],
    []
  )

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const shouldAutoplayRef = useRef(false)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)

  const currentTrack = tracks[currentIndex]

  useEffect(() => {
    const audio = new Audio(tracks[0].src)
    audioRef.current = audio
    audio.preload = 'auto'

    const handleEnded = () => {
      shouldAutoplayRef.current = true
      setCurrentIndex((prev) => (prev + 1) % tracks.length)
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    setIsReady(true)

    return () => {
      audio.pause()
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
    }
  }, [tracks])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const shouldAutoplay = shouldAutoplayRef.current
    audio.src = currentTrack.src
    audio.load()

    if (shouldAutoplay) {
      audio.play().catch(() => {
        setIsPlaying(false)
      })
    }

    shouldAutoplayRef.current = false
  }, [currentTrack])

  const play = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      await audio.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }, [])

  const pause = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    setIsPlaying(false)
  }, [])

  const stop = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
    setIsPlaying(false)
  }, [])

  const next = useCallback(() => {
    shouldAutoplayRef.current = true
    setCurrentIndex((prev) => (prev + 1) % tracks.length)
  }, [tracks.length])

  const previous = useCallback(() => {
    shouldAutoplayRef.current = true
    setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length)
  }, [tracks.length])

  const toggle = useCallback(async () => {
    if (isPlaying) {
      pause()
    } else {
      await play()
    }
  }, [isPlaying, pause, play])

  const value = useMemo(
    () => ({
      tracks,
      currentIndex,
      currentTrack,
      isPlaying,
      isReady,
      play,
      pause,
      stop,
      next,
      previous,
      toggle,
    }),
    [tracks, currentIndex, currentTrack, isPlaying, isReady, play, pause, stop, next, previous, toggle]
  )

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  )
}