/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

// Blank pixel as fallback
const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// Generate a texture that says " VIRINCHI " repeatedly for the lanyard
function generateVirinchiTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#ff3366'; // Virinchi brand color
  ctx.fillRect(0, 0, 512, 64);
  
  // Text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('VIRINCHI', 256, 32);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 1);
  return texture;
}

// Generate a nice ID card front texture for Virinchi
function generateIDCardFront() {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 840;
  const ctx = canvas.getContext('2d');
  
  // White card base
  ctx.fillStyle = '#f8f8f8';
  ctx.fillRect(0, 0, 600, 840);
  
  // Header background
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, 600, 160);


  
  // Header text
  ctx.fillStyle = '#ff3366';
  ctx.font = 'bold 60px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('VIRINCHI', 300, 80);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = '30px sans-serif';
  ctx.fillText('CULTURAL CLUB', 300, 120);
  
  // Photo will be rendered as a separate transparent 3D mesh over this area
  // Text moved to text overlay to render above the photo

  return canvas.toDataURL();
}

function generateIDCardTextOverlay() {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 840;
  const ctx = canvas.getContext('2d');
  
  ctx.clearRect(0, 0, 600, 840);
  
  ctx.textAlign = 'center';
  ctx.fillStyle = '#222222';
  ctx.font = 'bold 50px sans-serif';
  ctx.fillText('Dr. T. Swarupa Rani', 300, 720);
  
  ctx.fillStyle = '#ff3366';
  ctx.fillRect(200, 750, 200, 6);
  
  ctx.fillStyle = '#555555';
  ctx.font = 'bold 30px sans-serif';
  ctx.fillText('FACULTY COORDINATOR', 300, 810);

  return canvas.toDataURL();
}

