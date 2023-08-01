import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware"

export const ANIMATIONS = {
    IDLE: 0,
    WALK: 1,
    RUN: 2,
    JUMP: 3,
};

// Must follow the same order as CHARACTERS !!
export const PLAYER_ANIMATIONS = [
    { name: "idle", path: "animations/Idle.fbx" },
    { name: "walk", path: "animations/Walking.fbx" },
    { name: "run", path: "animations/Running.fbx" },
    { name: "jump", path: "animations/JumpingSmall.fbx" },
];

export default create(subscribeWithSelector((set) => {
    return {        
        /**
         * Player
         */
        animation: ANIMATIONS.IDLE,

        changeAnimation: ( animation ) => {
            set(() => {
                return { animation: animation }
            })
        },

        // Trigger event
        onUpdateAnimation: (changeToAnimation) => {
            //this.changeAnimation(changeToAnimation)
            // Create the event
            // detail is a property of the Event, so assign any data you want to access at the other end to it and access by event.detail on the listener
            var event = new CustomEvent("updateAnimation", { "detail": PLAYER_ANIMATIONS[changeToAnimation].name });
            
            // Dispatch/Trigger the event
            document.dispatchEvent(event);    
        }
    }
}));