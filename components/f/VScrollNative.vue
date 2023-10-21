<template>
  <div ref="container" class="relative-position overflow-auto">
    <div
      ref="scroller"
      :style="{ height: `${props.itemSize * props.list.length}px` }"
    >
      <div
        v-for="(item, i) in renderedList"
        class="absolute full-width"
        :style="{
          height: `${props.itemSize}px`,
          top: `${item['_stat'].position}px`,
        }"
        style="box-shadow: 0 0 0 1px inset black"
      >
        <slot :item="item" :index="item._stat.index" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  list: {
    default() {
      return [];
    },
  },
  itemSize: {
    default: 32,
  },
  overscan: {
    default: 20,
  },
});

const container = ref();
const position = ref(0);
const renderedList = useVScroll(container, props.list, { ...props });
</script>

<style scoped></style>
