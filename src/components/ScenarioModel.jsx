import React from "react";
import { useGLTF } from "@react-three/drei";
import Show from "~/components/Show"

const PointLight = (props) => {
  return <>
    <Show when={props.isDebug}>
      <mesh >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </Show>
    <pointLight
      intensity={4}
      color="#e07951"
      castShadow
      shadow-mapSize-height={1024}
      shadow-mapSize-width={1024}
    />
  </>
  
}

export default function ScenarioModel(props) {
  const { nodes, materials } = useGLTF('assets/dungeon/scenario2.glb');
  return (
    <group position={[-18, 0, 20]} scale={0.65} dispose={null}>
      <group position={[6, 0, -4]}>
        <mesh geometry={nodes.mesh_0.geometry} material={materials['Stone(Clone)']} />
        <mesh geometry={nodes.mesh_0_1.geometry} material={materials['StoneDark(Clone)']} />
      </group>
      <group position={[2, 0, -4]}>
        <mesh geometry={nodes.mesh_1.geometry} material={materials['Stone(Clone)']} />
        <mesh geometry={nodes.mesh_1_1.geometry} material={materials['StoneDark(Clone)']} />
      </group>
      <group position={[-2, 0, -4]}>
        <mesh geometry={nodes.mesh_2.geometry} material={materials['Stone(Clone)']} />
        <mesh geometry={nodes.mesh_2_1.geometry} material={materials['StoneDark(Clone)']} />
      </group>
      <group position={[-6, 0, -4]}>
        <mesh geometry={nodes.mesh_3.geometry} material={materials['Stone(Clone)']} />
        <mesh geometry={nodes.mesh_3_1.geometry} material={materials['StoneDark(Clone)']} />
      </group>
      <mesh geometry={nodes.bookcaseWide_broken.geometry} material={materials['BrownDark(Clone)']} position={[11, 0, -5]} />
      <group position={[0, 0, -5]}>
        <mesh geometry={nodes.mesh_5.geometry} material={materials['BrownDark(Clone)']} />
        <mesh geometry={nodes.mesh_5_1.geometry} material={materials['PurpleDark(Clone)']} />
        <mesh geometry={nodes.mesh_5_2.geometry} material={materials['White(Clone)']} />
        <mesh geometry={nodes.mesh_5_3.geometry} material={materials['Metal(Clone)']} />
        <mesh geometry={nodes.mesh_5_4.geometry} material={materials['BlueDark(Clone)']} />
        <mesh geometry={nodes.mesh_5_5.geometry} material={materials['GreenDark(Clone)']} />
        <mesh geometry={nodes.mesh_5_6.geometry} material={materials['WoodDark(Clone)']} />
        <mesh geometry={nodes.mesh_5_7.geometry} material={materials['Black(Clone)']} />
      </group>
      <mesh geometry={nodes.coinsLarge.geometry} material={materials['Gold(Clone)']} position={[-5, 0, -5]} />
      {/* Light */}
      <group position={[9, 2, -5]}>
        <mesh geometry={nodes.mesh_7.geometry} material={materials['BrownDark(Clone)']} />
        <mesh geometry={nodes.mesh_7_1.geometry} material={materials['Metal(Clone)']} />
        <mesh geometry={nodes.mesh_7_2.geometry} material={materials['WoodDark(Clone)']} />
        <mesh geometry={nodes.mesh_7_3.geometry} material={materials['StoneDark(Clone)']} />
        <PointLight isDebug={props.isDebug}/>
      </group>
      <group position={[18, 0, -4]}>
        <mesh geometry={nodes.mesh_8.geometry} material={materials['Stone(Clone)']} />
        <mesh geometry={nodes.mesh_8_1.geometry} material={materials['StoneDark(Clone)']} />
      </group>
      <group position={[19.9, 0, -4]} rotation={[-Math.PI, 0, -Math.PI]}>
        <mesh geometry={nodes.mesh_9.geometry} material={materials['Stone(Clone)']} />
        <mesh geometry={nodes.mesh_9_1.geometry} material={materials['StoneDark(Clone)']} />
      </group>
      <group position={[-6, 0, -8]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh geometry={nodes.mesh_10.geometry} material={materials['Stone(Clone)']} />
        <mesh geometry={nodes.mesh_10_1.geometry} material={materials['StoneDark(Clone)']} />
      </group>
      <group position={[-6, 0, -9.8]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh geometry={nodes.mesh_11.geometry} material={materials['Stone(Clone)']} />
        <mesh geometry={nodes.mesh_11_1.geometry} material={materials['StoneDark(Clone)']} />
      </group>
      {/* Light */}
      <group position={[-6, 2, -12]}>
        <mesh geometry={nodes.mesh_12.geometry} material={materials['BrownDark(Clone)']} />
        <mesh geometry={nodes.mesh_12_1.geometry} material={materials['Metal(Clone)']} />
        <mesh geometry={nodes.mesh_12_2.geometry} material={materials['WoodDark(Clone)']} />
        <PointLight isDebug={props.isDebug}/>
      </group>
      {/* Light */}
      <group position={[17.6, 2, -5]} opacity={0} transparent>
        <mesh geometry={nodes.mesh_13.geometry} material={materials['BrownDark(Clone)']} />
        <mesh geometry={nodes.mesh_13_1.geometry} material={materials['Metal(Clone)']} />
        <mesh geometry={nodes.mesh_13_2.geometry} material={materials['WoodDark(Clone)']} />
        <mesh geometry={nodes.mesh_13_3.geometry} material={materials['StoneDark(Clone)']} />
        <PointLight isDebug={props.isDebug}/>
      </group>
      <group position={[10, 0, -4]}>
        <mesh geometry={nodes.mesh_14.geometry} material={materials['Stone(Clone)']} />
        <mesh geometry={nodes.mesh_14_1.geometry} material={materials['StoneDark(Clone)']} />
      </group>
      <group position={[8, 0, -11]}>
        <mesh geometry={nodes.mesh_15.geometry} material={materials['Stone(Clone)']} />
        <mesh geometry={nodes.mesh_15_1.geometry} material={materials['StoneDark(Clone)']} />
      </group>
      <group position={[20.5, 0, -11]}>
        <mesh geometry={nodes.mesh_16.geometry} material={materials['Stone(Clone)']} />
        <mesh geometry={nodes.mesh_16_1.geometry} material={materials['StoneDark(Clone)']} />
      </group>
      <group position={[22.2, 0.5, -6]} rotation={[0, 0, -Math.PI / 2]}>
        <mesh geometry={nodes.mesh_17.geometry} material={materials['BrownDark(Clone)']} />
        <mesh geometry={nodes.mesh_17_1.geometry} material={materials['Beige(Clone)']} />
        <mesh geometry={nodes.mesh_17_2.geometry} material={materials['Metal(Clone)']} />
      </group>
      <group position={[22.2, 0.5, -7]} rotation={[0, 0, -Math.PI / 2]}>
        <mesh geometry={nodes.mesh_18.geometry} material={materials['BrownDark(Clone)']} />
        <mesh geometry={nodes.mesh_18_1.geometry} material={materials['Beige(Clone)']} />
        <mesh geometry={nodes.mesh_18_2.geometry} material={materials['Metal(Clone)']} />
      </group>
      <group position={[22.2, 1.2, -6.5]} rotation={[0, 0, -Math.PI / 2]}>
        <mesh geometry={nodes.mesh_19.geometry} material={materials['BrownDark(Clone)']} />
        <mesh geometry={nodes.mesh_19_1.geometry} material={materials['Beige(Clone)']} />
        <mesh geometry={nodes.mesh_19_2.geometry} material={materials['Metal(Clone)']} />
      </group>
      <group position={[14, 0, -4]}>
        <mesh geometry={nodes.mesh_20.geometry} material={materials['Stone(Clone)']} />
        <mesh geometry={nodes.mesh_20_1.geometry} material={materials['StoneDark(Clone)']} />
        <mesh geometry={nodes.mesh_20_2.geometry} material={materials['Black(Clone)']} />
      </group>
    </group>
  )
}

useGLTF.preload('assets/dungeon/scenario2.glb');