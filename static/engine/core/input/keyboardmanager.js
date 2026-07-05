
import Sound from "../../utils/sound.js";

export default class KeyboardManager{
    constructor(){
        this.controller = null;
    }
    setController(controller){
        this.controller = controller;
    }
    start(){
        document.addEventListener("keydown", (event) => {
            if(this.controller){
                this.controller.handleKeyDown(event);
            }
            if(!this.audioUnlocked){
                Sound.unlock();
                this.audioUnlocked = true;
            }
        });
    }
}