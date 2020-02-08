class Modal extends HTMLElement {
    constructor() {
        super();
        this.isOpened = false;
        this.attachShadow({mode: 'open'}); 
        this.shadowRoot.innerHTML = `
            <style>
                :host([opened]) #backdrop,
                :host([opened]) #modal {
                    opacity: 1;
                    /* Enable the Clicks Events on this element  */
                    pointer-events: all;
                }

                
                :host([opened]) #modal {
                    top: 20vh;
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
                    top: 10vh;
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
                    transition: all .3s ease-out;
                }

                header {
                    padding: 1rem;
                    border-bottom: 1px solid #ccc;
                }

                ::slotted([slot=title]) {
                    font-size: 1.25rem;
                    margin: 0 !important;
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

                #actions #cancel-btn  {
                    background-color: #839595;
                    color: #fff;
                    padding: .2rem .75rem;
                    border: 1px solid #ccc;
                    cursor: pointer; 
                }

                #actions #cancel-btn :hover {
                    background-color: #666e6e;
                }
                
                #actions #confirm-btn  {
                    background-color: #334893;
                    color: #fff;
                    padding: .2rem .75rem;
                    border: 1px solid #ccc;
                    cursor: pointer; 
                }
                
                #actions #confirm-btn :hover {
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
                    <slot name="title">All Details</slot>
                </header>
                <section id="body">
                    <slot></slot>
                </section>
                <footer id="actions">
                    <button id="cancel-btn">Cancel</button>
                    <button id="confirm-btn">Finish Reading</button>
                </footer>
            </div>
        `;

        
        const slots = this.shadowRoot.querySelectorAll('slot');

        slots[1].addEventListener('slotchange', event => {
            // get object view of element in console 
            // console.dir(slots[1].assignedElements()); // get elements only
            // console.dir(slots[1].assignedNodes()); // get all Nodes white-spaces, elements and text
        });

        const backdrop = this.shadowRoot.querySelector('#backdrop');
        const cancelBtn = this.shadowRoot.querySelector('#cancel-btn');
        const confirmBtn = this.shadowRoot.querySelector('#confirm-btn');

        backdrop.addEventListener('click', this._cancel.bind(this));
        cancelBtn.addEventListener('click', this._cancel.bind(this));
        confirmBtn.addEventListener('click', this._confirm.bind(this));
    }

    // Good for many things but you can use some css instead for this use case that we just change some styles
    attributeChangedCallback(attr_name, old_value, new_value) {
        if (attr_name === 'opened') {
            this.isOpened = this.hasAttribute('opened') ? true : false;
            
            // if (this.hasAttribute('opened')) {
            //     this.shadowRoot.querySelector('#backdrop').style.opacity = 1;  
            //     this.shadowRoot.querySelector('#backdrop').style.pointerEvents = 'all';
                
            //     this.shadowRoot.querySelector('#modal').style.opacity = 1;  
            //     this.shadowRoot.querySelector('#modal').style.pointerEvents = 'all';
            // }
        }
    }

    static get observedAttributes() {
        return ['opened'];
    }

    open() {
        this.setAttribute('opened', '');
        this.isOpened = true;
    }

    close() {
        if (this.hasAttribute('opened')) {
            this.removeAttribute('opened');
            
        }
        this.isOpened = false;
    }

    _cancel(event) {
        this.close();
        const cancelEvent = new Event('canceled');
        // event.target.dispatchEvent(cancelEvent, {
            // Whether the event will fired from the target element 
            // or will bubble up (go up) to the parent elements again and again 
            // until it find the event listening
        //     bubbles: true, 
            // The Event May Leave the "Shadow DOM" if in one and try to bubbles it self
        //     composed: true, 
        // });

        // Fire Event On Component it self not on target (button)
        this.dispatchEvent(cancelEvent);
    }

    _confirm(event) {
        this.close();
        const confirmEvent = new Event('confirmed');
        // event.target.dispatchEvent(cancelEvent, {
            // Whether the event will fired from the target element 
            // or will bubble up (go up) to the parent elements again and again 
            // until it find the event listening
        //     bubbles: true, 
            // The Event May Leave the "Shadow DOM" if in one and try to bubbles it self
        //     composed: true, 
        // });

        // Fire Event On Component it self not on target (button)
        this.dispatchEvent(confirmEvent);
    }

}

customElements.define('mxcd-modal', Modal);