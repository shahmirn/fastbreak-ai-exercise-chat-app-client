class RoomListComponent extends HTMLElement {
  static observedAttributes = ["userid"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (name === "userid" && oldValue !== newValue) {
      if (newValue) {
        const rooms = await this.fetchRooms(newValue);
        this.renderRooms(rooms ?? []);

        document
          .querySelector("conversation-pane")
          .setAttribute("roomid", rooms?.[0].id);
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
    rooms.forEach((room) => {
      const roomComponent = document.createElement("room-component");
      roomComponent.setAttribute("data", JSON.stringify(room));

      this.shadowRoot.appendChild(roomComponent);
    });
  }
}

customElements.define("room-list", RoomListComponent);
