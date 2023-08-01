import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware"

export const STAGES = {
    INTRO_STAGE: 0,
    LANGUAGE_STAGE: 1,
    CHARACTER_SELECTION_STAGE: 2,
    PLAY_STAGE: 3,
    FINAL_STAGE: 4,
};

// Must follow the same order as STAGES !!
export const STAGES_NAMES = [
    "Intro",
    "Language",
    "Character Selection",
    "Play",
    "Final",
];

export const LANGUAGES =  [
    { name: "English", id: 0 , screen_name : "English" , image: "assets/languages/english.png" },
    { name: "Spanish", id: 1 , screen_name : "Español" , image: "assets/languages/spain.png" }
];

export const PHASES = {
    playing: "playing",
    ready: "ready",
    ended: "ended",
};

export default create(subscribeWithSelector((set) => {
    return {
        blocksCount: 10,
        blocksSeed: 0,  // To add level randomness

        /**
         * Time
         */
        startTime: 0,
        endTime: 0,

        /**
         * Phases
         */
        phase: 'ready',
        
        start: () => {
            set((state) => {
                return state.phase === PHASES.ready 
                    ? { phase: PHASES.playing, startTime: Date.now(), endTime: Date.now() } 
                    : {};
            })
        },

        restart: () => {
            set((state) => {
                return state.phase === PHASES.playing || state.phase === PHASES.ended 
                    ? { phase: PHASES.ready, blocksSeed: Math.random() } 
                    : {};
            })
        },

        end: () => {
            set((state) => {
                return state.phase === PHASES.playing 
                    ? { phase: PHASES.ended, endTime: Date.now() }
                    : {};
            })
        },

        /**
         * Language
         */
        language: LANGUAGES[0].id,

        changeLanguage: ( langId ) => {
            set(() => {
                return { language: langId };
            })
        },

        // Trigger event
        onUpdateLanguage: (changeToLanguageId) => {
            // Create the event
            // detail is a property of the Event, so assign any data you want to access at the other end to it and access by event.detail on the listener
            var event = new CustomEvent("updateLanguage", { "detail": LANGUAGES[changeToLanguageId] });
            
            // Dispatch/Trigger the event
            document.dispatchEvent(event);    
        },
        
        /**
         * Stage
         */
        stage: STAGES.INTRO_STAGE,

        changeStage: ( stage ) => {
            set(() => {
                return { stage: stage }
            })
        },

        // Trigger event
        onUpdateStage: (changeToStage) => {
            // Create the event
            // detail is a property of the Event, so assign any data you want to access at the other end to it and access by event.detail on the listener
            var event = new CustomEvent("updateStage", { "detail": STAGES_NAMES[changeToStage] });
            
            // Dispatch/Trigger the event
            document.dispatchEvent(event);    
        }
    }
}));