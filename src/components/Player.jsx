import React, { useRef, useState } from 'react'
import { 
    useGLTF,
    useKeyboardControls} from '@react-three/drei'
import { useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import * as THREE from 'three'
import { CapsuleCollider, RigidBody, TrimeshCollider, useRapier } from "@react-three/rapier"
import { Avatar } from './Avatar';
import usePlayer, { ANIMATIONS } from '../stores/usePlayer';
import useGame, { CAMERA_TYPES } from '../stores/useGame';
import gsap from 'gsap'

const cameraOffset = {
    isometric: {
        position: {
            x: -8,
            y: 4,
            z: -10,
        },
        target: {
            x: -1,
            y: -2,
            z: 0,
        }
    },
    perspective: {
        position: {
            x: 0,
            y: 1.75,
            z: -10,
        },
        target: {
            x: 0,
            y: 0,
            z: 0,
        }
    }
};

export function Player(props) {
    const body = useRef();
    const character = useRef();
    const [subscribeKeys, getKeys] = useKeyboardControls();

    const { rapier, world } = useRapier();
    const rapierWorld = world.raw();    // world needed for the raycasting

    const onUpdateAnimation = usePlayer((state) => state.onUpdateAnimation);
    const changeAnimation = usePlayer((state) => state.changeAnimation);
    const animation = usePlayer((state) => state.animation);

    const freeCam = useGame((state) => state.freeCam);
    const cameraType = useGame((state) => state.cameraType);

    const [cameraTypeOffset, setCameraTypeOffset] = useState(cameraOffset.isometric);
    const [canJump, setCanJump] = useState(true);
    const [hasJumped, setHasJumped] = useState(false);

    // Leva Controls
    const { walk_speed, run_speed } = useControls('Player', {
        walk_speed: {
            value: 5,
            min: 0,
            max: 20,
            step: 0.1,
        },
        run_speed: {
            value: 8,
            min: 0,
            max: 20,
            step: 0.1,
        },
    });

    const updateAnimation = (animation) => {
        onUpdateAnimation(animation);
        changeAnimation(animation);
    }

    const [ smoothCameraPosition ] = useState(() => new THREE.Vector3( 10, 10, 10 ));
    const [ smoothCameraTarget ] = useState(() => new THREE.Vector3());

    const cameraFollowPlayer = (state, delta) => {
        const characterWorldPosition = character.current.getWorldPosition( new THREE.Vector3() );

        const cameraPosition = new THREE.Vector3();
        cameraPosition.copy( characterWorldPosition );
        cameraPosition.x = characterWorldPosition.x + cameraTypeOffset.position.x;
        cameraPosition.y += cameraTypeOffset.position.y;
        cameraPosition.z = characterWorldPosition.z + cameraTypeOffset.position.z;

        const cameraTarget = new THREE.Vector3(
            characterWorldPosition.x + cameraTypeOffset.target.x,
            cameraPosition.y + cameraTypeOffset.target.y,
            characterWorldPosition.z + cameraTypeOffset.target.z
        );
        
        // Do a smooth lerp
        smoothCameraPosition.lerp( cameraPosition, 5 * delta );
        smoothCameraTarget.lerp( cameraTarget, 5 * delta );

        // Update camera
        state.camera.position.copy( smoothCameraPosition );
        state.camera.lookAt( smoothCameraTarget );
    }

    const onJump = () => {
        // Ray origin at the center of the sphere
        const origin = body.current.translation();

        // We want to be at the bottom of the sphere
        origin.y += 1.1;

        // Ray direction
        const direction = { x: 0, y: -1, z: 0 };

        // Create the ray
        const ray = new rapier.Ray( origin, direction );

        // Cast the ray (consider everything as solid) 
        const hit = rapierWorld.castRay( ray, 10, true );

        // Distance between ray origin and collision
        const distance = hit.toi;

        if( distance < 0.01 )
            body.current.applyImpulse({ x: 0, y: 0.25, z: 0 });
    }

    const updatePosition = (state, delta) => {
        /**
         * Controls
         */
        const { forward, backward, leftward, rightward, jump, shiftLeft } = getKeys();

        const impulse = { x: 0, y: 0, z: 0 };

        const JUMP_FORCE = 2;
        const MOVEMENT_SPEED = ( shiftLeft ? run_speed : walk_speed ) * delta;
        const MAX_VEL = shiftLeft ? 3 : 2;

        // Lineal velocity
        const linvel = body.current.linvel();
        const linvelXAbs = Math.abs( linvel.x );
        const linvelZAbs = Math.abs( linvel.z );

        let changeRotation = false;

        if( linvelXAbs < MAX_VEL ) {
            if( rightward ) {
                impulse.x -= MOVEMENT_SPEED;
                changeRotation = true;
            }
    
            if ( leftward ) {
                impulse.x += MOVEMENT_SPEED;
                changeRotation = true;
            }
        }

        if( linvelZAbs < MAX_VEL ) {
            if ( backward ) {
                impulse.z -= MOVEMENT_SPEED;
                changeRotation = true;
            }
    
            if ( forward ) {
                impulse.z += MOVEMENT_SPEED;
                changeRotation = true;
            }
        }

        if ( jump && canJump ) {
            impulse.y += JUMP_FORCE;
            setCanJump( false )
            setHasJumped( true )
        }        

        body.current.applyImpulse(impulse);

        if( changeRotation ) {
            const angle = Math.atan2( linvel.x, linvel.z );
            gsap.to( character.current.rotation, { duration: 1, delay: 0, y: angle } )
        }

        if (!hasJumped) {
            if( linvelXAbs || linvelZAbs ) {
                if( shiftLeft ) {
                    if (animation != ANIMATIONS.RUN) {
                        updateAnimation(ANIMATIONS.RUN);
                    }
                } else {
                    if (animation != ANIMATIONS.WALK) {
                        updateAnimation(ANIMATIONS.WALK);
                    }
                }
                
            } else {
                if (animation != ANIMATIONS.IDLE) {
                    updateAnimation(ANIMATIONS.IDLE);
                }
            }
        }
    }

    useFrame((state, delta) => {
        if(!freeCam) {
            updatePosition(state, delta);
            cameraFollowPlayer( state, delta );
        } 
    });

    useEffect(() => {
        const unsubscribeJump = subscribeKeys(
            // Selector - what do we want to observe
            (state) => {
                // Listen to the jump keys
                return state.jump;
            },
            (value) => {
                if (value) {
                    onJump();
                }
            }
        );

        // When pressing any key
        const unsubscribeAny = subscribeKeys(
            () => {
                // Call store to say that the player has started playing
                //start();
            }
        );

        // Called when the component is destroyed and recreated
        return () => {
            //unsubscribeReset();
            unsubscribeJump();
            //unsubscribeAny();
        }

    }, [])

    useEffect(() => {
        if(hasJumped && animation != ANIMATIONS.JUMP) {
            onUpdateAnimation(ANIMATIONS.JUMP);
            changeAnimation(ANIMATIONS.JUMP)
        }
        console.log(hasJumped)
    }, [hasJumped])

    const updateCameraType = () => {
        return CAMERA_TYPES.ISOMETRIC === cameraType ? cameraOffset.isometric : cameraOffset.perspective;
    }
    
    useEffect(() => {
        setCameraTypeOffset(updateCameraType());
    }, [cameraType])

    return (
        <RigidBody
            ref={ body }
            position={[0, 2, 0]}
            friction={ 0.16 * walk_speed }
            enabledRotations={[false, false, false]}
            onCollisionEnter={() => {
                setCanJump(true);
                setHasJumped(false);
            }}
            colliders={false}
        >
            <CapsuleCollider args={[0.5, 0.35]} position={[0, 0.8, 0]}/>
            {/* <TrimeshCollider /> */}
            <group ref={character}>
                <Avatar />
            </group>
        </RigidBody>
    )
}

useGLTF.preload('/character.glb')