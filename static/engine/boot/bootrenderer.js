
export default class BootRenderer{
    constructor(){
        document.getElementById("app").innerHTML = `<div id="boot-screen"><img id="firmware-logo" src="/static/assets/images/firmware-logo.png"> <pre id="boot-text"></pre></div>
        <div class="monitor"><div class="refresh-line"></div></div>`;
        this.bootText = document.getElementById("boot-text");
        this.logo = document.getElementById("firmware-logo");
    }
    render(text){
        this.bootText.textContent = text;
    }
}