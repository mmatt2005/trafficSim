"use client"

import { useEffect } from "react"

export default function Home() {

  useEffect(() => { 
    function handleClickEvent(click: MouseEvent) {
      console.log("Click")
      const clickTarget = click.target as HTMLElement
      console.log(click.target)
      console.log(clickTarget.id)
   
    }

    window.addEventListener("click", handleClickEvent)

    return () => window.removeEventListener("click", handleClickEvent)
  }, [])

  return <canvas id="canvas" height={500} width={500} className="bg-stone-800  absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"/>
}
