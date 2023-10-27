<template>
  <div class="bg-red flex flex-center">
    <div>{{ position }}</div>
    <f-v-scroll
      @position="getPosition"
      :list="arr"
      v-slot="{ item, index, topIndex }"
      style="height: 450px; width: 100px"
    >
      <div class="flex" style="width: 150px">
        test {{ item.name }} {{ index }}
      </div>
    </f-v-scroll>
    <f-v-scroll-native
      :list="arr"
      v-slot="{ item, index, topIndex }"
      style="height: 450px; width: 100px"
    >
      <div class="flex" style="width: 150px">t {{ index }}</div>
    </f-v-scroll-native>
    <div>{{ y.toFixed(2) }}</div>
    <div v-bind="containerProps" style="height: 450px; width: 500px" id="el">
      <div v-bind="wrapperProps">
        <div
          v-for="{ index, data } in list"
          :key="index"
          style="box-shadow: 0 0 0 1px inset black"
          :style="{
            height: `${32}px`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }"
        >
          Row {{ index }}
        </div>
      </div>
    </div>
    <UCard
      :ui="{
        background: 'bg-white dark:bg-slate-900',
      }"
    />
    <HelloWorld />
  </div>
</template>

<script setup>
import { useVirtualList, useScroll } from "@vueuse/core";
import { HelloWorld } from "aleng-library-test";
import "aleng-library-test/dist/style.css";
import { computed, nextTick, onMounted } from "vue";
// import * as test from "@nuxt/ui";
// console.log(test);

const position = ref(0);
const getPosition = (v) => {
  position.value = v.toFixed(2);
};
onMounted(async () => {
  await nextTick();
  el.value = document.getElementById("el");
});
const el = ref();
const arr = Array.from(Array(100559).keys(), (x) => {
  return { name: x + 1 };
});
const arr2 = ref(
  Array.from(Array(100559).keys(), (x) => {
    return { name: x + 1 };
  })
);
const search = ref("");
const allItems = Array.from(Array(99999).keys()).map((i) => ({
  height: i % 2 === 0 ? 42 : 84,
  size: i % 2 === 0 ? "small" : "large",
}));

const filteredItems = computed(() => {
  return allItems.filter((i) => i.size.startsWith(search.value.toLowerCase()));
});
const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(arr2, {
  itemHeight: 32,
  overscan: 40,
});
const { x, y, isScrolling, arrivedState, directions } = useScroll(el);
</script>

<style scoped></style>
