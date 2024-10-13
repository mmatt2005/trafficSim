"use client"

import { useEffect, useRef, useState } from "react"
import { useGraph } from "./stores/uiGraph"
import { Point } from "./classes/road/point"
import { Graph } from "./classes/road/graph"
import UiMain from "./ui/uiMain"
import { stat } from "fs"
import { useAddPoint } from "./hooks/useAddPoint"

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const graph = new Graph([])

  useAddPoint(graph, canvasRef)

  return <>
    <canvas ref={canvasRef} id="canvas" height={500} width={500} className="bg-stone-800  absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
    <UiMain graph={graph} canvas={canvasRef}/>
  </>
}
