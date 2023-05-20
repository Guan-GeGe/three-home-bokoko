import Experience from "./ecperience";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export default class Camera {
  constructor() {
    this.Experience = new Experience();
    this.sizes = this.Experience.sizes;
    this.scene = this.Experience.scene;
    this.canvas = this.Experience.canvas;

    // 创建两个相机
    // 透视相机
    this.createPerspectiveCamera();
    // 正交的
    this.createOrthographicCamera();
    // 创建轨道控制器
    this.setCreateControls();
  }
  // 透视相机
  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      75,
      this.sizes.aspectRatio,
      0.1,
      100
    );
    this.scene.add(this.perspectiveCamera);

    this.perspectiveCamera.position.y = 3.5;
    this.perspectiveCamera.position.x = 0.5;
    this.perspectiveCamera.position.z = 3;
    // this.perspectiveCamera.position.x = 29;
    // this.perspectiveCamera.position.y = 14;
    // this.perspectiveCamera.position.z = 12;
  }
  // 正交相机
  createOrthographicCamera() {
    this.OrthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspectRatio * this.sizes.frustumSize) / 2,
      (this.sizes.aspectRatio * this.sizes.frustumSize) / 2,
      this.sizes.frustumSize / 2,
      -this.sizes.frustumSize / 2,
      -50,
      50
    );
    // 调整能够看到的视角，将视角放到房子的上方
    // this.OrthographicCamera.position.y = 3.5;
    // this.OrthographicCamera.position.z = 5;
    // this.OrthographicCamera.rotation.x = -Math.PI / 2;
    this.OrthographicCamera.position.y = 6;
    this.OrthographicCamera.position.z = 10;
    this.OrthographicCamera.rotation.x = -Math.PI / 6;
    // this.OrthographicCamera.position.set(
    //   -this.sizes.frustumSize / 2,
    //   -this.sizes.frustumSize / 2,
    //   5
    // );
    this.scene.add(this.OrthographicCamera);

    // this.helper = new THREE.CameraHelper(this.OrthographicCamera);
    // this.scene.add(this.helper);
    const size = 20;
    const divisions = 20;

    // const gridHelper = new THREE.GridHelper(size, divisions);
    // this.scene.add(gridHelper);
    // const axesHelper = new THREE.AxesHelper(15);
    // this.scene.add(axesHelper);
  }
  // 创建轨道控制器
  setCreateControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);

    // this.controls = new OrbitControls(this.OrthographicCamera, this.canvas);
    this.controls.enableDamping = true;
    // 滑动滚轮时，不更新镜头
    this.controls.enableZoom = false;
  }
  resize() {
    // 透视相机
    // 摄像机视锥体长宽比;
    this.perspectiveCamera.aspect = this.sizes.aspectRatio;
    // 请注意，在大多数属性发生改变之后，你将需要调用.updateProjectionMatrix来使得这些改变生效。
    this.perspectiveCamera.updateProjectionMatrix();
    // 正交相机
    this.OrthographicCamera.left =
      (-this.sizes.aspectRatio * this.sizes.frustumSize) / 2;
    this.OrthographicCamera.right =
      (this.sizes.aspectRatio * this.sizes.frustumSize) / 2;
    this.OrthographicCamera.top = this.sizes.frustumSize / 2;
    this.OrthographicCamera.bottom = -this.sizes.frustumSize / 2;
    this.OrthographicCamera.updateProjectionMatrix();
  }
  update() {
    // console.log(this.OrthographicCamera);
    this.controls.update();
    // 默认为 true. 当设置的时候，渲染器在每一帧都会检查物体自身以及它的自带是否需要更新世界变换矩阵。 如果不需要的话它自身以及它的子代的所有世界变换矩阵都需要你来维护。
    // this.helper.matrixWorldAutoUpdate = true;
    // this.helper.update();
    // this.helper.position.copy(this.OrthographicCamera.position);
    // this.helper.rotation.copy(this.OrthographicCamera.rotation);
  }
}
