class RoomComponent extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById("room-template");
    const templateContent = template.content;

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(templateContent.cloneNode(true));
  }

  static get observedAttributes() {
    return ["roomid"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "roomid" && oldValue !== newValue) {
      this.renderRoom(newValue);
    }
  }

  renderRoom(roomid) {
    const slot = this.shadowRoot.querySelector('slot[name="roomId"]');
    slot.textContent = roomid;
  }
}

customElements.define("room-component", RoomComponent);
