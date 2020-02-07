class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}); 
        this.shadowRoot.innerHTML = `
            <style>
                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh; /* 100% will not work because we must set the body height first so we use 100vh */
                    background: rgba(0, 0, 0, .75);
                    z-index: 10;
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
}

customElements.define('mxcd-modal', Modal);