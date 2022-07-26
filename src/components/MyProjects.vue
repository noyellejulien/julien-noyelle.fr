<script setup lang="ts">
import MyProject from "./MyProject.vue";
import { computed, onMounted, ref } from "vue";

export interface ProjectInterface {
  id: number;
  test: string;
  title: string;
}

const doc = document.documentElement;
const props = defineProps(["isMobile", "wHeight", "wWidth"]);

const projects: Array<ProjectInterface> = [
  { id: 0, test: "1", title: "Test 1" },
  { id: 1, test: "2", title: "Test 2" },
  { id: 2, test: "3", title: "Test 3" },
  { id: 3, test: "4", title: "Test 4" },
  { id: 4, test: "5", title: "Test 5" },
];

const headerHeight = computed(() => {
  const header = document.querySelector("header");
  if (header != null) {
    const headerStyle = window.getComputedStyle(header, null);
    return parseFloat(headerStyle.height);
  }
  return 0;
});
const totalNextElemsHeight = ref(0);

const totalPrevElemsHeight = ref(0);

const top = ref(0);

const transform = ref(0);

const height = ref(0);

const projectsHeight = computed(() => {
  return props.wWidth * projects.length;
});

const getNextSiblings = (elem: HTMLElement | null) => {
  const sibs = [];
  if (elem != null) {
    while ((elem = elem.nextSibling as HTMLElement)) {
      if (elem.nodeType === 3) continue; // text node
      sibs.push(elem);
    }
  }
  return sibs;
};

const getPrevSiblings = (elem: HTMLElement | null) => {
  const sibs = [];
  if (elem != null) {
    while ((elem = elem.previousSibling as HTMLElement)) {
      if (elem.nodeType === 3) continue; // text node
      sibs.push(elem);
    }
  }
  return sibs;
};

const doThings = () => {
  const subcontainer = document.querySelector(
    ".projects-container-subcontainer"
  );

  if (subcontainer != null) {
    const prevElements = getPrevSiblings(subcontainer.parentElement);
    let start = 0;
    prevElements.forEach((elem) => {
      const test = window.getComputedStyle(elem as HTMLElement, null);
      start += parseFloat(test.height);
      start += parseFloat(test.marginTop);
      start += parseFloat(test.marginBottom);
      totalPrevElemsHeight.value = start;
    });

    const nextElements = getNextSiblings(subcontainer.parentElement);
    start = 0;
    nextElements.forEach((elem) => {
      const test = window.getComputedStyle(elem as HTMLElement, null);
      start += parseFloat(test.height);
      start += parseFloat(test.marginTop);
      start += parseFloat(test.marginBottom);
      totalNextElemsHeight.value = start;
    });
  }

  const start = totalPrevElemsHeight.value - headerHeight.value;
  const end = doc.offsetHeight - totalNextElemsHeight.value - props.wHeight;

  if (doc.scrollTop < start) {
    top.value = props.wHeight - doc.scrollTop;
    height.value = props.wHeight;
  } else if (doc.scrollTop >= start && doc.scrollTop < end) {
    top.value = headerHeight.value;
    height.value = props.wHeight;
  } else if (doc.scrollTop >= end) {
    top.value = -(doc.scrollTop - end - headerHeight.value);
    height.value = props.wHeight - headerHeight.value;
  }

  let pos = ((doc.scrollTop - start) * 100) / (end - start) / 100;
  pos = pos < 0 ? 0 : pos > 1 ? 1 : pos;

  transform.value = -(projectsHeight.value - props.wWidth) * pos;
};

window.addEventListener("resize", doThings);
window.addEventListener("scroll", doThings);

onMounted(doThings);
</script>

<template>
  <div
    class="projects-container"
    :style="{
      height: `${projectsHeight}px`,
      width: `${wWidth}px`,
      'scroll-margin-top': `${headerHeight}px`,
    }"
    id="projects"
  >
    <div
      class="projects-container-subcontainer"
      :style="{
        top: `${top}px`,
        transform: `translateX(${transform}px)`,
        height: `${height}px`,
      }"
    >
      <MyProject
        v-for="project in projects"
        :project="project"
        :wWidth="wWidth"
        :wHeight="wHeight"
        :key="project.test"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/styles/projects.scss";
</style>
