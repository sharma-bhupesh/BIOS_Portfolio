
import HomeLayout from "./HomeLayout.js";

export default class HomeRenderer{
    render(){
        document.getElementById("app").innerHTML = HomeLayout;
    }

    updateFocus(index){
        const items = document.querySelectorAll(".menu-item");
        items.forEach(item => item.classList.remove("selected"));
        items[index].classList.add("selected");
    }
}