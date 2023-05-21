import { Controller } from "@hotwired/stimulus";
import * as Turbo from "@hotwired/turbo";

export default class extends Controller {
  connect() {
    document.addEventListener("turbo:click", (event) => {
      event.preventDefault();
      const frame = event.target.getAttribute("data-turbo-frame");

      if (frame) {
        Turbo.visit(event.target.href);
      }
    });
  }
}