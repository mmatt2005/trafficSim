"use client"

import { useEffect, useRef } from "react"
import { useGraph } from "./stores/graph"
import { Point } from "./classes/road/point"

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)



  useEffect(() => {
    function handleClickEvent(click: MouseEvent) {
      const clickTarget = click.target as HTMLElement

      const ctx = canvasRef.current?.getContext("2d")
      if (clickTarget.id === "canvas" && canvasRef.current && ctx) {
        const rect = canvasRef.current.getBoundingClientRect();
        // Calculate the x and y coordinates relative to the canvas
        const x = click.clientX - rect.left;
        const y = click.clientY - rect.top;

        const point = new Point({x: x, y: y})
        point.draw(ctx)
      }

    }

    window.addEventListener("click", handleClickEvent)

    return () => window.removeEventListener("click", handleClickEvent)
  }, [canvasRef])

  return <canvas ref={canvasRef} id="canvas" height={500} width={500} className="bg-stone-800  absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
}
