'use client'
/**@type {HTMLCanvasElement} */
/**@type {CanvasRenderingContext2D} */
import { useRef, useEffect, useState } from "react"
export default function PDrawing()
{
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const i = '0123456789';
  const k = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  console.log(k.splice(0, 3))
  console.log(k);
  return (
    <>
      <canvas ref={canvasRef} width={300} height={300} />
    </>
  )
}