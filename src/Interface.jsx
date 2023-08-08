import React, { useEffect, useState } from 'react';
import useGame, { STAGES, PHASES } from './stores/useGame'
import Show from './components/Show';
import IntroInterface from './stage/Intro/IntroInterface';
import PlayInterface from './stage/Play/PlayInterface';

export default function Interface()
{
    const stage = useGame((state) => state.stage);
    const phase = useGame((state) => state.phase);

    const [isPlayingPhase, setIsPlayingPhase] = useState(false);

    useEffect(() => {
        if (phase === PHASES.playing) {
            setIsPlayingPhase(true)
        }
    }, [phase])

    return <>
        <Show when={stage === STAGES.INTRO_STAGE}>
            <IntroInterface />
        </Show>

        <Show when={stage === STAGES.PLAY_STAGE && isPlayingPhase}>
            <PlayInterface />
        </Show>
    </>
}