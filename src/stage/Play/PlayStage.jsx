import {
    Float,
    Environment,
    PresentationControls,
    ContactShadows,
} from '@react-three/drei'
import { useControls } from 'leva'

import { Grid, OrbitControls } from '@react-three/drei';
import { RigidBody, Physics, Debug } from '@react-three/rapier'
import { Perf } from 'r3f-perf';
import { Player } from '../../components/Player';

const Floor = () => {
    return (
        <RigidBody type="fixed">
            <mesh receiveShadow position={[0, -1.25, 0]}>
                <boxGeometry args={[300, 0.5, 300]} />
                <meshStandardMaterial color="lightblue" />
            </mesh>
        </RigidBody>
    );
};

export default function Experience() {
    const { bgColor, debugPhysiscs } = useControls({
        bgColor: "#cbcbcb",
        debugPhysiscs: false,
    });

    const { dlColor, dlIntensity } = useControls('Directional Light', {
        dlColor: '#93a4a6',
        dlIntensity: 1,
    });


    return <>

        <Perf position="top-left" />
        {/* <Environment preset="city" /> */}

        <color args={[bgColor]} attach="background" />

        <OrbitControls makeDefault />

        <Grid
            infiniteGrid
            followCamera
            sectionColor={"lightgray"}
            cellColor={"gray"}
            position={[0, -0.99, 0]}
        />

        <Physics>
            {debugPhysiscs && <Debug />}
            {/* <group position-y={-1}> */}
            {/* <ContactShadows
            opacity={0.4}
            scale={10}
            blur={1}
            far={10}
            resolution={256}
          /> */}

            {/* Chair */}

            {/* Floor */}
            {/* <RigidBody
            //colliders={false}
            //type="fixed"
            // position-y={-0.5}
            // friction={0}
          >
            <mesh
              receiveShadow
              scale={5}
              rotation-x={-Math.PI * 0.5}
              position-y={-0.001}
            >
              <planeGeometry />
              <meshStandardMaterial color={'white'} />
            </mesh>
          </RigidBody> */}
            <Floor />

            <Player />
            {/* </group> */}
        </Physics>

        <ambientLight intensity={0.9} />

        <directionalLight
            castShadow
            position={[1, 2, 3]}
            color={dlColor}
            intensity={dlIntensity}
            shadow-normalBias={0.05}
        />

    </>
}