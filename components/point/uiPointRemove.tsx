import { Graph } from "@/app/classes/road/graph"
import { PointType } from "@/app/classes/road/point"
import { MutableRefObject } from "react"
import { useGraph } from "@/app/stores/uiGraph"
import { Button } from "../ui/button"

export default function UiPointRemove({ graph, canvas, point }: {
    graph: Graph
    canvas: MutableRefObject<HTMLCanvasElement | null>
    point: PointType
}) {
    const setUiPoints = useGraph((state) => state.setUiPoints)

    return <Button
        className="w-full"
        variant={"secondary"}
        onClick={() => {
            const test = graph.removePoint(point)
            if (test) {
                graph.drawPoints(test)
                setUiPoints([...graph.points])
            }
        }}
    >Remove</Button>
}