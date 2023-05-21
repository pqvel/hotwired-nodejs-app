import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    addEventListener("turbo:before-frame-render", (event) => {
      if (document.startViewTransition) {
        const originalRender = event.detail.render
        event.detail.render = (currentElement, newElement) => {
          document.startViewTransition(()=> originalRender(currentElement, newElement))
        }
      }
    })
  }
}