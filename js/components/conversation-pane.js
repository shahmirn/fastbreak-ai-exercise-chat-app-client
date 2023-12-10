class ConversationPaneComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["userid", "roomid"];
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if ((name === "userid" || name === "roomid") && oldValue !== newValue) {
      const messages = await this.fetchMessages();

      this.shadowRoot.innerHTML = "";
      this.renderRoom();
      this.renderMessages(messages ?? []);
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
      return response.json();
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }

  renderRoom() {
    if (!this.room) {
      return;
    }

    const roomComponent = document.createElement("room-component");
    roomComponent.room = this.room;
    roomComponent.setAttribute("roomid", this.room.id);

    this.shadowRoot.appendChild(roomComponent);
  }

  renderMessages(messages) {
    const { userId } = this.getAttributes();

    messages.forEach((message) => {
      const messageComponent = document.createElement("message-component");
      messageComponent.message = message;
      messageComponent.userId = userId;

      messageComponent.setAttribute("messageid", message.id);

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
