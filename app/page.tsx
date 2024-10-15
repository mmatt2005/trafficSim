"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Graph } from "./classes/road/graph"
import UiMain from "./ui/uiMain"
export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const graph = new Graph([])

  console.log("RE RENDER ")

  // useEffect(() => {
  //   const ctx = canvasRef.current?.getContext("2d")
  //   if (!ctx) return console.log("TEST")
  //   setInterval(() => { 
  //     console.log("TESTING")
  //     graph.drawPoints(ctx)
  //   }, 1000)
  // }, [canvasRef])

  return <>
    <canvas ref={canvasRef} id="canvas" height={500} width={500} className="bg-stone-800  absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
    <UiMain graph={graph} canvas={canvasRef} />
  </>
}
