// 有摄像头跟着旋转的代码
import * as THREE from "three";
import Experience from "../ecperience";
import GSAP from "gsap";
export default class Controls {
  constructor() {
    this.Experience = new Experience();
    this.scene = this.Experience.scene;
    this.time = this.Experience.time;
    // 拿到房子的资产
    this.resources = this.Experience.resources;
    this.room = this.resources.items.room;
    this.camera = this.Experience.camera;

    this.progress = 0;
    this.dummyVector = new THREE.Vector3(0, 0, 0);

    this.lerp = {
      // 当前位置
      current: 0,
      // 目标位置
      target: 0,
      // 缓动速度
      ease: 0.9,
    };
    // 摄像机的位置
    this.position = new THREE.Vector3(0, 0, 0);
    // 让摄像机看向的位置
    this.lookAtPosition = new THREE.Vector3(0, 0, 0);
    // 摄像机的方向
    this.directionalVector = new THREE.Vector3(0, 0, 0);
    // 摄像机的静态方向
    this.staticVector = new THREE.Vector3(0, 1, 0);
    // 摄像机的叉积
    this.crossVector = new THREE.Vector3(0, 0, 0);

    // 创建曲线，让摄像机跟着曲线运动
    this.setPath();
    // 当滑动滚轮时
    this.onWheel();
  }

  // 绘制曲线
  setPath() {
    this.curve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-5, 0, 0),
        new THREE.Vector3(0, 0, -5),
        new THREE.Vector3(5, 0, 0),
        new THREE.Vector3(0, 0, 5),
      ],
      true
    );

    const points = this.curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    // Create the final object to add to the scene
    const curveObject = new THREE.Line(geometry, material);
    this.scene.add(curveObject);
  }
  onWheel() {
    // 当滑动滚轮时，让摄像机跟着曲线运动
    window.addEventListener("wheel", (e) => {
      if (e.deltaY > 0) {
        // 顺时针移动
        // this.progress += 0.01;
        // 逆时针移动
        // this.progress -= 0.01;
        // if (this.progress < 0) {
        //   this.progress = 1;
        // }
        this.lerp.target += 0.01;
        // 设置鼠标往哪个方向滚动，就让他往哪个方向滚动
        this.back = false;
      } else {
        this.lerp.target -= 0.01;
        // if (this.progress < 0) {
        //   this.progress = 1;
        // }
        this.back = true;
      }
    });
  }
  resize() {}
  update() {
    // 在几乎任意两个值（数字、颜色、字符串、数组、复杂字符串，甚至是具有多个属性的对象）之间进行插值
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );
    // // 在0或者1数字中限制范围，如果大于1就返回1，如果小于0就返回0
    // this.lerp.current = GSAP.utils.clamp(0, 1, this.lerp.current);
    // this.lerp.target = GSAP.utils.clamp(0, 1, this.lerp.target);
    // // 查看onWheel方法
    // if (this.back) {
    //   this.lerp.target -= 0.001;
    // } else {
    //   this.lerp.target += 0.001;
    // }
    // // 让正交相机跟着创造的曲线运动
    // this.curve.getPointAt(this.lerp.current, this.position);
    // // 让摄像机看向的位置跟着创造的曲线运动
    // this.curve.getPointAt(this.lerp.current + 0.01, this.lookAtPosition);
    // // 我们将这个方法放到onWheel中;
    // this.camera.OrthographicCamera.position.copy(this.position);
    // // 设置让摄像机看向的位置
    // this.camera.OrthographicCamera.lookAt(this.lookAtPosition);
    // ——————————————————————————————————————————————————————————————————————————————————
    // 将设置的曲线转为围绕物体
    this.curve.getPointAt(this.lerp.current % 1, this.position);
    this.camera.OrthographicCamera.position.copy(this.position);

    // 让摄像机看向的位置跟着创造的曲线运动
    this.directionalVector.subVectors(
      this.curve.getPointAt((this.lerp.current % 1) + 0.001),
      this.position
    );
    // 让摄像机看向的位置
    this.directionalVector.normalize();
    // 让摄像机看向的位置
    this.crossVector.crossVectors(this.directionalVector, this.staticVector);
    this.crossVector.multiplyScalar(100000);
    // 让摄像机看向的位置
    // this.camera.OrthographicCamera.lookAt(this.crossVector);
    this.camera.OrthographicCamera.lookAt(0, 0, 0);
  }
}
