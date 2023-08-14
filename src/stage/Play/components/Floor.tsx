import React, { FC } from "react";
import { RigidBody } from "@react-three/rapier";
import Show from '~/components/Show';
import { Edges } from "@react-three/drei";

export interface FloorProps {
	showEdges?: boolean
}

const Floor: FC<FloorProps> = ({
	showEdges = false
}) => {
	return <RigidBody type="fixed">
		<mesh receiveShadow position={[0, -0.05, 0]}>
			<boxGeometry args={[50, 0.1, 50]} />
			<meshStandardMaterial color="lightblue" />
			<Show when={showEdges}>
				<Edges />
			</Show>
		</mesh>
	</RigidBody>
}

export default Floor;