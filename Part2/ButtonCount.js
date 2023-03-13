// Functionality for autonomous custom element button-count
class ButtonCount extends HTMLElement {
    constructor() {
        super();
        // Ensure count persists
        this.count = Number(localStorage.getItem('buttonCount') || 0);

        const shadow = this.attachShadow({mode: 'open'});
        const btn = document.createElement('button');

        // Style the button
        btn.textContent = `Times Clicked: ${this.count}`;
        btn.style.backgroundColor = '#4CAF50';
        btn.style.border = 'none';
        btn.style.color = 'white';
        btn.style.padding = '30px 64px';
        btn.style.textAlign = 'center';
        btn.style.display = 'block';
        btn.style.fontSize = '24px';
        btn.style.margin = 'auto';
        btn.style.position = 'absolute';
        btn.style.top = '50%';
        btn.style.left = '50%';
        btn.style.transform = 'translate(-50%, -50%)';

        //Every time button is clicked -> increment count and update page
        btn.addEventListener('click', () => {
            this.count++;
            this.shadowRoot.querySelector('button').textContent = `Times Clicked: ${this.count}`
            localStorage.setItem('buttonCount', this.count);
        });

        shadow.appendChild(btn);
    }
}

// define button-count in custom elements registry
customElements.define('button-count', ButtonCount);