import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Time from "./Utils/Time";
import Resources from "./Utils/Resources";
import assets from "./Utils/assets";
import World from "./World/World";
import Theme from "../Experience/Theme";

export default class Experience {
  static inctance;
  constructor(canvas) {
    if (Experience.inctance) {
      return Experience.inctance;
    }
    Experience.inctance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.time = new Time();
    this.theme = new Theme();

    // 创建资产，将资产放进去
    this.resources = new Resources(assets);
    // 把创建的物体放到下面
    this.world = new World();

    this.time.on("update", () => {
      this.update();
    });
    this.sizes.on("resize", () => {
      this.resize();
    });
  }
  resize() {
    // 更新
    this.camera.resize();
    this.world.resize();
    this.renderer.resize();
  }
  update() {
    // 初始化相机
    this.camera.update();
    // 初始化渲染器
    this.renderer.update();
    // 更新room中动画
    this.world.update();
  }
}
