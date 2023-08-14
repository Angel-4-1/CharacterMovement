import React, { useRef } from 'react'
import { useGLTF, useFBX, useAnimations } from '@react-three/drei'
import { useEffect } from 'react';
import { useControls } from 'leva';
import { ANIMATIONS, PLAYER_ANIMATIONS } from '../stores/usePlayer';

export function Avatar(props) {
    const body = useRef();
    const { nodes, materials } = useGLTF('models/character.glb');

    // Leva Controls
    const { wireframe } = useControls({
        wireframe: false,
    });

    const [{ animation }, set] = useControls('Avatar', () => ({
        animation: {
            value: PLAYER_ANIMATIONS[ANIMATIONS.IDLE].name,
            options: [
                PLAYER_ANIMATIONS[ANIMATIONS.IDLE].name,
                PLAYER_ANIMATIONS[ANIMATIONS.WALK].name,
                PLAYER_ANIMATIONS[ANIMATIONS.RUN].name,
                PLAYER_ANIMATIONS[ANIMATIONS.JUMP].name
            ]
        }
    }));

    // Load animations
    const { animations: idleAnimation } = useFBX( PLAYER_ANIMATIONS[ANIMATIONS.IDLE].path );
    const { animations: walkAnimation } = useFBX( PLAYER_ANIMATIONS[ANIMATIONS.WALK].path );
    const { animations: runAnimation }  = useFBX( PLAYER_ANIMATIONS[ANIMATIONS.RUN].path );
    const { animations: jumpAnimation } = useFBX( PLAYER_ANIMATIONS[ANIMATIONS.JUMP].path );

    // Rename the name of the animation
    idleAnimation[0].name = PLAYER_ANIMATIONS[ANIMATIONS.IDLE].name;
    walkAnimation[0].name = PLAYER_ANIMATIONS[ANIMATIONS.WALK].name;
    runAnimation[0].name  = PLAYER_ANIMATIONS[ANIMATIONS.RUN].name;
    jumpAnimation[0].name = PLAYER_ANIMATIONS[ANIMATIONS.JUMP].name;

    const { actions } = useAnimations(
        [
            idleAnimation[0],
            walkAnimation[0],
            runAnimation[0],
            jumpAnimation[0]
        ],
        body
    );

    useEffect(() => {
        actions[animation]?.reset().fadeIn(0.5).play();

        // Stop previous animation
        return () => {
            actions[animation]?.fadeOut(0.5);
        }
    }, [animation])

    useEffect(() => {
        Object.values(materials).forEach((m) => {
            m.wireframe = wireframe
        })
    }, [wireframe])

    useEffect(() => {
        // Avoid parts of the model to disappear from the scene depending on the angle / zoom of the camera
        body.current.traverse(function (object) {
            object.frustumCulled = false;
        });
    }, [])

    // Catch updateStage event
    document.addEventListener("updateAnimation", function(e) {
        set({animation: e.detail});
    });

    return (
        <group {...props} ref={body} dispose={null}>
            <primitive object={nodes.Hips} />
            <skinnedMesh castShadow geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} />
            <skinnedMesh castShadow geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
            <skinnedMesh castShadow geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
            <skinnedMesh castShadow geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
            <skinnedMesh castShadow geometry={nodes.Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair.skeleton} />
            <skinnedMesh castShadow name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
            <skinnedMesh castShadow name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
            <skinnedMesh castShadow name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
            <skinnedMesh castShadow name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
        </group>
    )
}

useGLTF.preload('models/character.glb');