function generateIDCardBack() {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 840;
  const ctx = canvas.getContext('2d');
  
  // Black card base
  ctx.fillStyle = '#111111';
  ctx.fillRect(0, 0, 600, 840);


  
  // Center Virinchi Logo Text
  ctx.fillStyle = '#ff3366';
  ctx.font = 'bold 80px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('VIRINCHI', 300, 420);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = '40px sans-serif';
  ctx.fillText('CULTURAL CLUB', 300, 480);

  return canvas.toDataURL();
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  lanyardWidth = 0.5
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  lanyardWidth = 1.2 // slightly thicker for the text
}) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
    
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };

  const lanyardTexture = useMemo(() => generateVirinchiTexture(), []);
  
  // We use our dynamically generated ID card image for the front
  const generatedFront = useMemo(() => generateIDCardFront(), []);
  const generatedTextOverlay = useMemo(() => generateIDCardTextOverlay(), []);
  const generatedBack = useMemo(() => generateIDCardBack(), []);
  
  const frontTex = useTexture(generatedFront);
  const textOverlayTex = useTexture(generatedTextOverlay);
  const backTex = useTexture(generatedBack);
  const photoTex = useTexture('/core/fc.png');
  
  // Fix textures to look crisp
  frontTex.colorSpace = THREE.SRGBColorSpace;
  textOverlayTex.colorSpace = THREE.SRGBColorSpace;
  backTex.colorSpace = THREE.SRGBColorSpace;
  photoTex.colorSpace = THREE.SRGBColorSpace;
  
  // Maximize texture clarity for the photo
  photoTex.anisotropy = 16;
  photoTex.minFilter = THREE.LinearMipmapLinearFilter;
  photoTex.magFilter = THREE.LinearFilter;

  const [curve] = useState(() => {
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(),
      new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()
    ]);
    c.closed = true;
    return c;
  });
  
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 2.5]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 2.5]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 2.5]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 2.86, 0]]); // Joint at torus ring center: group_y(-1.2) + torus_local(0.81) * scale(5.02) = 2.86

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      const p0 = j3.current.translation();
      const p1 = j2.current.lerped;
      const p2 = j1.current.lerped;
      const p3 = fixed.current.translation();

      const dir1 = new THREE.Vector3().subVectors(p1, p0).normalize();
      const dir2 = new THREE.Vector3().subVectors(p2, p1).normalize();
      const dir3 = new THREE.Vector3().subVectors(p3, p2).normalize();

      const zAxis = new THREE.Vector3(0, 0, 1);
      const right1 = new THREE.Vector3().crossVectors(dir1, zAxis).normalize();
      const right2 = new THREE.Vector3().crossVectors(dir2, zAxis).normalize();
      const right3 = new THREE.Vector3().crossVectors(dir3, zAxis).normalize();

      const w = lanyardWidth * 0.8; // Maximum width in the middle
      const wTop = lanyardWidth * 0.15; // Narrow at the top to fit inside a single spiral ring

      // 8-point closed loop for a continuous strap passing over and through the top coil
      curve.points[0].copy(p0); // Bottom swivel pinch

      // Right side going up
      curve.points[1].copy(p1).addScaledVector(right1, w * 0.6); // Widening
      curve.points[2].copy(p2).addScaledVector(right2, w);       // Maximum width
      curve.points[3].copy(p3).addScaledVector(right3, wTop);    // Top right

      // Top center (short loop tucked behind the front SVG coil)
      const up = new THREE.Vector3().crossVectors(zAxis, right3).normalize();
      curve.points[4].copy(p3).addScaledVector(up, 0.1); // Barely arches, ending right where the spiral starts

      // Left side going down
      curve.points[5].copy(p3).addScaledVector(right3, -wTop);   // Top left
      curve.points[6].copy(p2).addScaledVector(right2, -w);      // Maximum width
      curve.points[7].copy(p1).addScaledVector(right1, -w * 0.6); // Narrowing towards bottom

      band.current.geometry.setPoints(curve.getPoints(isMobile ? 32 : 64));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';

  // BoxGeometry maps materials in this order:
  // right (0), left (1), top (2), bottom (3), front (4), back (5)
  return (
    <>
      <group position={[0, 10, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[1.785, 2.511, 0.01]} />
          <group
            scale={5.02}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            )}
          >
            {/* The 3D ID Card - original clean card */}
            <mesh position={[0, -0.02, 0.005]}>
              <boxGeometry args={[1, 1.4, 0.02]} />
              
              <meshPhysicalMaterial attach="material-0" color="#e8e8e8" metalness={0.1} roughness={0.6} />
              <meshPhysicalMaterial attach="material-1" color="#e8e8e8" metalness={0.1} roughness={0.6} />
              <meshPhysicalMaterial attach="material-2" color="#e8e8e8" metalness={0.1} roughness={0.6} />
              <meshPhysicalMaterial attach="material-3" color="#e8e8e8" metalness={0.1} roughness={0.6} />
              
              {/* Front Face */}
              <meshPhysicalMaterial 
                attach="material-4" 
                map={frontTex}
                transparent={false}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.5}
                metalness={0.1}
              />
              
              {/* Back Face */}
              <meshPhysicalMaterial 
                attach="material-5" 
                map={backTex}
                transparent={false}
                color="white"
                roughness={0.9}
              />

              {/* The Profile Photo Mesh (Pulled up and scaled larger) */}
              <mesh position={[0, 0.01, 0.011]}>
                <planeGeometry args={[0.79, 0.92]} />
                <meshBasicMaterial map={photoTex} transparent={true} />
              </mesh>

              {/* The Text Overlay Mesh (Floats above the photo) */}
              <mesh position={[0, 0, 0.012]}>
                <planeGeometry args={[1, 1.4]} />
                <meshBasicMaterial map={textOverlayTex} transparent={true} />
              </mesh>
            </mesh>

            {/* === SWIVEL CLIP === */}
            {/* Tab body: starts at card top edge (card top is at local Y=0.68), so tab center at 0.71 */}
            <mesh position={[0, 0.71, 0.01]}>
              <boxGeometry args={[0.18, 0.08, 0.06]} />
              <meshPhysicalMaterial color="#d0d0d0" metalness={0.6} roughness={0.25} clearcoat={1.0} clearcoatRoughness={0.05} />
            </mesh>
            {/* Neck */}
            <mesh position={[0, 0.775, 0.01]}>
              <boxGeometry args={[0.09, 0.04, 0.04]} />
              <meshPhysicalMaterial color="#c0c0c0" metalness={0.65} roughness={0.2} />
            </mesh>
            {/* Torus ring at local Y=0.81 → world = -1.2 + 0.81*5.02 = 2.866 ≈ 2.86 */}
            <mesh position={[0, 0.81, 0.01]}>
              <torusGeometry args={[0.05, 0.02, 16, 32]} />
              <meshPhysicalMaterial color="#c8c8c8" metalness={0.75} roughness={0.15} clearcoat={0.9} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={true}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={lanyardTexture}
          repeat={[-8, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}
