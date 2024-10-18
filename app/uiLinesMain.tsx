"use client"

import { MutableRefObject } from "react"
import { Graph } from "./classes/road/graph"
import { useGraph } from "./stores/uiGraph"

export default function UiLinesMain({ graph, canvas }: {
    graph: Graph
    canvas: MutableRefObject<HTMLCanvasElement | null>
}) {
    const uiLines = useGraph((state) => state.uiLines)

    return <div className="">
        {
            uiLines.map(line => {
                return <div
                    key={line.id}
                    className={` bg-neutral-900 p-5 rounded-lg`}
                >
                    <div className="mb-5">
                        <h1 className="text-lg">Line</h1>
                    </div>
                </div>
            })
        }

    </div>
}