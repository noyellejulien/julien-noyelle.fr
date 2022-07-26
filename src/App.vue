<script setup lang="ts">

import { onMounted, ref, type Ref } from "vue";
import Header from "./components/Header.vue";
import Sandbox from "./components/Sandbox.vue";
import Projects from "./components/Projects.vue";
import About from "./components/About.vue";
import Footer from "./components/Footer.vue";
import Quaternion from "Quaternion";
import terminal from "virtual:terminal";

const xPos: Ref<number> = ref(0);
const yPos: Ref<number> = ref(0);
const isDark: Ref<boolean> = ref(window.matchMedia("(prefers-color-scheme: dark)").matches);
const isMobile: Ref<boolean> = ref(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
const wHeight = ref(window.innerHeight);
const wWidth = ref(window.innerWidth);

const processOnMouseMove = (event: { clientX: number; clientY: number; }) => {
  xPos.value = ((event.clientX / wWidth.value) * 100) - 50;
  yPos.value = ((event.clientY / wHeight.value) * 100) - 50;
}

const processOnDeviceOrientation = (event: DeviceOrientationEvent) => {
  const rad: number = (Math.PI / 180);

  const alpha: number = event.alpha!;
  const beta: number = event.beta!;
  const gamma: number = event.gamma!;

  const q: Quaternion = Quaternion.fromEuler(alpha * rad, beta * rad, gamma * rad, 'ZXY');

  // const orientations = [
  //   ['landscape left', 'landscape right'],  // device x axis points up/down
  //   ['portrait', 'portrait upside down'],   // device y axis points up/down
  //   ['display up', 'display down'],         // device z axis points up/down
  // ];
  //const vec = q.conjugate().rotateVector([0, 0, 1]);
  //const [value, axis] = vec.reduce((acc, cur, idx) => (Math.abs(cur) < Math.abs(acc[0]) ? acc : [cur, idx]), [0, 0]);
  //const orientation = value < 0 ? orientations[axis][1] : orientations[axis][0];

  const x: number = q.conjugate().toMatrix(false)[2] * 100
  const y: number = q.conjugate().toMatrix(false)[5] * 100

  xPos.value = wHeight.value < wWidth.value ? y : -x;
  yPos.value = wHeight.value < wWidth.value ? x : y;
}

const processResize = () => {
  wHeight.value = window.innerHeight;
  wWidth.value = window.innerWidth;
}

// Events
window.addEventListener('resize', processResize);

if (!isMobile.value) window.addEventListener('mousemove', processOnMouseMove);
else window.addEventListener('deviceorientation', processOnDeviceOrientation);

if (isDark) document.documentElement.setAttribute("data-color-scheme-dark", "true");

onMounted(() => {
  const links: NodeListOf<HTMLElement> = document.querySelectorAll("a");
  links.forEach(elem => {
    elem.setAttribute('title', elem.innerHTML);
  })
})

</script>

<template>
  <Header :wWidth="wWidth" :wHeight="wHeight" />
  <Sandbox :isMobile="isMobile" :wWidth="wWidth" :wHeight="wHeight" :pos="{ xPos, yPos }" />
  <Projects :isMobile="isMobile" :wWidth="wWidth" :wHeight="wHeight" />
  <About />
  <Footer />
</template>

<style lang="scss">
@import "./assets/styles/_montserrat.css";
@import "./assets/styles/_base.scss";
@import "./assets/styles/_normalize.scss";
</style>
