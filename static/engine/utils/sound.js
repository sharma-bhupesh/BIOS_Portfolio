
class SoundManager{
    constructor(){
        this.sounds = {};
    }

    load(name, path){
        if(this.sounds[name]){
            return;
        }
        const audio = new Audio(path);
        audio.preload = "auto";
        this.sounds[name] = audio;
    }

    play(name){
        const sound = this.sounds[name];
        if(!sound){
            return;
        }
        sound.currentTime = 0;
        sound.play();
    }

    stop(name){
        const sound = this.sounds[name];
        if(!sound){
            return;
        }
        sound.loop = false;
        sound.pause();
        sound.currentTime = 0;
    }

    setVolume(name, volume){
        const sound = this.sounds[name];
        if(!sound){
            return;
        }
        sound.volume = volume;
    }

    unlock(){
        const audio = new Audio();
        audio.play().catch(() => {});
    }

    playLoop(name){
        const sound = this.sounds[name];
        if(!sound){
            return;
        }
        sound.loop = true;
        sound.currentTime = 0;
        sound.play();
    }
}

export default new SoundManager();