import React, { FC } from "react";
import Box from "./Box";

export interface StairsProps {
	numStairs: number;
	showEdges?: boolean;
	showPivotControls?: boolean,
}

const Stairs: FC<StairsProps> = ({
	numStairs,
	showEdges = false,
	showPivotControls = false,
}) => {
	return <>
		{Array.from({length: numStairs}).map((_, index) => 
			<Box
				position={[-7, 0.06 + index * 0.06, 10 + index * 0.9]}
				size={[3, 0.06, 0.9]}
				showEdges={showEdges}
				placeAtFloor={true}
				showPivotControls={showPivotControls}
				key={`stair-${index}`}
			/>
		)}
	</>
}

export default Stairs;