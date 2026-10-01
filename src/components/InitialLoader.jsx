import { useEffect, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { projects } from '../data/projects'

const INDEX_IMAGES = [
  '/images/bultang1.jpeg',
  '/images/andika.jpeg',
  '/images/andika2.jpeg',
  '/images/andika3.jpeg',
  '/images/andika4.jpeg',
  '/images/rumahpohon.jpeg',
  'https://framerusercontent.com/images/8wgAGnv2ys0wbxkJwJj9258.png?width=2639&height=1752',
]

const INDEX_VIDEO = '/video/andika_raindropeffect.mp4'
const ASSET_TIMEOUT = 12000
const MINIMUM_DISPLAY_TIME = 1200
const preloadPromises = new Map()

function getPortfolioAssets() {
  const images = new Set(INDEX_IMAGES)
  const videos = new Set([INDEX_VIDEO])

  const addMedia = (media) => {
    if (!media) return

    if (typeof media === 'string') {
      images.add(media)
      return
    }

    if (media.type === 'video') {
      if (media.src) videos.add(media.src)
      if (media.poster) images.add(media.poster)
      return
    }

    if (media.src) images.add(media.src)
  }

  projects.forEach((project) => {
    images.add(project.img)
    addMedia(project.layout?.hero)
    project.layout?.galleryTop?.forEach(addMedia)
    addMedia(project.layout?.featureShowcase)
    project.layout?.wireframeGallery?.forEach(addMedia)
  })

  return [
    ...[...images].map((src) => ({ src, type: 'image' })),
    ...[...videos].map((src) => ({ src, type: 'video' })),
  ]
}

function preloadAsset(asset) {
  const existingPreload = preloadPromises.get(asset.src)
  if (existingPreload) return existingPreload

  const preload = new Promise((resolve) => {
    let settled = false
    const media = asset.type === 'video' ? document.createElement('video') : new Image()
    const eventName = asset.type === 'video' ? 'loadeddata' : 'load'
    const timeoutId = window.setTimeout(() => finish(false), ASSET_TIMEOUT)

    const finish = (loaded) => {
      if (settled) return
      settled = true
      window.clearTimeout(timeoutId)
      media.removeEventListener(eventName, handleLoad)
      media.removeEventListener('error', handleError)
      resolve(loaded)
    }

    const handleLoad = () => finish(asset.type === 'video' ? media.readyState >= 2 : media.naturalWidth > 0)
    const handleError = () => finish(false)

    media.addEventListener(eventName, handleLoad, { once: true })
    media.addEventListener('error', handleError, { once: true })

    if (asset.type === 'video') {
      media.preload = 'auto'
      media.muted = true
      media.playsInline = true
    }

    media.src = asset.src
    if (asset.type === 'video') media.load()
  })

  preloadPromises.set(asset.src, preload)
  return preload
}

function preloadFont() {
  return new Promise((resolve) => {
    let settled = false
    const timeoutId = window.setTimeout(() => finish(false), ASSET_TIMEOUT)

    const finish = (loaded) => {
      if (settled) return
      settled = true
      window.clearTimeout(timeoutId)
      resolve(loaded)
    }

    document.fonts.load('24px Mynerve').then(
      () => finish(true),
      () => finish(false),
    )
  })
}

function InitialLoader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isRemoved, setIsRemoved] = useState(false)

  useEffect(() => {
    let isActive = true
    let completionTimerId
    let exitTimerId
    let removalTimerId
    const startedAt = performance.now()
    const assets = getPortfolioAssets()
    let completedCount = 0
    const totalCount = assets.length + 1

    const updateProgress = (src, loaded) => {
      if (!isActive) return
      if (!loaded) console.warn('Unable to preload portfolio asset:', src)
      completedCount += 1
      setProgress(Math.round((completedCount / totalCount) * 100))
    }

    const assetLoads = assets.map(async (asset) => {
      const loaded = await preloadAsset(asset)
      updateProgress(asset.src, loaded)
    })

    const fontLoad = preloadFont().then((loaded) => {
      updateProgress('Google Font: Mynerve', loaded)
    })

    Promise.all([...assetLoads, fontLoad]).then(() => {
      const remainingDisplayTime = Math.max(
        0,
        MINIMUM_DISPLAY_TIME - (performance.now() - startedAt),
      )

      completionTimerId = window.setTimeout(() => {
        if (!isActive) return
        setProgress(100)
        exitTimerId = window.setTimeout(() => {
          if (!isActive) return
          setIsVisible(false)
          onComplete()
          removalTimerId = window.setTimeout(() => {
            if (isActive) setIsRemoved(true)
          }, 450)
        }, 250)
      }, remainingDisplayTime)
    })

    return () => {
      isActive = false
      window.clearTimeout(completionTimerId)
      window.clearTimeout(exitTimerId)
      window.clearTimeout(removalTimerId)
    }
  }, [onComplete])

  if (isRemoved) return null

  return (
    <div
      className="initial-loader"
      role="status"
      aria-label={`Loading portfolio, ${progress}%`}
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <div className="initial-loader-stage">
        <div className="initial-loader-content">
          <span className="initial-loader-name">andika fahrezi</span>
          <div
            className="initial-loader-track"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={progress}
          >
            <Motion.span
              className="initial-loader-fill"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            />
            {/* <Motion.span
              className="initial-loader-dot"
              animate={{ left: `${progress}%` }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InitialLoader
