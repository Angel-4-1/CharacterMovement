import React, { useRef } from 'react';
import { useControls } from 'leva'
import { 
  Grid, 
  OrbitControls, 
  TransformControls,
  PivotControls,
  Edges 
} from '@react-three/drei';
import { RigidBody, Physics, Debug } from '@react-three/rapier'
import { Perf } from 'r3f-perf';
import { Player } from '../../components/Player';
import Show from '../../components/Show';
import { Vector3 } from 'three';
import useGame from '../../stores/useGame'

const Floor = () => {
  return (
    <RigidBody type="fixed">
      <mesh receiveShadow position={[0, -1.25, 0]}>
        <boxGeometry args={[200, 0.5, 200]} />
        <meshStandardMaterial color="lightblue" />
      </mesh>
    </RigidBody>
  );
};

const Box = (
  props
) => {
  // const box = useRef();

  let pos = new Vector3(props.position[0], props.position[1], props.position[2]);
  let size = new Vector3(props.size[0], props.size[1], props.size[2]);

  if(props.placeAtFloor) {
    pos.y = pos.y - size.y / 2.0;
  }

  return (
    <RigidBody type="fixed">
      <PivotControls 
          anchor={ [ 0, 0, 0 ] }
          depthTest= { false }    // we want the controls to be on top of everything 
          lineWidth={ 4 }
          fixed={ true }  // to have it always as the same size --> we will need to specify a bigger scale
          scale={ 100 }   // size in pixels
      >
        <mesh receiveShadow position={pos} /*ref={box}*/>
          <boxGeometry args={props.size} />
          <meshStandardMaterial color={props.color ? props.color : "#e0d290"} />
          <Show when={props.showEdges ? props.showEdges : false}>
            <Edges />
          </Show>
        </mesh>
      </PivotControls>
      {/* <TransformControls object={ box } mode="translate"/> */}
    </RigidBody>
  );
};

export default function Experience() {
  const freeCam = useGame((state) => state.freeCam);
  const setFreeCam = useGame((state) => state.setFreeCam);

  const { bgColor, debugPhysiscs, showEdges } = useControls({
    bgColor: "#cbcbcb",
    debugPhysiscs: false,
    showEdges: true,
    freeCam: {
      value: freeCam,
      onChange: (value) => setFreeCam(value)
    }
  });

  const { dlColor, dlIntensity } = useControls('Directional Light', {
    dlColor: '#93a4a6',
    dlIntensity: 1,
  });

  return <>

    <Perf position="top-left" />

    <color args={[bgColor]} attach="background" />

    {/*By adding makeDefault, the drei helpers will now that the orbitControls is enabled
    so they can disbale it when we make use of them*/}
    <Show when={freeCam}>
      <OrbitControls
        makeDefault
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI * 0.5}
      />
    </Show>

    <Grid
      infiniteGrid
      followCamera
      sectionColor={"lightgray"}
      cellColor={"gray"}
      position={[0, -0.99, 0]}
    />

    <ambientLight intensity={0.9} />

    <directionalLight
      castShadow
      position={[1, 2, 3]}
      color={dlColor}
      intensity={dlIntensity}
      shadow-normalBias={0.05}

      shadow-mapSize-height={1024}
      shadow-mapSize-width={1024}

    // shadow-camera-left={-100}
    // shadow-camera-right={100}
    // shadow-camera-top={100}
    // shadow-camera-bottom={-100}

    />

    {/* <spotLight
            position={[1, 2, 3]}
            angle={Math.PI / 3}
            // penumbra={0.5}
            castShadow
            shadow-mapSize-height={1024}
            shadow-mapSize-width={1024}
        /> */}

    <Physics>
      {debugPhysiscs && <Debug />}
      {/* <ContactShadows
            opacity={0.4}
            scale={10}
            blur={1}
            far={10}
            resolution={256}
          /> */}

      <Player />

      <Floor />

      {/* Stairs */}
      <Box
        position={[0, 0, 10]}
        size={[10, 0.25, 10]}
        showEdges={showEdges}
        placeAtFloor={true}
      />
      
      {/* <Box
        position={[0, 0.5, 10]}
        size={[10, 0.5, 10]}
        showEdges={showEdges}
      /> */}

      {/* </group> */}
    </Physics>



  </>
}