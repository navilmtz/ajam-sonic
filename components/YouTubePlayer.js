'use client'

export default function YouTubePlayer({ videoId, title}) {
  return (
    <>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        playsInline // Required for iOS
        loading="lazy"
        height={180}
        width="100%"
      />
    </>
  )
}