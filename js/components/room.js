class RoomComponent extends HTMLElement {
  static observedAttributes = ["roomid"];

  constructor() {
    super();

    const templateContent = document.getElementById("room-template").content;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(templateContent.cloneNode(true));

    this.addEventListener("click", () => {
      this.handleRoomClick();
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "roomid" && oldValue !== newValue) {
      if (newValue) {
        this.renderRoom();
      }
    }
  }

  renderRoom() {
    const roomIdSlot = this.shadowRoot.querySelector('slot[name="roomId"]');
    roomIdSlot.textContent = this.room.id;

    const receiverId = this.room.participants.find(
      (participant) => participant !== this.getAttribute("userid")
    );

    const receiverNameSlot = this.shadowRoot.querySelector(
      'slot[name="receiver"]'
    );
    receiverNameSlot.textContent = receiverId;
  }

  handleRoomClick() {
    const conversationPane = document.querySelector("conversation-pane");
    conversationPane.room = this.room;
    conversationPane.setAttribute("roomid", this.room.id);

    document.querySelector("add-message").setAttribute("roomid", this.room.id);
  }
}

customElements.define("room-component", RoomComponent);
