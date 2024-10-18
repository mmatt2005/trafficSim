"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Graph } from "./classes/road/graph"
import UiMain from "./uiMain"
export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const graph = new Graph()

  console.log("RE RENDER ")


  return <>
    <div className="w-full h-screen">
      <canvas ref={canvasRef} id="canvas" height={500} width={500} className="bg-stone-800  absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
    </div>
    <UiMain graph={graph} canvas={canvasRef} />
  </>
}
