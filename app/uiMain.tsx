"use client"
import { MutableRefObject } from "react"
import { Graph } from "./classes/road/graph";
import UiPointsMain from "./uiPointsMain";
import UiLinesMain from "./uiLinesMain";

export default function UiMain({ graph, canvas }: {
    graph: Graph
    canvas: MutableRefObject<HTMLCanvasElement | null>
}) {


    return <div className="flex flex-wrap gap-5 p-5 ">
        <UiPointsMain graph={graph} canvas={canvas}/>
        <UiLinesMain graph={graph} canvas={canvas}/>
    </div>
}