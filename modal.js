class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}); 
        this.shadowRoot.innerHTML = `
            <style>
                :host([opened]) #backdrop,
                :host([opened]) #modal {
                    opacity: 1;
                    /* Enable the Clicks Events on this element  */
                    pointer-events: all;
                }

                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh; /* 100% will not work because we must set the body height first so we use 100vh */
                    background: rgba(0, 0, 0, .75);
                    z-index: 10;
                    opacity: 0;
                    /* Disable the Clicks Events on this element  */
                    pointer-events: none;
                }

                #modal {
                    position: fixed;
                    top: 20vh;
                    /* Nice Note we use 50% because it will be: left->25%  width->50%  left->25% and total will be 100%*/
                    left: 25%;
                    width: 50%;
                    z-index: 100;
                    background: #fff;
                    border-radius: 5px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, .25);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    opacity: 0;
                    /* Disable the Clicks Events on this element  */
                    pointer-events: none;
                }

                header {
                    padding: 1rem;
                }

                header h1 {
                    font-size: 1.25rem;
                }

                #main {
                    padding: 1rem;
                }

                #actions {
                    border-top: 1px solid #ccc;
                    padding: 1rem;
                    display: flex;
                    justify-content: flex-end;
                }

                #actions button {
                    margin: 0 .25rem; 
                }

                #actions button:first-child {
                    background-color: #839595;
                    color: #fff;
                    padding: .2rem .75rem;
                    border: 1px solid #ccc;
                    cursor: pointer; 
                }

                #actions button:first-child:hover {
                    background-color: #666e6e;
                }
                
                #actions button:last-child {
                    background-color: #334893;
                    color: #fff;
                    padding: .2rem .75rem;
                    border: 1px solid #ccc;
                    cursor: pointer; 
                }
                
                #actions button:last-child:hover {
                    background-color: #0f2885;
                    color: #fff;
                    padding: .2rem .75rem;
                    border: 1px solid #ccc;
                    cursor: pointer; 
                }

            </style>
            <div id="backdrop"></div>
            <div id="modal">
                <header>
                    <h1>Full Details</h1>
                </header>
                <section id="body">
                    <slot></slot>
                </section>
                <footer id="actions">
                    <button>Cancel</button>
                    <button>Finish Reading</button>
                </footer>
            </div>
        `;
    }

    // Good for many things but you can use some css instead for this use case that we just change some styles
    // attributeChangedCallback(attr_name, old_value, new_value) {
    //     if (attr_name === 'opened') {
    //         if (this.hasAttribute('opened')) {
    //             this.shadowRoot.querySelector('#backdrop').style.opacity = 1;  
    //             this.shadowRoot.querySelector('#backdrop').style.pointerEvents = 'all';
                
    //             this.shadowRoot.querySelector('#modal').style.opacity = 1;  
    //             this.shadowRoot.querySelector('#modal').style.pointerEvents = 'all';
    //         }
    //     }
        
    // }

    // static get observedAttributes() {
    //     return ['opened'];
    // }
}

customElements.define('mxcd-modal', Modal);