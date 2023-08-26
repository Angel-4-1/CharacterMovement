// Wrap an object between pivot controls
import React, { FC, ReactNode, useRef, useState } from "react"
import { PivotControls } from "@react-three/drei"
import { button, useControls } from "leva";
import { Euler, Quaternion, Vector3 } from "three";
import { radToDeg } from "three/src/math/MathUtils";
import { log } from "console";

interface WrapperProps {
	showPivotControls: boolean;
	children: ReactNode;
	id: string;
}

const Wrapper: FC<WrapperProps> = ({
	showPivotControls,
	children,
	id,
}) => {
	const wrapperRef = useRef();
	/*const values = useControls(`Wrapper ${id}`, {
		clickMe: button( () => { 
			console.log( wrapperRef.current ); 
			try {
				@ts-expect-error
				console.log( 'position', wrapperRef.current.children[1].children[0].position )
			 } catch (error) {
				
			 }
		} ),
	});*/

	const [pos, setPos] = useState(new Vector3());
	const [rot, setRot] = useState(new Quaternion());

	if (showPivotControls) {
		return <PivotControls
			ref={wrapperRef}
			anchor={[0, 0, 0]}
			depthTest={false}    	// we want the controls to be on top of everything 
			lineWidth={4}
			fixed={true}          // to have it always as the same size --> we will need to specify a bigger scale
			scale={100}           // size in pixels
			onDragEnd={() => {
				console.log('New Position: ', pos)
				console.log('New Rotation: ', rot)
			}}
			onDrag={(l, dl, w, dw) => {
				// Extract the position and rotation
				const position = new Vector3()
				const rotation = new Quaternion()
				// I'm never sure whether to grab "l" or "w" here... sorry
				w.decompose(position, rotation, new Vector3())
				setPos(position)
				//setRot(rotation)
		}}
		>
			{children}
		</PivotControls>
	} else {
		return <>{children}</>
	}
}

export default Wrapper;