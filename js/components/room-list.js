class RoomListComponent extends HTMLElement {
  static observedAttributes = ["userid"];

  constructor() {
    super();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "userid" && oldValue !== newValue) {
      if (newValue) {
        this.fetchRooms(newValue);
      }
    }
  }

  async fetchRooms(userId) {
    try {
      const response = await fetch(`${window.baseUrl}/users/${userId}/rooms`);
      const rooms = await response.json();
      this.renderRooms(rooms);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  }

  renderRooms(rooms) {
    const container = document.createElement("div");
    rooms.forEach((room) => {
      const roomComponent = document.createElement("room-component");
      roomComponent.setAttribute("roomid", room.id);
      container.appendChild(roomComponent);
    });
    this.appendChild(container);
  }
}

customElements.define("room-list", RoomListComponent);
