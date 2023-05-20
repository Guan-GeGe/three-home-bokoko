import * as THREE from "three";
import { EventEmitter } from "events";
import Experience from "../ecperience";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
export default class Resources extends EventEmitter {
  constructor(assets) {
    super();
    this.expericence = new Experience();
    this.renderer = this.expericence.renderer;

    this.assets = assets;

    // 放置已经加载的物体
    this.items = {};
    // 加载的数量,让我们知道有多少物体待加载
    this.queue = this.assets.length;
    // 已经加载的数量
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }
  // 设置加载器
  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.dracoLoader = new DRACOLoader();
    this.loaders.dracoLoader.setDecoderPath("/draco/");
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
  }
  // 开始加载
  startLoading() {
    for (let asset of this.assets) {
      if (asset.type === "glbModel") {
        this.loaders.gltfLoader.load(asset.peth, (gltf) => {
          // 单资产加载;
          this.singleAssetLoaded(asset, gltf);
        });
      } else if (asset.type === "videoTexture") {
        this.video = {};
        this.videoTexture = {};
        this.video[asset.name] = document.createElement("video");
        this.video[asset.name].src = asset.peth;
        this.video[asset.name].playsInline = true;
        this.video[asset.name].autoplay = true;
        this.video[asset.name].loop = true;
        this.video[asset.name].muted = true;
        setTimeout(() => {
          this.video[asset.name].play();
        }, 150);

        this.videoTexture[asset.name] = new THREE.VideoTexture(
          this.video[asset.name]
        );
        this.videoTexture[asset.name].flopY = true;
        this.videoTexture[asset.name].minFilter = THREE.LinearFilter;
        this.videoTexture[asset.name].magFilter = THREE.LinearFilter;
        // 是否生成mipmaps。默认为False
        this.videoTexture[asset.name].generateMipmaps = false;
        // 编码
        this.videoTexture[asset.name].colorSpace = THREE.SRGBColorSpace;

        this.singleAssetLoaded(asset, this.videoTexture.screen);
      }
    }
  }
  singleAssetLoaded(asset, item) {
    this.items[asset.name] = item;
    this.loaded++;
    console.log("正在加载");
    if (this.loaded === this.queue) {
      console.log("加载完场");
      // console.log(this.items);
      // 此时已经加载完所有的
      this.emit("ready");
    }
  }
}
