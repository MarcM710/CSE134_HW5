const output = document.getElementById('output');
output.style.outline = "double black"
//------ Modules ------
export function alertBtn(){
    const alert = document.getElementById('alert');
    const alertDialog = document.getElementById('alertDialog');
    const alertOk = document.getElementById('alertOk');

    alert.addEventListener('click', () => {
        alertDialog.showModal();
        alertOk.addEventListener('click', () => {
            alertDialog.close();
        });
    });
}
//--------------------------------
export function confirmBtn(){
    const confirm = document.getElementById('confirm');
    const confirmDialog = document.getElementById('confirmDialog');
    const confirmOk = document.getElementById('confirmOk');
    const confirmCancel = document.getElementById('confirmCancel');

    confirm.addEventListener('click', () => {
        confirmDialog.showModal();
        confirmCancel.addEventListener('click', () => {
            output.textContent = 'Confirm result: False';
            confirmDialog.close();
        });

        confirmOk.addEventListener('click', () => {
            output.textContent = 'Confirm result: True';
            confirmDialog.close();
        });
    });
}
//--------------------------------
export function promptBtn(){
    const prompt = document.getElementById('prompt');
    const promptDialog = document.getElementById('promptDialog');
    const promptOk = document.getElementById('promptOk');
    const promptCancel = document.getElementById('promptCancel');

    prompt.addEventListener('click', () => {
        promptDialog.showModal();
        const input = document.getElementById('input');
        promptOk.addEventListener('click', () => {
            output.textContent = `Prompt Result: ${DOMPurify.sanitize(input.value)}`;
            promptDialog.close();
        });

        promptCancel.addEventListener('click', () => {
            promptDialog.close();
        });
    });
}

