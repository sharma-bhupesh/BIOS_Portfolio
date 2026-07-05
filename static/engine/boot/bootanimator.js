
import Sound from "../utils/sound.js";

export default class BootAnimator{
    constructor(renderer){
        this.renderer = renderer;
        Sound.load("hdd", "/static/assets/sounds/HDD-CLICK.mp3");
        Sound.load("boot", "/static/assets/sounds/Retro-Boot-up.mp3");
    }
    async play(sequence){
        Sound.playLoop("boot"); 
        Sound.playLoop("hdd");
        let output = "";
        for(const instruction of sequence){
            switch (instruction.cmd){
                case "print":
                    output += instruction.text + "\n";
                    this.renderer.render(output);
                    break;

                case "wait":
                    await this.wait(instruction.time);
                    break;

                case "burst":
                    const randomLines = [...burstLines]
                        .sort(() => Math.random() - 0.5)
                        .slice(0, 7);

                for(const instruction of randomLines){
                        output += instruction + "\n";
                        this.renderer.render(output);
                        await this.wait(35);
                    }
                    break;

                case "modules":
                    for(const instruction of modules){
                        output += instruction + "\n";
                        this.renderer.render(output);
                        await this.wait(40);
                    }
                    break;

                case "developer":
                    for(const instruction of developer){
                        output += instruction + "\n";
                        this.renderer.render(output);
                        await this.wait(40);
                    }
                    break;

                case "keyboard":
                    for(const instruction of keyboard){
                        output += instruction + "\n";
                        this.renderer.render(output);
                        await this.wait(40);
                    }
                    break;

                case "launch":
                    for(const instruction of launch){
                        output += instruction + "\n";
                        this.renderer.render(output);
                        await this.wait(40);
                    }
                    break;

                case "clear":
                    output = "";
                    this.renderer.render(output);
                    break;

                case "hideLogo":
                    this.renderer.logo.style.display = "none";
                    break;
            }
        }
        Sound.stop("hdd");
        Sound.stop("boot");
    }

    
    wait(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

const burstLines = [

    "CPU ......................... Human",
    "Clock Speed ................. Depends on Coffee Intake",
    "Memory Test ................. Expensive",
    "GPU ......................... Expensive, Again!!!",
    "Detecting Storage...",
    "> portfolio.db .............. FOUND",
    "> unfinished_ideas.zip ...... 847 Items",
    "> dreams/ ................... Growing",

    "Loading ACPI Tables...",
    "Enumerating PCI Devices...",
    "Checking SATA Controller...",
    "Loading USB Controller...",
    "Verifying BIOS Checksum...",
    "Detecting Cache Memory...",
    "Checking Boot Priority...",
    "Initializing CMOS..."
];

const modules = [

"Keyboard .................... READY",
"Navigation .................. READY",
"Window Manager .............. READY",
"Render Manager .............. READY",
"Resource Loader ............. READY",
"Popup Manager ............... READY",

"Verifying Module Isolation...",
"Cross Dependencies .......... NONE",
"Coupling Level .............. LOW",
"Overengineering Detector .... DISABLED"
];

const developer = [

"Checking Developer...",
"Name ........................ ********",
"Patience .................... Still Loading...",
"Sleep Schedule .............. 404 Not Found",

"",
"Special Thanks .............. Schrödinger's Cat"
];

const keyboard = [

"Initializing Keyboard...",
"Press any key to continue...",
"...",
"Actually, don't.",
"The keyboard isn't initialized yet."
];

const launch = [

"Loading Portfolio Engine...",
"Please wait...",

"",
"Portfolio OS v1.0 Ready",

"",
"Welcome."
];

