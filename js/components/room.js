class RoomComponent extends HTMLElement {
  data = {};

  constructor() {
    super();

    const templateContent = document.getElementById("room-template").content;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(templateContent.cloneNode(true));

    this.addEventListener("click", () => {
      this.handleRoomClick();
    });
  }

  static get observedAttributes() {
    return ["data"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data" && oldValue !== newValue) {
      this.data = JSON.parse(newValue);

      this.renderRoom();
    }
  }

  renderRoom() {
    const slot = this.shadowRoot.querySelector('slot[name="roomId"]');
    slot.textContent = this.data.id;
  }

  handleRoomClick() {
    const conversationPane = document.querySelector("conversation-pane");
    if (conversationPane) {
      conversationPane.setAttribute("roomid", this.data.id);
    }
  }
}

customElements.define("room-component", RoomComponent);
