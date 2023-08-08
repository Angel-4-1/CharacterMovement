import React from 'react';
import { useControls } from 'leva'
import { 
  Grid, 
  OrbitControls,
  Edges,
} from '@react-three/drei';
import { RigidBody, Physics, Debug } from '@react-three/rapier'
import { Perf } from 'r3f-perf';
import { Player } from '../../components/Player';
import Show from '../../components/Show';
import { Vector3 } from 'three';
import useGame from '../../stores/useGame'
import { useDebug } from '../../utils/useDebug';
import { degToRad } from '../../utils/angleFunctions';
import Wrapper from '../../components/Wrapper';

const Floor = (props) => {
  return (
    <RigidBody type="fixed">
      <mesh receiveShadow position={[0, -0.05, 0]}>
        <boxGeometry args={[50, 0.1, 50]} />
        <meshStandardMaterial color="lightblue" />
        <Show when={props.showEdges ? props.showEdges : false}>
          <Edges />
        </Show>
      </mesh>
    </RigidBody>
  );
};

const Box = (
  props
) => {
  let pos = new Vector3(props.position[0], props.position[1], props.position[2]);
  let size = new Vector3(props.size[0], props.size[1], props.size[2]);

  if ( props.placeAtFloor ) {
    pos.y = pos.y - size.y / 2.0;
  }

  return (
    <RigidBody type="fixed">
      <Wrapper showPivotControls={props.showPivotControls}>
        <mesh receiveShadow position={pos} >
          <boxGeometry args={props.size} />
          <meshStandardMaterial color={props.color ? props.color : "#e0d290"} />
          <Show when={props.showEdges ? props.showEdges : false}>
            <Edges />
          </Show>
        </mesh>
      </Wrapper>
    </RigidBody>
  );
};

export default function Experience() {
  const freeCam = useGame((state) => state.freeCam);
  const setFreeCam = useGame((state) => state.setFreeCam);
  const isDebugActive = useDebug();

  const { bgColor, debugPhysiscs, showEdges } = useControls({
    bgColor: "#98b2c1",
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
    <Show when={isDebugActive}>
        <Perf position="top-left" />
    </Show>

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

    <Show when={isDebugActive}>
      <Grid
        infiniteGrid
        followCamera
        sectionColor={"lightgray"}
        cellColor={"gray"}
        position={[0, 0.01, 0]}
      />
    </Show>

    <ambientLight intensity={0.9} />

    <directionalLight
      castShadow
      position={[1, 2, 3]}
      color={dlColor}
      intensity={dlIntensity}
      shadow-normalBias={0.05}
      shadow-mapSize-height={1024}
      shadow-mapSize-width={1024}
    />

    <spotLight
      position={[1, 2, 3]}
      angle={degToRad(30)}
      penumbra={0.5}
      castShadow
      shadow-mapSize-height={1024}
      shadow-mapSize-width={1024}
    />

    <Physics>
      {debugPhysiscs && <Debug />}

      <Player />

      <Floor showEdges={showEdges}/>

      {/* Stairs */}
      <Box
        position={[0, 0.25, 10]}
        size={[10, 0.1, 10]}
        showEdges={showEdges}
        placeAtFloor={true}
        showPivotControls={isDebugActive}
      />
    </Physics>
  </>
}