import { create } from "zustand"
import { PointType } from "../classes/road/point"


export interface GraphInterface {
    points: PointType[]
    setPoints: (newPoints: PointType[]) => void
}
export const useGraph = create<GraphInterface>((set) => ({
    points: [],
    setPoints: (newPoints) => set(() => ({points: newPoints}))
}))