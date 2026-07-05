const BootScript = [

    { cmd: "print", text: "Award Modular Inspired BIOS v6.00PG" },
    { cmd: "print", text: "Copyright (C) 2026 BHUPESH SHARMA." },

    { cmd: "wait", time: 200 },

    { cmd: "print", text: "" },
    { cmd: "print", text: "----------------------------------------------------" },
    { cmd: "print", text: "Power-On Self Test" },
    { cmd: "print", text: "----------------------------------------------------" },

    { cmd: "burst" },

    { cmd: "wait", time: 700 },

    { cmd: "print", text: "" },
    { cmd: "print", text: "Loading Engine Modules..." },

    { cmd: "wait", time: 700 },

    { cmd: "modules" },

    { cmd: "wait", time: 700 },

    { cmd: "clear" },
    { cmd: "hideLogo" },

    { cmd: "developer" },

    { cmd: "wait", time: 1000 },

    { cmd: "keyboard" },

    { cmd: "clear" },

    { cmd: "wait", time: 700 },

    { cmd: "launch" }

];

export default BootScript;