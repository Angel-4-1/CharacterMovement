// import { useKeyboardControls } from '@react-three/drei'
// import useGame from '../../stores/useGame';
// import { PHASES } from '../../stores/useGame';
// import { useEffect, useState } from 'react';
// import { addEffect } from '@react-three/fiber';

// export default function PlayInterface()
// {
//     const [ time, setTime ] = useState( 0.00 );

//     // const restart = useGame((state) => state.restart);
//     // const phase = useGame((state) => state.phase);

//     const forward = useKeyboardControls((state) => state.forward)
//     const backward = useKeyboardControls((state) => state.backward)
//     const leftward = useKeyboardControls((state) => state.leftward)
//     const rightward = useKeyboardControls((state) => state.rightward)
//     const jump = useKeyboardControls((state) => state.jump)

//     useEffect(() => {
//         // Function called each frame but with the scope/data of the first frame
//         // so we will need to obtain the game state inside of it
//         const unsubscribeEffect = addEffect(() => {
//             // Get the current state
//             const state = useGame.getState();

//             let elapsedTime = 0;
//             if ( state.phase === PHASES.playing ) {
//                 elapsedTime = Date.now() - state.startTime;
//             } else if ( state.phase === PHASES.ended ) {
//                 elapsedTime = state.endTime - state.startTime;
//             }

//             elapsedTime /= 1000;
//             elapsedTime = elapsedTime.toFixed(2);

//             setTime( elapsedTime );
//         });

//         return () => {
//             unsubscribeEffect()
//         }
//     }, []);

//     return <div className="interface">
//         {/* Time */}
//         {/* <div className="time">{ time }</div> */}
        
//         {/* Keyboard */}
//         <div className="controls">
//             <div className="raw">
//                 <div className={ `key ${ forward ? 'active' : '' }` }></div>
//             </div>
//             <div className="raw">
//                 <div className={ `key ${ leftward ? 'active' : '' }` }></div>
//                 <div className={ `key ${ backward ? 'active' : '' }` }></div>
//                 <div className={ `key ${ rightward ? 'active' : '' }` }></div>
//             </div>
//             <div className="raw">
//                 <div className={ `key large ${ jump ? 'active' : '' }` }></div>
//             </div>
//         </div>

//     </div>
// }

import { TRANSLATIONS } from "../../translations"
import useGame, { STAGES, LANGUAGES } from '../../stores/useGame';
import { useKeyboardControls } from '@react-three/drei'
import './style.css'

export default function PlayInterface()
{
    const language = useGame((state) => state.language);
    // const changeStage = useGame((state) => state.changeStage);
    // const onUpdateStage = useGame((state) => state.onUpdateStage);
    // const changeLanguage = useGame((state) => state.changeLanguage);
    // const onUpdateLanguage = useGame((state) => state.onUpdateLanguage);

    const forward = useKeyboardControls((state) => state.forward)
    const backward = useKeyboardControls((state) => state.backward)
    const leftward = useKeyboardControls((state) => state.leftward)
    const rightward = useKeyboardControls((state) => state.rightward)
    const jump = useKeyboardControls((state) => state.jump)

    return <div className="play-container">
        {/* <div className="title">
            <h1>CONTROLS</h1>
        </div> */}

        {/* Keyboard */}
        <div className="controls">
            <div className="raw">
                <div className={ `key ${ forward ? 'active' : '' }` }></div>
            </div>
            <div className="raw">
                <div className={ `key ${ leftward ? 'active' : '' }` }></div>
                <div className={ `key ${ backward ? 'active' : '' }` }></div>
                <div className={ `key ${ rightward ? 'active' : '' }` }></div>
            </div>
            <div className="raw">
                <div className={ `key large ${ jump ? 'active' : '' }` }></div>
            </div>
        </div>

        {/* <div className="languages">
            { LANGUAGES.map((language, index) => {
                return <button key={index} className="btn-language"
                    style={{
                    // backgroundImage: 'url(' + require(`@/${ language.image }`) + ')'
                    backgroundImage: `url(${language.image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
                onClick={() => onButtonLanguageClick(language.id)}
                >{language.name}</button>
            })}
        </div> */}
    </div>
}