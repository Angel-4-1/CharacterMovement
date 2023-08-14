import React, { FC, useRef } from "react";
import { RigidBody } from "@react-three/rapier";
import Show from '~/components/Show';
import { Edges } from "@react-three/drei";
import { Vector3 } from 'three';
import Wrapper from "~/components/Wrapper";
import { button, useControls } from "leva";

export interface BoxProps {
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

const Box: FC<BoxProps> = ({
	position,
	size,
	placeAtFloor = false,
	showPivotControls = false,
	rotationX = 0,
	rotationZ = 0,
	color = "#e0d290",
	showEdges = false,
	id,
}) => {
	let positionAsVector3 = new Vector3(position[0], position[1], position[2]);
	let sizeAsVector3 = new Vector3(size[0], size[1], size[2]);

	if ( placeAtFloor ) {
		positionAsVector3.y = positionAsVector3.y - sizeAsVector3.y / 2.0;
	}

	const box = useRef();

	const values = useControls(`Box ${id}`, {
		clickMe: button( () => { 
			console.log( box.current ); 
			try {
				// @ts-expect-error
				console.log( 'position', wrapperRef.current.children[1].children[0].position )
			 } catch (error) {
				
			 }
		} ),
	});

	return <RigidBody type="fixed">
		<Wrapper showPivotControls={showPivotControls} id={id}>
			<mesh receiveShadow position={positionAsVector3} ref={box}
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

export default Box;