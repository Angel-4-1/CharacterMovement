// Wrap an object between pivot controls
import React from "react"
import { PivotControls } from "@react-three/drei"

export default function Wrapper({
    showPivotControls, 
    children
}){
    if ( showPivotControls ) {
        return <PivotControls 
            anchor={ [ 0, 0, 0 ] }
            depthTest= { false }    // we want the controls to be on top of everything 
            lineWidth={ 4 }
            fixed={ true }          // to have it always as the same size --> we will need to specify a bigger scale
            scale={ 100 }           // size in pixels
        >
            {children}
        </PivotControls>
    } else {
        return <>{children}</>
    }
}