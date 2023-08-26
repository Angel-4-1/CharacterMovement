import { TRANSLATIONS } from "../../translations"
import { useKeyboardControls } from '@react-three/drei'
import './style.css'
import { useTranslation } from "../../utils/useTranslation";
import useGame, { CAMERA_TYPES } from '../../stores/useGame'

export default function PlayInterface()
{
    const forward = useKeyboardControls((state) => state.forward)
    const backward = useKeyboardControls((state) => state.backward)
    const leftward = useKeyboardControls((state) => state.leftward)
    const rightward = useKeyboardControls((state) => state.rightward)
    const jump = useKeyboardControls((state) => state.jump)
    const shiftLeft = useKeyboardControls((state) => state.shiftLeft)

    const freeCam = useGame((state) => state.freeCam);
    const setFreeCam = useGame((state) => state.setFreeCam);
    
    // const cameraType = useGame((state) => state.cameraType);
    // const setCameraType = useGame((state) => state.setCameraType);

    const checkBoxClick = (event) => {
        setFreeCam(!freeCam);
    }
    
    // const isActive = () => {
    //     return CAMERA_TYPES.ISOMETRIC === cameraType;
    // }

    return <div className="play-container">
        <div className="options">
            <label className="switch">
                <input type="checkbox" onClick={checkBoxClick} onKeyDown={() => {}}></input>
                <span className="slider round"></span>
            </label>
            <p>{useTranslation(TRANSLATIONS.controls.freeCamera)}</p>
        </div>

        {/* <form>
            <fieldset className="camera-options">
                <legend>Choose your camera preference</legend>
                <div className="form__group">
                    <input type="radio" id="perspective" value="perspective" name="camera-type"
                        onChange={() => setCameraType(CAMERA_TYPES.PERSPECTIVE)}
                    />
                    <label>{useTranslation(TRANSLATIONS.camera.perspective)}</label>
                </div>
                <div className="form__group">
                    <input type="radio" id="isometric" value="isometric" name="camera-type"
                        checked
                        onChange={() => setCameraType(CAMERA_TYPES.ISOMETRIC)}
                    />
                    <label>{useTranslation(TRANSLATIONS.camera.isometric)}</label>
                </div>
            </fieldset>
        </form> */}

        {/* Keyboard */}
        <div className="controls">
            { /* Arrows */ }
            <div className="content-left">
                <div className="raw">
                    <div className={ `key text-centered ${ forward ? 'active' : '' }` }>
                        <span>{useTranslation(TRANSLATIONS.controls.forward.key)}</span>
                    </div>
                </div>
                <div className="raw">
                    <div className={ `key text-centered ${ leftward ? 'active' : '' }` }>
                        <span>{useTranslation(TRANSLATIONS.controls.leftward.key)}</span>
                    </div>
                    <div className={ `key text-centered ${ backward ? 'active' : '' }` }>
                        <span>{useTranslation(TRANSLATIONS.controls.backward.key)}</span>
                    </div>
                    <div className={ `key text-centered ${ rightward ? 'active' : '' }` }>
                        <span>{useTranslation(TRANSLATIONS.controls.rightward.key)}</span>
                    </div>
                </div>
            </div>

            <div className="content-right">
                { /* L Shift */ }
                <div className="key-with-defintion">
                    <div className="key-with-defintion-left raw">
                        <div className={ `key text-centered medium ${ shiftLeft ? 'active' : '' }` }>
                            <span>{useTranslation(TRANSLATIONS.controls.run.key)}</span>
                        </div>
                    </div>
                    <div className="key-with-defintion-right raw">
                        <div className="key-definition text-centered">
                            <p>{useTranslation(TRANSLATIONS.controls.run.definition)}</p>
                        </div>
                    </div>
                </div>

                { /* Space */ }
                <div className="key-with-defintion">
                    <div className="key-with-defintion-left raw">
                        <div className={ `key text-centered large ${ jump ? 'active' : '' }` }>
                            <span>{useTranslation(TRANSLATIONS.controls.jump.key)}</span>
                        </div>
                    </div>
                    <div className="key-with-defintion-right raw">
                        <div className="key-definition text-centered">
                            <span>{useTranslation(TRANSLATIONS.controls.jump.definition)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}