
export default class NoSignalRenderer{

    constructor(){
        document.getElementById("app").innerHTML = `
            <div id="no-signal-screen">
                <canvas id="tv-static"></canvas>
                <div class="signal-box">
                    <div class="signal-title">NO SIGNAL</div>
                    <div class="signal-subtitle">Press F11 for Best Experience</div>
                    <div class="signal-countdown">Press Enter to Boot</div>
                </div>
            </div> 

            <div class="monitor">
                <div class="refresh-line"></div>
            </div>`;

        this.canvas = document.getElementById("tv-static");
        this.box = document.querySelector(".signal-box");
        this.title = document.querySelector(".signal-title");
        this.subtitle = document.querySelector(".signal-subtitle");
        this.countdown = document.querySelector(".signal-countdown");
    }
}