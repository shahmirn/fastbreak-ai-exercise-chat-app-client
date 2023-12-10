class ConversationPaneComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["userid", "roomid"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if ((name === "userid" || name === "roomid") && oldValue !== newValue) {
      this.fetchMessages();
    }
  }

  async fetchMessages() {
    try {
      const { roomId } = this.getAttributes();
      if (!roomId) {
        return;
      }

      const response = await fetch(
        `${window.baseUrl}/rooms/${roomId}/messages`
      );
      const messages = await response.json();
      this.renderMessages(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }

  renderMessages(messages) {
    const { userId } = this.getAttributes();

    this.shadowRoot.innerHTML = "";
    messages.forEach((message) => {
      const messageComponent = document.createElement("message-component");

      messageComponent.setAttribute("userid", userId);
      messageComponent.setAttribute("message", JSON.stringify(message));

      this.shadowRoot.appendChild(messageComponent);
    });
  }

  getAttributes() {
    return {
      userId: this.getAttribute("userid"),
      roomId: this.getAttribute("roomid"),
    };
  }
}

customElements.define("conversation-pane", ConversationPaneComponent);
