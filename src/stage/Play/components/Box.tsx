import React, { FC } from "react";
import { RigidBody } from "@react-three/rapier";
import Show from '~/components/Show';
import { Edges } from "@react-three/drei";
import { Vector3 } from 'three';
import Wrapper from "~/components/Wrapper";

export interface BoxProps {
	position: number[];
	size: number[];
	placeAtFloor?: boolean;
	showPivotControls?: boolean;
	rotationX?: number;
	rotationZ?: number;
	color?: string;
	showEdges?: boolean;
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
}) => {
	let positionAsVector3 = new Vector3(position[0], position[1], position[2]);
	let sizeAsVector3 = new Vector3(size[0], size[1], size[2]);

	if ( placeAtFloor ) {
		positionAsVector3.y = positionAsVector3.y - sizeAsVector3.y / 2.0;
	}

	return <RigidBody type="fixed">
		<Wrapper showPivotControls={showPivotControls}>
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

export default Box;