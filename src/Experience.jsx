
import IntroStage from './stage/Intro/IntroStage'
import PlayStage from './stage/Play/PlayStage'
import useGame, { STAGES, STAGES_NAMES, LANGUAGES } from './stores/useGame';
import Show from './components/Show';
import { Leva, useControls } from 'leva';
import { useDebug } from './utils/useDebug';

export default function Experience() {
    const stage = useGame((state) => state.stage);
    const changeStage = useGame((state) => state.changeStage);
    const changeLanguage = useGame((state) => state.changeLanguage);

    const isDebugActive = useDebug();

    const [{ data_stage, data_language }, set, get] = useControls('Experience', () => ({
        data_stage: {
            options: STAGES_NAMES,
            value: STAGES_NAMES[STAGES.INTRO_STAGE],
            onChange: (value) => {
                switch (value) {
                    case STAGES_NAMES[STAGES.INTRO_STAGE]:
                        changeStage(STAGES.INTRO_STAGE);
                        break;
                    // case STAGES_NAMES[STAGES.CHARACTER_SELECTION_STAGE]:
                    //     changeStage(STAGES.CHARACTER_SELECTION_STAGE);
                    //     break;
                    case STAGES_NAMES[STAGES.PLAY_STAGE]:
                        changeStage(STAGES.PLAY_STAGE);
                        break;
                    default:
                        break;
                }
            }
        },
        data_language: {
            options: [LANGUAGES[0].name, LANGUAGES[1].name],
            value: LANGUAGES[0].name,
            onChange: (value) => {
                switch (value) {
                    case LANGUAGES[0].name:
                        changeLanguage(LANGUAGES[0].id);
                        break;
                    case LANGUAGES[1].name:
                        changeLanguage(LANGUAGES[1].id);
                        break;
                    default:
                        break;
                }
            }
        },
    }));

    // Catch updateStage event
    document.addEventListener("updateStage", function (e) {
        set({ data_stage: e.detail });
    });
    
    // Catch updateLanguage event
    document.addEventListener("updateLanguage", function (e) {
        set({ data_language: e.detail.name });
    });

    return <>
        <color args={['#252731']} attach="background" />

        <Show when={!isDebugActive}>
            <Leva hidden/>
        </Show>

        <Show when={stage === STAGES.INTRO_STAGE}>
            <IntroStage />
        </Show>

        {/* <Show when={stage === STAGES.CHARACTER_SELECTION_STAGE}>
            <CharacterSelectionStage />
        </Show> */}

        <Show when={stage === STAGES.PLAY_STAGE}>
            <PlayStage />
        </Show>
    </>
}