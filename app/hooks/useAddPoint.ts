"use client"

import { MutableRefObject, useEffect } from "react"
import { Graph } from "../classes/road/graph"
import { Point } from "../classes/road/point"
import { useGraph } from "../stores/uiGraph"
import {v4 as uuidv4} from "uuid"

export function useAddPoint(graph: Graph, canvasRef: MutableRefObject<HTMLCanvasElement | null>) {
    const uiPoints = useGraph((state) => state.uiPoints)
    const setUiPoints = useGraph((state) => state.setUiPoints)


    function randomColor() {
        const colors = ["red", "pink", "blue", "green", "orange"]
        return colors[Math.floor(Math.random() * colors.length)]
    }

    useEffect(() => {
        function handleClickEvent(click: MouseEvent) {
            const clickTarget = click.target as HTMLElement
            if (!canvasRef.current) return console.log("TEST")

            const ctx = canvasRef.current.getContext("2d")
            if (clickTarget.id === "canvas" && canvasRef && ctx) {
                const rect = canvasRef.current.getBoundingClientRect();
                // Calculate the x and y coordinates relative to the canvas
                const x = click.clientX - rect.left;
                const y = click.clientY - rect.top;



                const point = new Point({ x: x, y: y, color: randomColor(), id: uuidv4() })
                graph.addPoint(point)
                graph.drawPoints(ctx)

                setUiPoints([...uiPoints, point])

            }

        }

        window.addEventListener("click", handleClickEvent)

        return () => window.removeEventListener("click", handleClickEvent)
    }, [canvasRef, graph])
}