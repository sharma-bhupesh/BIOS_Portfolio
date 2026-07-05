
export default class Navigation{
    constructor(){
        this.focusIndex = 0;
        this.items = [];
        this.onFocusChanged = null;
        this.onActivate = null;
        this.mode = "home";
        this.onEscape = null;
    }
    setItems(items, focusIndex = 0){
        this.items = items;
        this.focusIndex = focusIndex;
        if(items.length && this.onFocusChanged){
            this.onFocusChanged(this.focusIndex);
        }
    }

    start(){
        this.setItems(document.querySelectorAll(".menu-item"));
    }

    handleKeyDown(event){
        switch(event.key){
            case "ArrowUp":
                this.moveFocus(-1);
                break;
            case "ArrowDown":
                this.moveFocus(1);
                break;
            case "Enter":
                if(this.onActivate){
                    this.onActivate(this.items[this.focusIndex], this.focusIndex);
                }
                break;
            case "Escape":
                if(this.onEscape){
                    this.onEscape();
                }
                break;
        }
    }

    moveFocus(direction){
        this.focusIndex += direction;
        if(this.focusIndex < 0){
            this.focusIndex = this.items.length -1;
        }
        if(this.focusIndex >=this.items.length){
            this.focusIndex = 0;
        }
        if(this.onFocusChanged){
            this.onFocusChanged(this.focusIndex);
        }
    }
}