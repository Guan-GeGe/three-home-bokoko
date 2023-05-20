import Experience from "./ecperience";
import * as THREE from "three";
import { EventEmitter } from "events";
export default class Theme extends EventEmitter {
  constructor() {
    super();
    this.Experience = new Experience();
    this.sizes = this.Experience.sizes;
    this.scene = this.Experience.scene;
    this.canvas = this.Experience.canvas;

    this.sunmodel = document.querySelector(".sun-model");
    this.moonmodel = document.querySelector(".moon-model");
    this.setEventListeners();
  }
  setEventListeners() {
    this.sunmodel.addEventListener("click", () => {
      console.log("白天");
      this.emit("switchModel", true);
    });
    this.moonmodel.addEventListener("click", () => {
      console.log("黑天");
      this.emit("switchModel", false);
    });
  }
  resize() {}
  update() {}
}
