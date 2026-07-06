
export default class Effects{
    constructor(){
        this.refreshLine = document.querySelector(".refresh-line");
    }
        RefreshLine(){
            if(!this.refreshLine) return;
            this.refreshLine.style.opacity = "1";
            const randomY = Math.random() * window.innerHeight;
            this.refreshLine.style.top = `${randomY}px`;
    }
}