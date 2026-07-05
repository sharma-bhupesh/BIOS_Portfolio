
export default class RainbowRenderer{
    render(){
        document.body.innerHTML = `
            <div class="crt-screen">
                <div class="crt-bars">
                    <div class="bar white"></div>
                    <div class="bar yellow"></div>
                    <div class="bar cyan"></div>
                    <div class="bar green"></div>
                    <div class="bar magenta"></div>
                    <div class="bar red"></div>
                    <div class="bar blue"></div>
                </div>

                <div class="crt-message">
                    <div class="crt-title">SIGNAL LOST</div>
                    <div class="crt-subtitle">PLEASE STAND BY</div>
                </div>
            </div>
        `;
    }
}