// 地板
import * as THREE from "three";
import Experience from "../ecperience";
import GSAP from "gsap";
export default class World {
  constructor() {
    this.Experience = new Experience();
    this.scene = this.Experience.scene;
    this.time = this.Experience.time;
    // 拿到房子的资产
    this.resources = this.Experience.resources;
    this.room = this.resources.items.room;
    // 给物体添加材质
    this.setFloor();
    // 添加地板
    this.setCircle();
  }
  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100);
    this.material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.BackSide,
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.plane.rotation.x = Math.PI / 2;
    this.plane.position.y = -0.3;
    this.plane.receiveShadow = true;
    this.scene.add(this.plane);
  }
  setCircle() {
    this.Circlegeometry = new THREE.CircleGeometry(2, 32);

    this.CircleMaterial1 = new THREE.MeshStandardMaterial({
      color: 0xe5a1aa,
      side: THREE.BackSide,
    });

    this.CircleMaterial2 = new THREE.MeshStandardMaterial({
      color: 0x8395cd,
      side: THREE.BackSide,
    });

    this.CircleMaterial3 = new THREE.MeshStandardMaterial({
      color: 0x7ad0ac,
      side: THREE.BackSide,
    });
    this.circle1 = new THREE.Mesh(this.Circlegeometry, this.CircleMaterial1);
    this.circle2 = new THREE.Mesh(this.Circlegeometry, this.CircleMaterial2);
    this.circle3 = new THREE.Mesh(this.Circlegeometry, this.CircleMaterial3);
    this.circle1.scale.set(0, 0, 0);
    this.circle2.scale.set(0, 0, 0);
    this.circle3.scale.set(0, 0, 0);
    this.circle1.position.y = -0.29;
    this.circle2.position.y = -0.28;
    this.circle2.position.x = 2;
    this.circle3.position.y = -0.27;
    this.circle1.rotation.x =
      this.circle2.rotation.x =
      this.circle3.rotation.x =
        Math.PI / 2;
    this.circle1.receiveShadow =
      this.circle2.receiveShadow =
      this.circle3.receiveShadow =
        true;
    this.scene.add(this.circle1);
    this.scene.add(this.circle2);
    this.scene.add(this.circle3);
  }
  resize() {}
  update() {}
}
