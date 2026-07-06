
export default class MailService{
    async send(data){
        const response = await fetch("/contact/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "X-CSRFToken": this.getCSRFToken()
            },
            body:JSON.stringify(data)
        });
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || `HTTP ${response.status}`);
        }
        return result;
        return await response.json();
    }

    getCSRFToken(){
        return document.cookie
            .split(";")
            .find(row => row.startsWith("csrftoken="))
            ?.split("=")[1];
    }
}