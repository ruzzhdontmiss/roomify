"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function RoomCanvas({ wallColor = "#dce9d9", sofaColor = "#7c947f", selectedObject, objectPositions = {} }) {
  const mount = useRef(null)
  useEffect(() => {
    const host = mount.current, scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(36, host.clientWidth / host.clientHeight, .1, 100)
    camera.position.set(5, 3.2, 6); camera.lookAt(0, 0, 0)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); renderer.setSize(host.clientWidth, host.clientHeight); renderer.outputColorSpace = THREE.SRGBColorSpace; host.appendChild(renderer.domElement)
    const room = new THREE.Group(); scene.add(room)
    const selectedMaterial = (color, name) => new THREE.MeshStandardMaterial({ color, roughness: .85, emissive: name === selectedObject ? "#b9d7bb" : "#000000", emissiveIntensity: name === selectedObject ? .3 : 0 })
    const make = (w, h, d, color, x, y, z, name) => { const mesh = new THREE.Mesh(new THREE.BoxGeometry(w,h,d), selectedMaterial(color, name)); const offset = objectPositions[name] || {x:0,z:0}; mesh.position.set(x + offset.x,y,z + offset.z); mesh.name = name; room.add(mesh) }
    make(3.9,.28,2.8,"#c9b397",0,-.92,0,"room"); make(3.82,2.75,.12,wallColor,0,.46,-1.34,"room"); make(.12,2.72,2.72,"#eef4ed",-1.85,.45,0,"room"); make(2.55,.48,1.08,sofaColor,-.35,-.45,.15,"sofa"); make(2.72,.2,1.22,"#f1e8d9",-.35,-.13,.15,"sofa"); make(1.1,.62,.3,"#a2644b",.9,-.28,-1.08,"table"); make(.72,.06,.72,"#45614d",1.05,-.58,.7,"lamp"); make(1.05,.72,.03,"#c4825e",.05,.74,-1.255,"art")
    const lampOffset = objectPositions.lamp || {x:0,z:0}; const vase = new THREE.Mesh(new THREE.CylinderGeometry(.16,.22,.34,24),selectedMaterial("#d8a570","lamp")); vase.position.set(1.05 + lampOffset.x,-.43,.7 + lampOffset.z); room.add(vase)
    const plant = new THREE.Mesh(new THREE.SphereGeometry(.26,24,24),selectedMaterial("#4b7452","lamp")); plant.position.set(-1.42 + lampOffset.x,.1,.94 + lampOffset.z); room.add(plant)
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.48,12),selectedMaterial("#597f5c","lamp")); stem.position.set(-1.42 + lampOffset.x,.32,.94 + lampOffset.z); room.add(stem)
    room.rotation.set(.06,-.52,0); scene.add(new THREE.HemisphereLight("#ffffff","#789179",2.8)); const sun=new THREE.DirectionalLight("#fff5e4",2.8); sun.position.set(4,5,4); scene.add(sun)
    let frame; const render=()=>{frame=requestAnimationFrame(render);room.rotation.y+=.0024;renderer.render(scene,camera)}; render()
    const resize=()=>{camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight)}; const observer=new ResizeObserver(resize); observer.observe(host)
    return ()=>{cancelAnimationFrame(frame);observer.disconnect();renderer.dispose();host.removeChild(renderer.domElement)}
  }, [wallColor, sofaColor, selectedObject, objectPositions])
  return <div ref={mount} className="h-full w-full" aria-label="Interactive 3D room study" />
}
