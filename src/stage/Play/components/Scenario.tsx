import React, { FC } from "react";
import { RigidBody } from "@react-three/rapier";

import Wrapper from "~/components/Wrapper";
import ScenarioModel from "~/components/ScenarioModel"

interface ScenarioProps {
	position?: number[];
  isDebug?: boolean;
}

const Scenario: FC<ScenarioProps> = ({
	position,
  isDebug = false,
}) => {
	return <RigidBody type="fixed">
    <Wrapper showPivotControls={isDebug} id="Scenario">
      <ScenarioModel isDebug={isDebug}/>
    </Wrapper>
	</RigidBody>
}

export default Scenario;