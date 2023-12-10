class RoomListComponent extends HTMLElement {
  static observedAttributes = ["userid"];

  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (name === "userid" && oldValue !== newValue) {
      if (newValue) {
        const rooms = await this.fetchRooms(newValue);
        const room = rooms?.[0];
        this.renderRooms(rooms ?? []);

        const conversationPane = document.querySelector("conversation-pane");
        conversationPane.room = room;
        conversationPane.setAttribute("roomid", room?.id);

        document.querySelector("add-message").setAttribute("roomid", room?.id);
      }
    }
  }

  async fetchRooms(userId) {
    try {
      const response = await fetch(`${window.baseUrl}/users/${userId}/rooms`);
      return response.json();
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  }

  renderRooms(rooms) {
    const userId = this.getAttribute("userid");

    rooms.forEach((room) => {
      const roomComponent = document.createElement("room-component");
      roomComponent.room = room;
      roomComponent.setAttribute("userid", userId);
      roomComponent.setAttribute("roomid", room.id);

      this.shadowRoot.appendChild(roomComponent);
    });
  }
}

customElements.define("room-list", RoomListComponent);
