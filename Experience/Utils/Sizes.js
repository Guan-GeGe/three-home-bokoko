import { EventEmitter } from "events";
export default class Sizes extends EventEmitter {
  constructor() {
    super();
    this.frustumSize = 5;

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    // 屏幕高宽比
    this.aspectRatio = this.width / this.height;
    // 像素比例;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.aspectRatio = this.width / this.height;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
      this.emit("resize");
    });
  }
}
