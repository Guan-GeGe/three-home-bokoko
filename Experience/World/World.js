import * as THREE from "three";
import Experience from "../ecperience";
import Room from "./Room";
import Environment from "./Environment";
import Controls from "./Controls";
import Floor from "./Floor";
import perloader from "../PreLoader";

export default class World {
  constructor() {
    this.Experience = new Experience();
    this.sizes = this.Experience.sizes;
    this.scene = this.Experience.scene;
    this.canvas = this.Experience.canvas;
    this.camera = this.Experience.camera;
    this.resoureces = this.Experience.resources;
    this.theme = this.Experience.theme;
    // 加载完Resources资源后，再创建物体
    this.resoureces.on("ready", () => {
      this.Environment = new Environment();
      this.room = new Room();
      this.floor = new Floor();

      this.controls = new Controls();
      this.perloader = new perloader();
    });
    this.theme.on("switchModel", (isDay) => {
      this.switchModel(isDay);
    });
  }
  switchModel(isDay) {
    this.Environment?.switchModel(isDay);
  }
  resize() {}
  update() {
    this.room?.update();
    this.controls?.update();
  }
}
