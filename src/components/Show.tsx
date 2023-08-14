// Component that allow us to display the children or not based on a condition
import React, { FC, ReactNode } from "react";

interface ShowProps {
	when: boolean;
	children: ReactNode;
}

const Show: FC<ShowProps> = ({
	when,
	children
}) => {
	return when ? <>{children}</> : <></>
}

export default Show;