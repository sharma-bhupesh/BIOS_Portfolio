
export default class StyleManager{
    static set(theme){
        const stylesheet = document.getElementById("theme");
        stylesheet.href = `/static/css/${theme}.css`;
    }
}