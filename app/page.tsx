"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Graph } from "./classes/road/graph"
import UiMain from "./uiMain"
export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const graph = new Graph()

  // Wait till the component mounts so we have a valid ref value.
  useEffect(() => { 
    const ctx = canvasRef.current?.getContext("2d")
    if (ctx) { 
      graph.setCtx(ctx)
    }
  }, [])


  return <>
    <div className="w-full h-screen">
      <canvas ref={canvasRef} id="canvas" height={500} width={1000} className="bg-stone-800  absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
    </div>
    <UiMain graph={graph} canvas={canvasRef} />
  </>
}
