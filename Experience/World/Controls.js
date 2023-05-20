import * as THREE from "three";
import Experience from "../ecperience";
import gsap from "gsap";
// ScrollSmoother 在内部创建的用于管理页面平滑滚动效果的 ScrollTrigger 实例。
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ASScroll from "@ashthornton/asscroll";
export default class Controls {
  constructor() {
    this.Experience = new Experience();
    this.scene = this.Experience.scene;
    this.sizes = this.Experience.sizes;
    this.time = this.Experience.time;
    // 拿到房子的资产
    this.resources = this.Experience.resources;
    this.room = this.resources.items.room;
    this.camera = this.Experience.camera;
    this.circle1 = this.Experience.world.floor.circle1;
    this.circle2 = this.Experience.world.floor.circle2;
    this.circle3 = this.Experience.world.floor.circle3;
    this.actualRoom = this.Experience.world.room.actualRoom;
    this.actualRoom.children.forEach((child) => {
      if (child.type === "RectAreaLight") {
        console.log(child);
        this.rectLight = child;
      }
    });
    // 向 GSAP 内核注册插件可确保两者无缝协作，还可以防止构建工具/捆绑器中的树抖动问题。您只需注册一次插件即可使用
    gsap.registerPlugin(ScrollTrigger);
    if (
      !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      this.setSmoothScroll();
    }
    this.setScrollTrigger();
  }
  setScrollTrigger() {
    // 创建一个动画序列
    const scrollTrigger = {
      markers: false,
      scrub: 0.5,
      invalidateOnRefresh: true,
    };
    const timeline = gsap.timeline();
    let mm = gsap.matchMedia();

    // this.camera.OrthographicCamera.lookAt(-1.1, 5, 5);

    mm.add("(min-width: 969px)", () => {
      // 添加动画序列
      timeline
        // x属性循序渐变，*号是为了当改变浏览器大小时，x的值也会跟着改变
        .to(this.actualRoom.position, {
          x: () => {
            return this.sizes.width * 0.0013;
          },
          duration: 1,
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            ...scrollTrigger,
          },
        })
        // 让底部的地板缩放
        .to(this.circle1.scale, {
          x: 10,
          y: 10,
          z: 10,
          duration: 1,
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            ...scrollTrigger,
          },
        });
      // 当走到第二个动画时，缩放和位置都会改变
      timeline
        .to(this.actualRoom.scale, {
          x: 0.4,
          y: 0.4,
          z: 0.4,
          duration: 1,
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            ...scrollTrigger,
          },
        })
        .to(this.circle2.scale, {
          x: 10,
          y: 10,
          z: 10,
          duration: 1,
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            ...scrollTrigger,
          },
        })
        .to(this.actualRoom.position, {
          x: 1,
          z: () => {
            return this.sizes.height * 0.0032;
          },
          duration: 1,
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            ...scrollTrigger,
          },
        })
        // 改变发光的亮度
        .to(this.rectLight, {
          width: 0.5 * 4,
          height: 1 * 4,
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            ...scrollTrigger,
          },
        });
      // 第三个页面，更改摄像机的位置
      timeline
        // .to(this.actualRoom.position, {
        //   x: () => {
        //     return this.sizes.width * 0.002;
        //   },
        //   duration: 1,
        //   scrollTrigger: {
        //     trigger: ".third-move",
        //     start: "top top",
        //     end: "bottom bottom",
        //     markers: false,
        //     scrub: 0.5,
        //     invalidateOnRefresh: true,
        //   },
        // })
        .to(this.camera.OrthographicCamera.position, {
          y: 1.5,
          x: -4.1,
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            ...scrollTrigger,
          },
        })
        .to(this.circle3.scale, {
          x: 10,
          y: 10,
          z: 10,
          duration: 1,
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            ...scrollTrigger,
          },
        });
    });
    // 对每个小平台上的小物体进行缩放显示
    const scrollTriggerMiniFloor = {
      trigger: ".third-move",
      start: "center center",
      end: "bottom bottom",
      ...scrollTrigger,
    };

    const objectsToScale = [
      { name: "Mailbox", easing: "back.out(2)" },
      { name: "Lamp", easing: "back.out(2)" },
      { name: "FloorFirst", easing: "back.out(2)" },
      { name: "FloorSecond" },
      { name: "FloorThird", easing: "back.out(2)" },
      { name: "Dirt", easing: "back.out(2)" },
      { name: "Flower1", easing: "back.out(2)" },
      { name: "Flower2", easing: "back.out(2)" },
    ];

    this.actualRoom.children.forEach((child) => {
      if (child.name == "Mini_Floor") {
        timeline.to(child.position, {
          x: -5.44055,
          z: 13.6135,
          duration: 0.3,
          scrollTrigger: scrollTriggerMiniFloor,
        });
      }

      const objectConfig = objectsToScale.find(
        (config) => config.name === child.name
      );
      if (objectConfig) {
        timeline.to(child.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: objectConfig.easing,
          duration: 0.3,
          scrollTrigger: scrollTriggerMiniFloor,
        });
      }
    });
  }
  // 添加平滑滚动
  setupASScroll() {
    // https://github.com/ashthornton/asscroll
    const asscroll = new ASScroll({
      ease: 0.1,
      disableRaf: true,
    });

    gsap.ticker.add(asscroll.update);

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement,
    });

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length) {
          asscroll.currentPos = value;
          return;
        }
        return asscroll.currentPos;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      fixedMarkers: true,
    });

    asscroll.on("update", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", asscroll.resize);

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(
          ".gsap-marker-start, .gsap-marker-end, [asscroll]"
        ),
      });
    });
    return asscroll;
  }

  setSmoothScroll() {
    this.asscroll = this.setupASScroll();
  }
  // 绘制曲线
  resize() {}
  update() {}
}
