class MessageComponent extends HTMLElement {
  constructor() {
    super();

    const templateContent = document.getElementById("message-template").content;

    this.attachShadow({ mode: "open" });
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
    slot.textContent = this.message.text;

    if (this.message.sender === this.userId) {
      slot.classList.add("sent");
    } else {
      slot.classList.add("received");
    }
  }
}

customElements.define("message-component", MessageComponent);
