
export default class Launcher{
    constructor(content){
        this.content = content;
        this.onLaunch = null;
    }
    launch(id){
        this.content.open(id);
        if(this.onLaunch){
            this.onLaunch();
        }
    }
}