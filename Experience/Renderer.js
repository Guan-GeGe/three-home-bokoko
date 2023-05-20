import * as THREE from "three";
import Experience from "./ecperience";
export default class Renderer {
  constructor() {
    this.Experience = new Experience();
    // console.log(this.Experience);
    this.sizes = this.Experience.sizes;
    this.scene = this.Experience.scene;
    this.canvas = this.Experience.canvas;
    this.camera = this.Experience.camera;
    this.setRenderer();
  }
  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    // 定义渲染器的输出编码;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    // 色调映射;
    this.renderer.toneMapping = THREE.ReinhardToneMapping;
    // 色调映射的曝光级别;
    this.renderer.toneMappingExposure = 2;
    // 允许在场景中使用阴影贴图;
    this.renderer.shadowMap.enabled = true;
    // 定义阴影贴图类型;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // 将输出canvas的大小调整为(width, height)并考虑设备像素比
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    // 设置设备像素比。通常用于避免HiDPI设备上绘图模糊
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }
  resize() {
    // 将输出canvas的大小调整为(width, height)并考虑设备像素比
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    // 设置设备像素比。通常用于避免HiDPI设备上绘图模糊
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }
  update() {
    // https:threejs.org/docs/index.html?q=rendere#api/zh/renderers/WebGLRenderer.render
    // this.renderer.render(this.scene, this.camera.perspectiveCamera);
    this.renderer.render(this.scene, this.camera.OrthographicCamera);
  }
  // ______________________________________________________
  // update() {
  //   // 设置视口，即渲染到屏幕的位置和大小
  //   this.renderer.setViewport(0, 0, this.sizes.width, this.sizes.height);
  //   // https:threejs.org/docs/index.html?q=rendere#api/zh/renderers/WebGLRenderer.render
  //   // this.renderer.render(this.scene, this.camera.perspectiveCamera);
  //   this.renderer.render(this.scene, this.camera.OrthographicCamera);
  //   // 设置裁剪区域，即渲染到屏幕的位置和大小
  //   this.renderer.setScissorTest(true);
  //   this.renderer.setViewport(
  //     (this.sizes.width - this.sizes.height) / 5,
  //     (this.sizes.width - this.sizes.height) / 3,
  //     this.sizes.width / 1.5,
  //     this.sizes.height / 1.5
  //   );
  //   this.renderer.setScissor(
  //     (this.sizes.width - this.sizes.height) / 20,
  //     (this.sizes.width - this.sizes.height) / 3,
  //     this.sizes.width / 3,
  //     this.sizes.height / 3
  //   );
  //   this.renderer.render(this.scene, this.camera.perspectiveCamera);
  //   this.renderer.setScissorTest(false);
  // }
}
