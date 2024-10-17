import { Graph } from "@/app/classes/road/graph"
import { PointType } from "@/app/classes/road/point"
import { MutableRefObject } from "react"
import { Button } from "./ui/button"
import { useGraph } from "@/app/stores/uiGraph"

export default function UiPointRemove({ graph, canvas, point }: {
    graph: Graph
    canvas: MutableRefObject<HTMLCanvasElement | null>
    point: PointType
}) {
    const ctx = canvas.current?.getContext("2d")
    const setUiPoints = useGraph((state) => state.setUiPoints)

    return <Button
        className="w-full"
        variant={"secondary"}
        onClick={() => {
            if (!ctx) return
            const test = graph.removePoint(point, ctx)
            if (test) {
                graph.drawPoints(ctx, test)
                setUiPoints([...graph.points])
            }
        }}
    >Remove</Button>
}