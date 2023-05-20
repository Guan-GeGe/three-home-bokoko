// 灯光
import * as THREE from "three";
import Experience from "../ecperience";
import GSAP from "gsap";
export default class Environment {
  constructor() {
    this.Experience = new Experience();
    this.scene = this.Experience.scene;
    // 拿到房子的资产
    this.resources = this.Experience.resources;
    // 设置太阳光
    this.setSunlight();
  }
  setSunlight() {
    this.sunLight = new THREE.DirectionalLight(0xffffff, 3);
    // 如果设置为 true 该平行光会产生动态阴影
    this.sunLight.castShadow = true;
    // 用来计算该平行光产生的阴影;
    this.sunLight.shadow.camera.far = 20;
    // 一个Vector2定义阴影贴图的宽度和高度。
    this.sunLight.shadow.mapSize.set(1024, 1024);
    // 定义用于查询阴影贴图的位置沿对象法线的偏移量。默认值为 0。增加此值可用于减少阴影痤疮，尤其是在光线以浅角度照射到几何体的大场景中。代价是阴影可能会出现扭曲
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(-2, 5, 3);
    this.scene.add(this.sunLight);

    this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(this.ambientLight);
  }
  switchModel(isDay) {
    console.log(isDay);
    if (isDay) {
      GSAP.to(this.sunLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      GSAP.to(this.ambientLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      GSAP.to(this.sunLight, {
        intensity: 3,
      });
      GSAP.to(this.ambientLight, {
        intensity: 1,
      });
    } else {
      GSAP.to(this.sunLight.color, {
        r: 0.17254901960784313,
        g: 0.23137254901960785,
        b: 0.6862745098039216,
      });
      GSAP.to(this.ambientLight.color, {
        r: 0.17254901960784313,
        g: 0.23137254901960785,
        b: 0.6862745098039216,
      });
      GSAP.to(this.sunLight, {
        intensity: 0.78,
      });
      GSAP.to(this.ambientLight, {
        intensity: 0.78,
      });
    }
  }
  resize() {}
  update() {}
}
