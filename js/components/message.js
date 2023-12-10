class MessageComponent extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const templateContent = document.getElementById("message-template").content;
    this.shadowRoot.appendChild(templateContent.cloneNode(true));
  }

  static get observedAttributes() {
    return ["messageid"];
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (name === "messageid" && oldValue !== newValue) {
      if (newValue) {
        this.renderMessage();
      }
    }
  }

  renderMessage() {
    if (!this.message) {
      return;
    }

    const slot = this.shadowRoot.querySelector("slot");

    const container = document.createElement("div");
    container.classList.add("message");
    container.textContent = this.message.text;

    slot.appendChild(container);

    if (this.message.sender === this.userId) {
      slot.classList.add("sent");
    } else {
      slot.classList.add("received");
    }
  }
}

customElements.define("message-component", MessageComponent);
