import { 
    Float,
    Environment,
    PresentationControls, 
    ContactShadows,
    Text3D,
} from '@react-three/drei'
import { useControls } from 'leva'

import { Computer } from './Computer';

export default function Experience()
{
    

    // const { bgColor, computerLight } = useControls({
    //     bgColor: "#5f4e4e",
    //     computerLight: "#805e45",
    //     collapsed: true
    // });

    // const { topTextPosition, bottomTextPosition, colorText } = useControls("Text", {
    //     topTextPosition: 
    //     {
    //         value: { x: 1.8, y: 0.9, z: -0.2 },
    //         step: 0.01,
    //     },
    //     bottomTextPosition: 
    //     {
    //         value: { x: 1.8, y: 0.05, z: -0.7 },
    //         step: 0.01,
    //     },
    //     colorText: "#de5050"
    // });

    // const { shadowsPosition, blurShadow } = useControls("Contact Shadows", {
    //     shadowsPosition: 
    //     {
    //         value: -1,
    //         step: 0.01,
    //     },
    //     blurShadow: 
    //     {
    //         value: 2.4,
    //         step: 0.01,
    //     },
    // });

    return <>

        <Environment preset="city" />

        <color args={ [bgColor] } attach="background"/>

        {/* <OrbitControls makeDefault /> */}

        <PresentationControls 
            global
            rotation={ [ 0.13, 0.1, 0 ] }
            polar={ [ -0.4, 0.2 ] }                 // limit the rotation on the vertical axis
            azimuth={ [ -0.5, 0.5 ] }               // limit the rotation on the horizontal axis
            config={ { mass: 2, tension: 400 } }    //control animation when dragging the object
            snap={ { mass: 4, tension: 400 } }      // go back to the initial position when releasing the object
        >
            <Float 
                rotationIntensity={ 0.2 } 
                position={[0, 0, 0]}
            >
                {/* Rectangle light to simulate the light emitted by the screen */}
                <rectAreaLight
                    width={ 2.5 }
                    height={ 1.65 }
                    intensity={ 65 }
                    color={ computerLight }
                    rotation={ [ 0.1, Math.PI, 0 ] }
                    position={ [ 0, 0.55, -1.15 ] }
                />

                <Computer />

                {/* 3D Text */}
                <Text3D font={'./fugaz.json'}
                    bevelEnabled 
                    bevelSize={0.05}
                    scale={ [0.5, 0.5, 0.5] }
                    position={ [ topTextPosition.x, topTextPosition.y, topTextPosition.z ] }
                    rotation-y={ -1.25 }
                    maxWidth={ 2 }
                    textAlign="center"
                >
                    ANGEL
                    <meshStandardMaterial color={ colorText }/>
                </Text3D>

                <Text3D font={'./fugaz.json'}
                    bevelEnabled 
                    bevelSize={0.05}
                    scale={ [0.5, 0.5, 0.5] }
                    position={ [ bottomTextPosition.x, bottomTextPosition.y, bottomTextPosition.z ] }
                    rotation-y={ -1.25 }
                    maxWidth={ 2 }
                    textAlign="center"
                >
                    VICENTE
                    <meshStandardMaterial color={ colorText }/>
                </Text3D>
            </Float>
        </PresentationControls>

        <ContactShadows 
            position-y={ shadowsPosition }
            opacity={ 0.4 }
            scale={ 7 }
            blur={ blurShadow }
        />
    </>
}