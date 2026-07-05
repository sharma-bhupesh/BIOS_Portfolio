
import { HandleValidation } from "./faultHandler.js";

let currentField = 0;
export function validateForm(formInputs){
    const empty = [];
    formInputs.forEach(input => {
        if(!input.value.trim()){
            empty.push(input.dataset.id);
        }
    });
    return empty;
}

export function collectFormData(formInputs){
    const data = {};
    formInputs.forEach(input => {
        data[input.dataset.id] = input.value.trim();
    });
    return data;
}

export function clearForm(formInputs){
    formInputs.forEach(input => {
        input.value="";
    });
}

export function enableContactMode(){
    document.body.classList.add("contact-mode");
}

export function disableContactMode(){
    document.body.classList.remove("contact-mode");
}

export function showValidationDialog(manager, missing){
    const result = HandleValidation({ missing });
    manager.open(result.fault);
}

export function focusField(formInputs, index){
    if(!formInputs || !formInputs.length){
        return;
    }

    currentField = index;
    const input = formInputs[currentField];
    
    if(input){
        input.focus();
        input.select?.();
    }
}

export function nextField(formInputs){
    if(!formInputs || !formInputs.length){
        return;
    }

    currentField++;

    if(currentField >= formInputs.length){
        currentField = 0;
    }

    focusField(formInputs, currentField);
}

export function previousField(formInputs){
    if(!formInputs || !formInputs.length){
        return;
    }

    currentField--;

    if(currentField < 0){
        currentField = formInputs.length -1;
    }

    focusField(formInputs, currentField);
}