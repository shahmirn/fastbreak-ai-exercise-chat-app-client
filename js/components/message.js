class MessageComponent extends HTMLElement {
  constructor() {
    super();

    const templateContent = document.getElementById("message-template").content;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(templateContent.cloneNode(true));
  }

  static get observedAttributes() {
    return ["userid", "message"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if ((name === "userid" || name === "message") && oldValue !== newValue) {
      this.renderMessage();
    }
  }

  renderMessage() {
    const { userId, message } = this.getAttributes();
    if (!message) {
      return;
    }

    const template = document.getElementById("message-template");
    const templateContent = template.content.cloneNode(true);
    const slot = this.shadowRoot.querySelector("slot");

    slot.textContent = message.text;

    if (message.sender === userId) {
      slot.classList.add("sent");
    } else {
      slot.classList.add("received");
    }

    this.shadowRoot.appendChild(templateContent);
  }

  getAttributes() {
    return {
      userId: this.getAttribute("userid"),
      message: JSON.parse(this.getAttribute("message")),
    };
  }
}

customElements.define("message-component", MessageComponent);
