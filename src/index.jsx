import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { KeyboardControls, Loader, useProgress } from '@react-three/drei'
import Show from './components/Show'
import Interface from './Interface'
import { Suspense } from 'react'

const root = ReactDOM.createRoot(document.querySelector('#root'))

function App() {

    const { progress } = useProgress();

    return (
        <KeyboardControls
            map={ [
                { name: "forward", keys: [ "ArrowUp", "KeyW" ] },
                { name: "backward", keys: [ "ArrowDown", "KeyS" ] },
                { name: "leftward", keys: [ "ArrowLeft", "KeyA" ] },
                { name: "rightward", keys: [ "ArrowRight", "KeyD" ] },
                { name: "shiftLeft", keys: [ "ShiftLeft" ] },
                { name: "jump", keys: [ "Space" ] },
            ] }
        >
            <Canvas
                shadows
                camera={ {
                    fov: 30,
                    near: 0.001,
                    far: 2000,
                    position: [ 6, 1.5, -7 ]
                    //position: [ 0, 2, 5 ]
                } }
            >
                <Show when={progress === 100}>
                    <Suspense fallback={null}>
                        <Experience />
                    </Suspense>
                </Show>
            </Canvas>

            <Loader />

            <Show when={progress === 100}>
                <Interface />
            </Show>
            
        </KeyboardControls>
    )
}

root.render(
    <App />
)