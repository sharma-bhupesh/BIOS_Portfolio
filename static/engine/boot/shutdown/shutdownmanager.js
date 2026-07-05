
import RainbowRenderer from "./rainbowrenderer.js";
import ShutdownRenderer from "./shutdownrenderer.js";
import sound from "../../utils/sound.js";

export default class ShutdownManager{
    constructor(){
        this.renderer = new ShutdownRenderer();
        this.rainbow = new RainbowRenderer();
        sound.load("end", "/static/assets/sounds/no-signal-glitch-effect.mp3");
    }
    async start(){
        this.renderer.show();
        await this.wait(800);
        this.rainbow.render();
        sound.play("end");
        await this.wait(3500);
        location.reload();
    }

    wait(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}