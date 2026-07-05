
import BootRenderer from "./bootrenderer.js";
import BootAnimator from "./bootanimator.js";
import BootSequence from "./bootsequence.js";
import HomeManager from "../home/HomeManager.js";
import StyleManager from "../ui/StyleManager.js";

export default class BootManager{
    constructor(){
        this.renderer =  null;
        this.animator = null;
    }
    async start(){
        this.renderer = new BootRenderer();
        this.animator = new BootAnimator(this.renderer);
        await this.animator.play(BootSequence);
        StyleManager.set("home");
        const home = new HomeManager();
        home.start();
    }
}