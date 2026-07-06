
export default class Preloader{
    constructor(contentManager){
        this.content = contentManager;
        this.started = false;
    }

    start(){
        if(this.started){
            return;
        }
        this.started = true;
        this.content.preload(["about", "projects", "resume", "social", "contact"]);
    }
}