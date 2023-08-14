import React, { FC, useRef, useState } from "react";
import { RigidBody } from "@react-three/rapier";
import Show from '~/components/Show';
import { Edges } from "@react-three/drei";
import { Vector3 } from 'three';
import Wrapper from "~/components/Wrapper";
import { useFrame } from "@react-three/fiber";

export interface KinematicBoxProps {
	position: number[];
	size: number[];
	placeAtFloor?: boolean;
	showPivotControls?: boolean;
	rotationX?: number;
	rotationZ?: number;
	color?: string;
	showEdges?: boolean;
	id: string;
}

const KinematicBox: FC<KinematicBoxProps> = ({
	position,
	size,
	placeAtFloor = false,
	showPivotControls = false,
	rotationX = 0,
	rotationZ = 0,
	color = "#ac88b7",
	showEdges = false,
	id,
}) => {
	let positionAsVector3 = new Vector3(position[0], position[1], position[2]);
	let sizeAsVector3 = new Vector3(size[0], size[1], size[2]);

	if ( placeAtFloor ) {
		positionAsVector3.y = positionAsVector3.y - sizeAsVector3.y / 2.0;
	}

	const box = useRef();
	const [ timeOffset ] = useState(() => Math.random() * Math.PI * 2 );

	useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const y = Math.sin( time + timeOffset ) + 1.1;

    (box.current as any).setNextKinematicTranslation({ 
			x: positionAsVector3.x, 
			y: positionAsVector3.y + y, 
			z: positionAsVector3.z 
		});
  });

	return <RigidBody type="kinematicPosition" ref={ box }>
		<Wrapper showPivotControls={showPivotControls} id={id}>
			<mesh receiveShadow position={positionAsVector3}
				rotation-x={rotationX}
				rotation-z={rotationZ}
			>
				<boxGeometry args={[sizeAsVector3.x, sizeAsVector3.y, sizeAsVector3.z]} />
				<meshStandardMaterial color={color} />

				<Show when={showEdges}>
					<Edges />
				</Show>
			</mesh>
		</Wrapper>
	</RigidBody>
}

export default KinematicBox;