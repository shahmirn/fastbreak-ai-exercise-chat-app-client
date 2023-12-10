class ConversationPaneComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const templateContent = document.getElementById(
      "conversation-pane-template"
    ).content;
    this.shadowRoot.appendChild(templateContent.cloneNode(true));

    this.addMessageAddedListener();
  }

  static get observedAttributes() {
    return ["userid", "roomid"];
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if ((name === "userid" || name === "roomid") && oldValue !== newValue) {
      void this.fetchAndRender();
    }
  }

  async fetchAndRender() {
    const messages = await this.fetchMessages();

    const slot = this.shadowRoot.querySelector("slot");
    slot.innerHTML = "";

    this.renderRoom();
    this.renderMessages(messages ?? []);
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

    const { userId } = this.getAttributes();

    const roomComponent = document.createElement("room-component");
    roomComponent.room = this.room;
    roomComponent.setAttribute("userid", userId);
    roomComponent.setAttribute("roomid", this.room.id);

    const slot = this.shadowRoot.querySelector("slot");
    slot.appendChild(roomComponent);
  }

  renderMessages(messages) {
    const { userId } = this.getAttributes();

    const slot = this.shadowRoot.querySelector("slot");
    messages.forEach((message) => {
      const messageComponent = document.createElement("message-component");
      messageComponent.message = message;
      messageComponent.userId = userId;

      messageComponent.setAttribute("messageid", message.id);

      slot.appendChild(messageComponent);
    });
  }

  addMessageAddedListener() {
    document.addEventListener(
      "messageAdded",
      (event) => {
        const { roomId: eventRoomId, userId: eventUserId } = event.detail;
        const { roomId, userId } = this.getAttributes();

        if (roomId === eventRoomId && userId === eventUserId) {
          void this.fetchAndRender();
        }
      },
      false
    );
  }

  getAttributes() {
    return {
      userId: this.getAttribute("userid"),
      roomId: this.getAttribute("roomid"),
    };
  }
}

customElements.define("conversation-pane", ConversationPaneComponent);
