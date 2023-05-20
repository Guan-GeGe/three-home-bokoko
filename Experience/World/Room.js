import * as THREE from "three";
import Experience from "../ecperience";
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
export default class World {
  constructor() {
    this.Experience = new Experience();
    this.scene = this.Experience.scene;
    this.time = this.Experience.time;
    // 拿到房子的资产
    this.resources = this.Experience.resources;
    this.room = this.resources.items.room;
    // console.log(this.room);
    // 渲染的物体
    this.actualRoom = this.room.scene;
    this.roomChildren = {};
    this.lerp = {
      // 当前位置
      current: 0,
      // 目标位置
      target: 0,
      // 缓动速度
      ease: 0.9,
    };
    // 给物体添加材质
    this.setModel();
    // 让物体动起来
    this.setAnimation();
    // 鼠标经过房子时的动画
    this.onMouseMove();
  }
  // 给物体添加材质
  setModel() {
    console.log(this.actualRoom);
    this.actualRoom.children.forEach((child) => {
      // console.log(child);
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.type == "Group") {
        child.children.forEach((groupchild) => {
          //     // 给鱼缸添加材质
          //     if (groupchild.name == "Cube136") {
          //       groupchild.material = new THREE.MeshPhysicalMaterial({
          //         roughness: 0,
          //         color: 0x549dd2,
          //         ior: 3,
          //         transmission: 1,
          //         depthWrite: false,
          //         depthTest: false,
          //         opacity: 1,
          //       });
          //     }
          //     // 给电脑屏幕添加视频
          //     if (groupchild.name == "Cube021_1") {
          //       console.log(this.resources.items.screen);
          //       groupchild.material = new THREE.MeshBasicMaterial({
          //         map: this.resources.items.screen,
          //       });
          //     }
          groupchild.castShadow = true;
          groupchild.receiveShadow = true;
        });
      }
      // 给鱼缸添加材质
      if (child.name == "Aquarium") {
        child.children[0].material = new THREE.MeshPhysicalMaterial({
          roughness: 0,
          color: 0x549dd2,
          ior: 3,
          transmission: 1,
          depthWrite: false,
          depthTest: false,
          opacity: 1,
        });
      }
      // 给电脑屏幕添加视频
      if (child.name === "Computer") {
        child.children[1].material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
      }
      // 让小平台隐藏
      if (child.name === "Mini_Floor") {
        child.position.x = -0.289521;
        child.position.z = 8.83572;
      }

      // if (
      //   child.name === "Mailbox" ||
      //   child.name === "Lamp" ||
      //   child.name === "FloorFirst" ||
      //   child.name === "FloorSecond" ||
      //   child.name === "FloorThird" ||
      //   child.name === "Dirt" ||
      //   child.name === "Flower1" ||
      //   child.name === "Flower2"
      // ) {
      //   child.scale.set(0, 0, 0);
      // }
      // 先将所有的物体隐藏， 然后当正方体动画昨晚之后再加载无图
      child.scale.set(0, 0, 0);
      if (child.name === "Cube") {
        child.scale.set(13, 20, 13);
        child.position.set(0, 0, 0);
        child.rotation.y = Math.PI / 4;
      }
      this.roomChildren[child.name.toLowerCase()] = child;
    });
    // 添加平面灯光，让浴缸发光
    const width = 0.5;
    const height = 1;
    const intensity = 3;
    const rectLight = new THREE.RectAreaLight(
      0xffffff,
      intensity,
      width,
      height
    );
    rectLight.position.set(7.68244, 7, 0.5);
    rectLight.rotation.x = -Math.PI / 2;
    rectLight.rotation.z = Math.PI / 4;
    this.actualRoom.add(rectLight);
    // this.rectLightHelper = new RectAreaLightHelper(rectLight);
    // rectLight.add(this.rectLightHelper);
    // 添加点光源，让灯发光
    const light = new THREE.PointLight(0xffffff, intensity, width);
    light.position.set(-10, 12, 0);
    this.actualRoom.add(light);

    // 添加物体
    this.scene.add(this.actualRoom);
    this.actualRoom.scale.set(0.11, 0.11, 0.11);
  }
  // 让物体动起来
  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualRoom);
    this.swim = this.mixer.clipAction(this.room.animations[0]);
    this.swim.play();
  }
  // 鼠标经过房子时的动画
  onMouseMove() {
    window.addEventListener("mousemove", (event) => {
      this.rotation =
        ((event.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.1;
    });
  }
  resize() {}
  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.actualRoom.rotation.y = this.lerp.current;
    this.mixer.update(this.time.delta * 0.001);
  }
}
