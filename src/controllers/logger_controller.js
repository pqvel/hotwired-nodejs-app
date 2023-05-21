import { Controller } from "@hotwired/stimulus";
import * as Turbo from "@hotwired/turbo";

export default class extends Controller {
  connect() {
    console.log(`${this.identifier} connected`)
  }
}