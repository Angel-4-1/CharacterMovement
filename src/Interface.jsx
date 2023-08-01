import useGame, { STAGES } from './stores/useGame'
import Show from './components/Show';
import IntroInterface from './stage/Intro/IntroInterface';
import PlayInterface from './stage/Play/PlayInterface';

export default function Interface()
{
    const stage = useGame((state) => state.stage);

    return <>
        <Show when={stage === STAGES.INTRO_STAGE}>
            <IntroInterface />
        </Show>

        <Show when={stage === STAGES.PLAY_STAGE}>
            <PlayInterface />
        </Show>
        {/* <Show when={stage === STAGES.CHARACTER_SELECTION_STAGE}>
            <CharacterSelectionInterface />
        </Show>

*/}
    </>
}