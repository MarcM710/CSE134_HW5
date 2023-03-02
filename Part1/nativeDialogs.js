const alert = document.getElementById('alert');
const confirm = document.getElementById('confirm');
const prompt = document.getElementById('prompt');
const saferPrompt = document.getElementById('saferPrompt');
const output = document.getElementById('output');
output.style.outline = "double black"
alert.addEventListener('click', () => {
    window.alert('Alert Pressed!');
});

confirm.addEventListener('click', () => {
    const result = window.confirm('Do you want to confirm this?');
    output.textContent = `The value returned by the confirm method is : ${result}`;
    output.style.padding = "10px";
});


prompt.addEventListener('click', () => {
    const input = window.prompt('Please enter some text:');
    if (input !== null) {
        output.innerText = `User entered: ${input}`;
        output.style.padding = "10px";
    } else {
        output.innerText = 'User didn’t enter anything';
        output.style.padding = "10px";
    }
});

saferPrompt.addEventListener('click', () => {
    const input = window.prompt('Please enter some text:');
    if (input !== null) {
        output.textContent = `User entered: ${DOMPurify.sanitize(input)}`;
        output.style.padding = "10px";
    } else {
        output.textContent = 'User didn’t enter anything';
        output.style.padding = "10px";
    }
});