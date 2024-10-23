"use client"

import { PointType } from "@/app/classes/road/point";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";

export default function UiPointSelect({point, selectedPoints, setSelectedPoints}: {
    point: PointType
    selectedPoints: PointType[]
    setSelectedPoints: (selectedPoints: PointType[]) => void
}) {

    const isMaxSelected = useMemo(() => {
        if (selectedPoints.length >= 2) return true
        return false
    }, [selectedPoints.length])

    function isAlreadySelected(point: PointType): boolean {
        if (selectedPoints.some(spoint => spoint.x === point.x && spoint.y == point.y)) return true
        return false
    }
    
    return <Button
        onClick={() => {
            // If the user selected a point thats already selected unselect it
            if (isAlreadySelected(point)) return setSelectedPoints(selectedPoints.filter(spoint => spoint.x !== point.x && spoint.y !== point.y))


            if (isMaxSelected) return console.log("Max is already selected...")

            setSelectedPoints([...selectedPoints, point])
        }}
        className="w-full"
    >
        {selectedPoints.some(spoint => spoint.x === point.x && spoint.y == point.y) ? "Un select" : "Select"}
    </Button>
}