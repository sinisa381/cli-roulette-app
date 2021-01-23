import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { AnimationClip, AnimationMixer } from 'three';
import { Canvas, useFrame } from 'react-three-fiber';
import { useGLTF, OrbitControls } from 'drei';
import { useAnimations } from '@react-three/drei/useAnimations';
import Anim from './Anim';

const namebre = 'Dummy002.quaternion';
const possibleAnimations = [
  '4',
  'random1',
  'dontmove1',
  'ruletrotate',
  'dontmove2',
  'random2',
  'dontmove3',
  'dontmove4',
  'random3',
];

function Model() {
  const group = useRef();
  const { nodes, materials, scene, animations } = useGLTF('/anim.gltf');
  const initTracks = animations[0].tracks;
  const clip = animations[0];
  clip.tracks = [initTracks[8], initTracks[3]];

  console.log(clip);
  const [mixer] = useState(() => new THREE.AnimationMixer());
  useEffect(() => void mixer.clipAction(clip, group.current).play(), []);
  useFrame((state, delta) => {
    mixer.update(delta);
  });
  return (
    <primitive
      ref={group}
      scale={[7, 7, 7]}
      position={[-3, 9, 0]}
      rotation={[Math.PI / 2, 0, 0]}
      object={scene}
      dispose={null}
    />
  );
}

function App() {
  return (
    <Canvas
      camera={{
        position: [0, 20, 80],
        fov: 20,
        focus: 10,
        far: 1000,
        filmGauge: 35,
        filmOffset: 0,
      }}
      colorManagement
    >
      <ambientLight intensity={0.5} />
      <OrbitControls />
      <Suspense fallback={null}>
        <Model />
        {/* <Anim /> */}
      </Suspense>
      {/* <mesh>
        <boxBufferGeometry attach="geometry" />
        <meshBasicMaterial attach="material" />
      </mesh> */}
    </Canvas>
  );
}

export default App;
