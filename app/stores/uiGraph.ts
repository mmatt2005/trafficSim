import { create } from "zustand"
import { PointType } from "../classes/road/point"


export interface GraphInterface {
    uiPoints: PointType[]
    setUiPoints: (newPoints: PointType[]) => void
}
export const useGraph = create<GraphInterface>((set) => ({
    uiPoints: [],
    setUiPoints: (newPoints) => set(() => ({uiPoints: newPoints}))
}))