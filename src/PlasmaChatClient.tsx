import { PlasmaChat } from "./utils/PlasmaCustomElement"

export const plasmaChat = () => {
  customElements.define("plasma-chat", PlasmaChat)
}
plasmaChat()