import { create } from "zustand"
import { PointType } from "../classes/road/point"
import { Line } from "../classes/line"


export interface GraphInterface {
    uiPoints: PointType[]
    setUiPoints: (newPoints: PointType[]) => void
    uiLines: Line[]
    setUiLines: (newLines: Line[]) => void
}
export const useGraph = create<GraphInterface>((set) => ({
    uiPoints: [],
    setUiPoints: (newPoints) => set(() => ({uiPoints: newPoints})),
    uiLines: [],
    setUiLines: (newLines) => set(() => ({uiLines: newLines}))
}))