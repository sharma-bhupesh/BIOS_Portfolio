
import Sound from "./sound.js";

Sound.load("error", "/static/assets/sounds/error.mp3");
export function HandleFault({module, functionName, title, message, details = "", fatal = false, error = null}){
    Sound.play("error");
    const fault = {module, function: functionName, title, message, details, fatal, timestamp: new Date().toISOString(), error};
    fault.type = "error";
    fault.content = `${fault.message} 
    ${fault.details}
    
    Press Esc to Continue.`;
    fault.canClose = true;

    return{success: false, fault};
}

export function HandleValidation({missing}){
    Sound.play("error");
    const fault = {
        title: "Transmission Failed",
        type: "error",
        canClose: true,
        fatal: false
    };

    fault.content = `
    Diagnostics
    
    ${missing.map(field => `\n [X]  ${field}`).join('\n')}
    \n

    Transmission Aborted.
    
    Press ESC to Continue.`;

    return {
        success: false,
        fault
    };
}

export function HandleSuccess({ title, message }){
    const fault = {
        title,
        type: "success",
        fatal: false,
        canClose: true,
    };

    fault.content = `${message}
    
    Press ESC to Continue.`;

    return {
        success: true,
        fault
    };
}

export function HandleMessage({title, message}){
    const fault = {
        title,
        type: "message",
        fatal: false,
        canClose: true,
        content: `${message}
        
        Press ESC to Continue.`
    };

    return {
        success: false,
        fault
    };
}