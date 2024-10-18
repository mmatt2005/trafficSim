"use client"
import { MutableRefObject, useMemo, useRef, useState } from "react"
import { Point, PointType } from "./classes/road/point"
import { useGraph } from "./stores/uiGraph"
import { Button } from "@/components/ui/button";
import { Graph } from "./classes/road/graph";
import { useAddPoint } from "./hooks/useAddPoint";
import UiPointSize from "@/components/uiPointSize";
import UiPointColor from "@/components/uiPointColor";
import UiPointRemove from "@/components/uiPointRemove";
import UiPointSelect from "@/components/uiPointSelect";
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