class UserHeader extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    this.attachShadow({ mode: "open" });

    const templateContent = document.getElementById(
      "user-header-template"
    ).content;
    this.shadowRoot.appendChild(templateContent.cloneNode(true));

    const user = await this.fetchUserData();
    if (!user) {
      return;
    }

    this.renderUserName(user.fullName);

    document.querySelector("room-list").setAttribute("userid", user.id);
    document.querySelector("conversation-pane").setAttribute("userid", user.id);
    document.querySelector("add-message").setAttribute("userid", user.id);
  }

  async fetchUserData() {
    try {
      const response = await fetch(`${window.baseUrl}/users`);
      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  renderUserName(name) {
    const slot = this.shadowRoot.querySelector("slot");
    slot.textContent = name;
  }
}

customElements.define("user-header", UserHeader);
