import { HandleFault } from "../../utils/faultHandler.js";

export default class ContentManager{
    constructor(overlay){
        this.overlay = overlay;
    }
    async open(id){
        try {
            const metadata = await this._loadMetadata(id);
            const content = await this._loadContent(id, metadata);
            const contentObject = this._buildContent(metadata, content);
            this.overlay.open(contentObject);
        }
        catch(error){
            const result = HandleFault({module: "ContentManager", functionName: "open", title: "CONTENT ERROR", message: error.message, details: id, fatal: false, error});
            this.overlay.open(result.fault);
        }
    }
    async _loadMetadata(id){
        const response = await fetch(`/static/content/${id}/metadata.json`);
        if(!response.ok){
            throw new Error(`Metadata not found: ${id}`);
        }
        return await response.json();
    }
    async _loadContent(id, metadata){
        const path = `/static/content/${id}/data/${metadata.entry}`;

        switch(metadata.type){
            case "markdown":{
                const response = await fetch(path);
                if(!response.ok){
                    throw new Error(`Content not found: ${metadata.entry}`);
                }
                return await response.text();
            }
            case "pdf":
                return path;
            case "directory":{
                const response = await fetch(path);
                if(!response.ok){
                    throw new Error(`Directory not found: ${metadata.entry}`);
                }
                return await response.json();
            }
            case "form":{
                const response = await fetch(path);
                if(!response.ok){
                    throw new Error(`Directory not found: ${metadata.entry}`);
                }
                return await response.json();
            }
            default:
                throw new Error(`Unsupported content type: ${metadata.type}`);
        }
    }
    _buildContent(metadata, content){
        return {
            title: metadata.title,
            type: metadata.type,
            content: content,
            github: metadata.github
        };
    }
}