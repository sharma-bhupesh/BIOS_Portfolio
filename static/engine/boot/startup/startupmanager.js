
import BootManager from "../bootmanager.js";
import NoSignalRenderer from "./nosignalrenderer.js";
import NoSignalAnimator from "./nosignalanimator.js";
import Sound from "../../utils/sound.js";

export default class StartupManager{
    constructor(){
        this.boot = new BootManager();
        this.noSignal = null;
        this.animator = null;
    }

    async start(){
        this.noSignal = new NoSignalRenderer();
        this.animator = new NoSignalAnimator(this.noSignal);
        await this.animator.play();
        await this.boot.start();
    }

    wait(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}