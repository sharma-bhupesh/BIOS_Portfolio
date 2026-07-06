
import OverlayLayout from "./overlayLayout.js";
import Effects from "../../ui/effects.js";
import { HandleValidation, HandleSuccess, HandleMessage } from "../../utils/faultHandler.js";
import * as ContactHelpers from "../../utils/ContactHelpers.js";
import Sound from "../../utils/sound.js";

export default class OverlayManager{
    constructor(){
        this.effects = new Effects();
        this.onClose = null;
        this.history = [];
        this.onLaunch = [];
        this.mailservice = null;
        this.shutdownManager = null;
        Sound.load("click", "/static/assets/sounds/click.mp3");
    }
    open(content, saveHistory = true){
        this.effects.RefreshLine();
        this.actions = [];
        this.selectedAction = 0;
        if(!document.querySelector(".overlay")){
            document.body.insertAdjacentHTML("beforeend", OverlayLayout);
        }
        const overlay = document.querySelector(".overlay");
        const screen = document.querySelector(".screen");
        const title = document.querySelector(".title-center");
        const body = document.querySelector(".screen-content");
        const titleright = document.querySelector(".title-right");
        if(title){
            title.textContent = content.title;
        }
        if(body){
            titleright.innerHTML = "";
            switch(content.type){
                case "markdown":
                    screen.classList.remove("resume-window");
                    screen.classList.remove("shutdown-window");
                    body.className = "screen-content markdown-content";
                    body.textContent = content.content;
                    if(content.github){
                        title.innerHTML = `<a class="github-btn" href="${content.github}" target="_blank" rel="noopener noreferrer">GitHub</a>`;
                        const githubButton = document.querySelector(".github-btn");
                        this.actions = [{element: githubButton}];
                    }
                    break;
                case "pdf":
                    screen.classList.remove("shutdown-window");
                    titleright.innerHTML = `<a class="download-btn" href="${content.content}" download>Download PDF</a>`;
                    const downloadButton = document.querySelector(".download-btn");
                    this.actions = [{element: downloadButton}];
                    screen.classList.add("resume-window");
                    body.className = "screen-content pdf-content";
                    body.innerHTML = `<iframe class="resume-frame" src="${content.content}#navpanes=0&scrollbar=1"></iframe>`;
                    break;
                case "directory":
                    screen.classList.remove("shutdown-window");
                    body.className = "screen-content markdown-content";
                    this.actions = [];
                    this.selectedAction = 0;
                    body.innerHTML = "";
                    content.content.forEach((item, index) => {
                        const element = document.createElement("div");
                        element.className = `project-item ${index===0 ? "selected": ""}`;
                        element.textContent = item.title;
                        element.addEventListener("click", () => {
                            Sound.play("click");
                            if(item.url){
                                window.open(item.url, "_blank");
                            }
                            else if(item.path){
                                this.onLaunch?.(item.path);
                            }
                        });
                        body.appendChild(element);
                        this.actions.push({element, item});
                    });
                    break;
                case "form":
                    screen.classList.remove("shutdown-window");
                    ContactHelpers.enableContactMode();
                    body.className = "screen-content markdown-content";
                    body.innerHTML = "";
                    this.actions = [];
                    this.selectedAction = 0;

                    const form = content.content;
                    const recipientRow = document.createElement("div");
                    recipientRow.className = "contact-row";

                    const label = document.createElement("span");
                    label.textContent = "To:";
                    label.className = "contact-label";

                    const recipient = document.createElement("span");
                    recipient.className = "contact-recipient";
                    recipient.textContent = form.recipient;
                    recipient.title = form.email;

                    recipientRow.appendChild(label);
                    recipientRow.appendChild(recipient);
                    body.appendChild(recipientRow);

                    form.fields.forEach(field =>{
                        const row = document.createElement("div");
                        row.className = "contact-row";

                        const label = document.createElement("label");
                        label.textContent = field.label;
                        label.className = "contact-label";

                        let input;

                        if(field.type === "textarea"){
                            input = document.createElement("textarea");
                        }
                        else{
                            input = document.createElement("input");
                            input.type = field.type;
                        }

                        input.className = "contact-input";
                        input.dataset.id = field.id;
                        input.placeholder = field.placeholder || "";

                        row.appendChild(label);
                        row.appendChild(input);
                        body.appendChild(row);
                    });

                    const acts = document.createElement("div");
                    acts.className = "form-actions";
                    form.acts.forEach(act => {
                        const btn = document.createElement("a");
                        btn.className = "send-btn";
                        btn.textContent = act.title;

                        btn.addEventListener("click", async () => {
                            btn.tabIndex = -1;
                            const missing = ContactHelpers.validateForm(this.formInputs);
                            if (missing.length){
                                ContactHelpers.showValidationDialog(this, missing);
                                return;
                            }
                            const data = ContactHelpers.collectFormData(this.formInputs);
                            try{
                                const result = await this.mailservice.send(data);
                                if(result.success){
                                    ContactHelpers.clearForm(this.formInputs);
                                    const dialog = HandleSuccess({
                                        title: "TRANSMISSION COMPLETE",
                                        message: "Message delivered successfully."
                                    });
                                this.open(dialog.fault);
                                }
                                else{
                                    const dialog = HandleMessage({
                                        title: "TRANSMISSION FAILED",
                                        message: result.message
                                    });
                                    this.open(dialog.fault);
                                }
                            }
                            catch(error){
                                const dialog = HandleMessage({
                                    title: "TRANSMISSION FAILED",
                                    message:error.message
                                });
                                this.open(dialog.fault);
                            }
                        });
                        acts.appendChild(btn);
                        this.actions.push({element: btn, type: "send"});
                    });

                    body.appendChild(acts);
                    this.formInputs = body.querySelectorAll(".contact-input");
                    ContactHelpers.focusField(this.formInputs, 0);
                    body.addEventListener("keydown", (event) => {
                        if(event.key !== "Tab"){
                            return;
                        }
                        event.preventDefault();

                        if(event.shiftKey){
                            ContactHelpers.previousField(this.formInputs);
                        }
                        else{
                            ContactHelpers.nextField(this.formInputs);
                        }
                    });
                    break;
                case "shutdown":
                    const wrapper = document.createElement("div");
                    wrapper.className = "shutdown-dialog";

                    screen.classList.add("shutdown-window");

                    body.className = "screen-content";
                    body.innerHTML = "";

                    const message = document.createElement("p");
                    message.textContent = "Terminate Current Session?";

                    const actions = document.createElement("div");
                    actions.className = "shutdown-actions";

                    const shutdownButton = document.createElement("a");
                    shutdownButton.className = "send-btn";
                    shutdownButton.textContent = "Shutdown";

                    actions.appendChild(shutdownButton);

                    wrapper.appendChild(message);
                    wrapper.appendChild(actions);
                    
                    body.appendChild(wrapper);

                    this.actions = [{element: shutdownButton, type: "shutdown"}];
                    shutdownButton.addEventListener("click", () => {
                        this.shutdownManager?.start();
                    });
                    break;
                default:
                    body.className = "screen-content error-content";
                    body.textContent = content.content;
            }
        }
        if(this.onOpen){
            this.onOpen();
        }
        if(saveHistory){
            this.history.push(content);
        }
    }
    updateFocus(index){
        if(!this.actions[index]){
            return;
        }
        this.actions.forEach(action => action.element.classList.remove("selected"));
        this.actions[index].element.classList.add("selected");
    }

    close(){
        this.effects.RefreshLine();
        if(this.history.length > 1){
            this.history.pop();
            const previous = this.history[this.history.length - 1];
            this.open(previous, false);
            return;
        }
        this.history = [];
        ContactHelpers.disableContactMode();
        document.querySelector(".overlay")?.remove();
        document.querySelector(".screen")?.remove();
        if(this.onClose){
            this.onClose();
        }
    }

    showShutdownDialog(){
        this.open({
            title: "SYSTEM SHUTDOWN",
            type: "shutdown"
        });
    }
}