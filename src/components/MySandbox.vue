<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import * as THREE from "three";

const props = defineProps(["isMobile", "wWidth", "wHeight", "pos"]);
let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let cube: THREE.Mesh;
let geometry;
let material;
let canvas: HTMLElement | null;

const viewHeight = computed(() => {
  const header = document.querySelector("header");
  if (header != null) {
    const headerStyle = window.getComputedStyle(header, null);
    return (
      props.wHeight - headerHeight.value - parseFloat(headerStyle.paddingTop)
    );
  }
  return 0;
});

const headerHeight = ref(0);

function animate() {
  requestAnimationFrame(animate);

  if (canvas != null) {
    const a =
      canvas.clientWidth / viewHeight.value > 2
        ? 2
        : canvas.clientWidth / viewHeight.value;

    if (
      canvas.clientWidth != renderer.domElement.clientWidth ||
      viewHeight.value != renderer.domElement.clientHeight
    ) {
      renderer.setSize(canvas.clientWidth, viewHeight.value);
      camera.aspect = canvas.clientWidth / viewHeight.value;
      camera.updateProjectionMatrix();
      cube.scale.x = cube.scale.y = cube.scale.z = a;
    }

    if (props.pos) {
      camera.position.x =
        props.wWidth > 768 ? props.pos.xPos / 100 : props.pos.xPos / 100;
      camera.position.y =
        props.wWidth > 768 ? -props.pos.yPos / 100 : -(props.pos.yPos / 100);
    }

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    cube.scale.x =
      cube.scale.y =
      cube.scale.z =
        canvas.clientWidth / viewHeight.value;

    renderer.render(scene, camera);
  }
}

const processStyle = () => {
  const header = document.querySelector("header");
  if (header != null) {
    const headerStyle = window.getComputedStyle(header, null);
    headerHeight.value = parseFloat(headerStyle.height);
  }
};

window.addEventListener("resize", () => {
  processStyle();
});

onMounted(() => {
  processStyle();
  canvas = document.querySelector(".sandbox-container");
  if (canvas) {
    /*const mtlLoader = new MTLLoader();

        mtlLoader.load("./src/assets/objs/test.mtl", function (materials: { preload: () => void; }) {

            materials.preload();
            const objloader = new OBJLoader();
            objloader.setMaterials(materials);
            objloader.load('./src/assets/objs/test.obj', function (object: any) {
                console.log(object)
                object.position.set(1, 1, -53);
                scene.add(object);
            })
        });*/

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      props.wWidth / props.wHeight,
      0.1,
      1000
    );

    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      precision: "lowp",
      stencil: false,
    });
    renderer.setClearColor(0x000000, 0);
    canvas.appendChild(renderer.domElement);

    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 6;
    animate();
  }
});
</script>

<template>
  <div
    class="sandbox-container"
    :style="{
      'background-position': `${pos.xPos}px ${pos.yPos}px`,
      height: `${viewHeight}px`,
      'scroll-margin-top': `${headerHeight}px`,
    }"
    id="about"
  ></div>
</template>

<style scoped lang="scss">
@import "../assets/styles/sandbox.scss";
</style>
