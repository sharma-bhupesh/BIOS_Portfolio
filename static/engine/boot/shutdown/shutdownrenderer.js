
export default class ShutdownRenderer{
    show(){
        document.body.innerHTML = `
            <div class="shutdown-screen">
                <div class="shutdown-title">Shutdown...</div>
            </div>
        `;
    }
}