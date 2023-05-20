import Experience from "./ecperience";
import * as THREE from "three";
import { EventEmitter } from "events";
import gsap from "gsap";

export default class Theme extends EventEmitter {
  constructor() {
    super();
    this.Experience = new Experience();
    this.sizes = this.Experience.sizes;
    this.scene = this.Experience.scene;
    this.canvas = this.Experience.canvas;
    this.world = this.Experience.world;
    this.loading();
  }
  loading() {
    const timeline = gsap.timeline();
    let mm = gsap.matchMedia();
    console.log(this.world.room.actualRoom);
    this.world.room.actualRoom.children.forEach((child) => {
      if (child.name == "Cube") {
        mm.add("(min-width: 969px)", () => {
          timeline
            .to(child.position, {
              x: 0.6576335430145264,
              y: 1.3361244201660156,
              z: -18.75898551940918,
              duration: 0.8,
            })
            .to(
              child.scale,
              {
                x: 1,
                y: 1,
                z: 1,
              },
              0
            )
            .to(
              child.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              0
            ) // 这里的 0 表示同时开始
            .eventCallback("onComplete", this.homeLoading, [this.world], this);
        });
      }
    });
  }
  homeLoading(world) {
    console.log(world.room.roomChildren);
    console.log(gsap.timeline());
    let Timeline = gsap.timeline();
    let mm = gsap.matchMedia();
    const excludedNames = [
      "mailbox",
      "lamp",
      "floorfirst",
      "floorsecond",
      "floorthird",
      "dirt",
      "flower1",
      "flower2",
    ];
    const child = [];

    mm.add("(min-width: 969px)", () => {
      const roomChildrenKeys = Object.keys(world.room.roomChildren).reverse();

      for (let key in roomChildrenKeys) {
        if (excludedNames.includes(roomChildrenKeys[key])) {
          continue;
        }
        Timeline.to(world.room.roomChildren[roomChildrenKeys[key]].scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.25,
        });
      }
      //     roomChildrenKeys.map((key) => {
      //       if (excludedNames.includes(child.name)) {
      //   continue;
      // }
      //       Timeline.to(world.room.roomChildren[key].scale, {
      //         x: 1,
      //         y: 1,
      //         z: 1,
      //         duration: 0.5,
      //       });
      //     });
    });
  }
  resize() {}
  update() {}
}
