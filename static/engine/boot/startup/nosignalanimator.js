
import Sound from "../../utils/sound.js";
export default class NoSignalAnimator{
    constructor(renderer){
        this.renderer = renderer;
        Sound.load("static","/static/assets/sounds/white-noise-static.mp3");
    }

    async play(){
        this.flickerLoop = null;
        this.startStatic();
        this.startFlicker();
        await this.waitForEnter();
        Sound.play("static");
        await this.wait(3000);
        Sound.stop("static");
        this.stopFlicker();
        this.stopStatic();
    }

    wait(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    startStatic(){
        const canvas = this.renderer.canvas;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const image = ctx.createImageData(canvas.width, canvas.height);

        this.staticLoop = setInterval(() => {
            for(let i=0; i < image.data.length; i+=4){
                const shade = Math.random() * 255;
                image.data[i] = shade;
                image.data[i + 1] = shade;
                image.data[i + 2] = shade;
                image.data[i + 3] = 255;
            }
            ctx.putImageData(image,0,0);
        },33);
    }

    startFlicker(){
        const screen = document.getElementById("no-signal-screen");
        const flicker = () => {
            const brightness = 0.985 + Math.random() * 0.03;
            screen.style.filter = `brightness(${brightness})`;
            const next = 350 + Math.random() * 900;
            this.flickerLoop = setTimeout(flicker, next);
        }
        flicker();
    }

    stopFlicker(){
        clearInterval(this.flickerLoop);
        document.getElementById("no-signal-screen").style.filter = "";
    }

    stopStatic(){
        clearInterval(this.staticLoop);
    }

    waitForEnter(){
        return new Promise(resolve => {
            const handler = (event) => {
                if(event.key !== "Enter"){
                    return;
                }
                document.removeEventListener("keydown", handler);
                this.renderer.countdown.textContent = "Booting....";
                resolve();
            };
            document.addEventListener("keydown", handler);
        });
    }
}