'use client'

import { useEffect, useRef, type PointerEvent } from 'react'

type SignaturePadProps = {
  label: string
  onDraw: () => void
}

export function SignaturePad({ label, onDraw }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement

    if (!canvas || !parent) {
      return
    }

    const ratio = window.devicePixelRatio || 1
    const { width, height } = parent.getBoundingClientRect()
    canvas.width = Math.max(1, Math.floor(width * ratio))
    canvas.height = Math.max(1, Math.floor(height * ratio))
    const context = canvas.getContext('2d')

    if (!context) {
      return
    }

    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    context.lineWidth = 2
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.strokeStyle = '#06343b'
    context.fillStyle = '#06343b'
  }, [])

  function point(event: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current
    const rect = canvas?.getBoundingClientRect()

    if (!rect) {
      return { x: 0, y: 0 }
    }

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }

  function start(event: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (!canvas || !context) {
      return
    }

    canvas.setPointerCapture(event.pointerId)
    const current = point(event)
    context.beginPath()
    context.arc(current.x, current.y, 0.8, 0, Math.PI * 2)
    context.fill()
    context.beginPath()
    context.moveTo(current.x, current.y)
    onDraw()
  }

  function move(event: PointerEvent<HTMLCanvasElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      return
    }

    const context = canvasRef.current?.getContext('2d')

    if (!context) {
      return
    }

    const current = point(event)
    context.lineTo(current.x, current.y)
    context.stroke()
    context.beginPath()
    context.moveTo(current.x, current.y)
  }

  function end(event: PointerEvent<HTMLCanvasElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <canvas
      ref={canvasRef}
      aria-label={label}
      className='h-full w-full touch-none rounded-xl'
      onPointerDown={start}
      onPointerMove={move}
      onPointerUp={end}
      onPointerCancel={end}
    />
  )
}
