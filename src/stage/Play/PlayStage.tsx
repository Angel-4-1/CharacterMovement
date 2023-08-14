import React, { useEffect } from 'react';
import { useControls } from 'leva'
import { 
  Grid, 
  OrbitControls,
} from '@react-three/drei';
import { Physics, Debug } from '@react-three/rapier'
import { Perf } from 'r3f-perf';
import { Player } from '~/components/Player';
import Show from '~/components/Show';
import useGame from '~/stores/useGame'
import { useDebug } from '~/utils/useDebug';
import { degToRad } from '~/utils/angleFunctions';
import Floor from './components/Floor';
import Box from './components/Box';
import KinematicBox from './components/KinematicBox';
import Stairs from './components/Stairs';
import Scenario from './components/Scenario';

export default function PlayStage() {
  const freeCam = useGame((state) => state.freeCam);
  const setFreeCam = useGame((state) => state.setFreeCam);
  const isDebugActive = useDebug();
  const start = useGame((state) => state.start);

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

  useEffect(() => {
    start();
  }, [])

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

      {/* <Stairs numStairs={10} showEdges={showEdges} showPivotControls={isDebugActive}/> */}
      
      { /* Ramp */ }
      <Box
        id="Ramp1"
        position={[0, 0.45, 10]}
        size={[5, 0.1, 5]}
        showEdges={showEdges}
        placeAtFloor={true}
        showPivotControls={isDebugActive}
        rotationX={degToRad(-10)}
      />
      
      <Box
        id="Ramp1.5"
        position={[0, 0.85, 15]}
        size={[5, 0.1, 5]}
        showEdges={showEdges}
        placeAtFloor={true}
        showPivotControls={isDebugActive}
      />
      
      { /* Ramp 2*/ }
      <Box
        id="Ramp2"
        position={[5, 1.3, 15]}
        size={[5, 0.1, 5]}
        showEdges={showEdges}
        placeAtFloor={true}
        showPivotControls={isDebugActive}
        rotationZ={degToRad(10)}
      />
      
      {/* Elevator */}
      <KinematicBox
        id="Elevator"
        position={[5, 0, 7.5]}
        size={[4, 0.1, 4]}
        showEdges={showEdges}
        showPivotControls={isDebugActive}
      />

      <Scenario position={[10, 0, 10]} isDebug={isDebugActive}/>
    </Physics>
  </>
}