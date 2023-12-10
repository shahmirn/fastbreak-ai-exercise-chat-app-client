class AddMessageComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });

    const templateContent = document.getElementById(
      "add-message-template"
    ).content;
    this.shadowRoot.appendChild(templateContent.cloneNode(true));

    this.renderAddMessage();
  }

  renderAddMessage() {
    const sendMessageButton = this.shadowRoot.getElementById("sendMessage");
    sendMessageButton.addEventListener("click", this.sendMessage.bind(this));
  }

  async sendMessage() {
    const roomId = this.getAttribute("roomid");
    const userId = this.getAttribute("userid");
    const messageText = this.shadowRoot.getElementById("messageText").value;

    try {
      const response = await fetch(
        `${window.baseUrl}/rooms/${roomId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: userId,
            text: messageText,
          }),
        }
      );

      if (response.ok) {
        this.shadowRoot.getElementById("messageText").value = "";

        const event = new CustomEvent("messageAdded", {
          detail: {
            userId,
            roomId,
            messageText,
          },
        });
        document.dispatchEvent(event);
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
}

customElements.define("add-message", AddMessageComponent);
