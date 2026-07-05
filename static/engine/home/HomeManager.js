
import HomeRenderer from "./HomeRenderer.js";
import Navigation from "../core/Navigation.js";
import Launcher from "../core/launcher.js";
import OverlayManager from "../core/overlay/OverlayManager.js";
import KeyboardManager from "../core/input/keyboardmanager.js";
import ContentManager from "../core/content/contentManager.js";
import { HandleFault } from "../utils/faultHandler.js";
import MailService from "../utils/mailservice.js";
import Sound from "../utils/sound.js";
import ShutdownManager from "../boot/shutdown/shutdownmanager.js";

export default class HomeManager{
    constructor(){
        this.renderer = new HomeRenderer();
        this.navigation = new Navigation();
        this.keyboard = new KeyboardManager();
        this.overlay = new OverlayManager();
        this.overlay.onLaunch = (path) => {
            this.launcher.launch(path);         
        };
        this.content = new ContentManager(this.overlay);
        this.launcher = new Launcher(this.content);
        this.overlayOpen = false;
        this.overlay.mailservice = new MailService();
        this.overlay.shutdownManager = new ShutdownManager();
        Sound.load("click", "/static/assets/sounds/click.mp3");
    }

    start(){
        this.renderer.render();
        this.navigation.onFocusChanged = (index) => {
            if(this.overlayOpen){
                this.overlay.updateFocus(index);
            }
            else{
                this.renderer.updateFocus(index);
            }
        };
        this.navigation.onActivate = (item, index) => {
            if(this.overlayOpen){
                const action = this.overlay.actions[index];
                action.element.click();
            }
            else{
                this.homeIndex = this.navigation.focusIndex;
                if(item.id === "exit"){
                    this.overlay.showShutdownDialog();
                    return;
                }
                Sound.play("click");
                this.launcher.launch(item.id);
            }
        };
        this.overlay.onOpen = () => {
            this.overlayOpen = true;
            this.navigation.setItems(this.overlay.actions.map(action => action.element));
        };
        this.navigation.onEscape = () => {
            if(this.overlayOpen){
                this.overlay.close();
            }
        };
        this.overlay.onClose = () => {
            this.overlayOpen = false;
            this.navigation.setItems(document.querySelectorAll(".menu-item"), this.homeIndex);
            this.navigation.focusIndex = this.homeIndex;
            this.renderer.updateFocus(this.homeIndex);
        };

        this.navigation.start();
        this.keyboard.setController(this.navigation);
        this.keyboard.start();
    }
}