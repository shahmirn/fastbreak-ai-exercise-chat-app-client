class RoomComponent extends HTMLElement {
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
    return ["roomid"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "roomid" && oldValue !== newValue) {
      if (newValue) {
        this.renderRoom();
      }
    }
  }

  renderRoom() {
    const slot = this.shadowRoot.querySelector('slot[name="roomId"]');
    slot.textContent = this.room.id;
  }

  handleRoomClick() {
    const conversationPane = document.querySelector("conversation-pane");
    if (conversationPane) {
      conversationPane.room = this.room;
      conversationPane.setAttribute("roomid", this.room.id);
    }
  }
}

customElements.define("room-component", RoomComponent);
