<template>
  <div
    ref="container"
    class="overflow-hidden relative-position"
    @wheel="scroll"
    :draggable="false"
  >
    <div
      ref="scroller"
      :style="{
        transition: isScrolling ? `${scrollingTransition}ms` : '0ms',
        transform: `translateY(-${position}px)`,
        userSelect: thumbScrolling ? 'none' : 'auto',
      }"
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
    <div class="scrollbar" @click.self="scrollTo">
      <div
        class="thumb"
        :class="thumbScrolling ? 'bg-green' : 'bg-grey-10'"
        :style="{
          height: `${thumbSize}px`,
          transform: `translateY(${thumbPosition}px)`,
          transition: isScrolling ? `${scrollingTransition}ms` : '0ms',
        }"
        @pointerdown.capture="thumbScroll"
      ></div>
    </div>
  </div>
</template>

<script setup>
import * as test from "https://unpkg.com/thefeymes-ui@0.0.1-test-9/composables/useVScrollJs.js";
console.log(test)
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
const renderedList = useVScroll(container, props.list, { ...props, position });
const { height: containerH } = useElementBounding(container);
const { elementY } = useMouseInElement(container);
const scroller = ref();
const scrollerSize = computed(() => {
  return props.itemSize * props.list.length;
});
const scollerEnd = computed(() => {
  return scrollerSize.value - containerH.value;
});

const isScrolling = ref(false);
const scrollingTransition = ref(170);
const scroll = (v) => {
  isScrolling.value = true;
  if (isScrolling.value) {
    position.value = position.value + v.deltaY;
    setTimeout(() => {
      isScrolling.value = false;
    }, scrollingTransition.value);
  }
};
watch(position, () => {
  if (position.value < 0) position.value = 0;
  if (Math.abs(position.value) >= scollerEnd.value) {
    position.value = scollerEnd.value;
  }
});

const thumbRatio = computed(() => {
  return containerH.value / scrollerSize.value;
});
const thumbSize = computed(() => {
  let size = containerH.value * thumbRatio.value;
  if (size <= 20) {
    size = 20;
  }
  return size;
});
const thumbPosition = ref(0);
watch(position, () => {
  if (thumbSize.value <= 20) {
    let scrollRatio = position.value / scollerEnd.value;
    thumbPosition.value = (containerH.value - 20) * scrollRatio;
  } else {
    thumbPosition.value = position.value * thumbRatio.value;
  }
});

const { pressed } = useMousePressed();
const thumbScrolling = ref(false);
const initialMousePos = ref(null);
const thumbInitialPos = ref(null);
const thumbScroll = () => {
  thumbScrolling.value = true;
  initialMousePos.value = elementY.value;
  thumbInitialPos.value = thumbPosition.value;
};

const scrollTo = () => {
  const total = containerH.value - thumbSize.value;
  position.value = scollerEnd.value * (elementY.value / total);
};

watch(elementY, () => {
  if (thumbScrolling.value && initialMousePos.value) {
    if (elementY.value >= 0 && elementY.value <= containerH.value) {
      const total = containerH.value - thumbSize.value;
      const gap = initialMousePos.value - thumbInitialPos.value;
      position.value = scollerEnd.value * ((elementY.value - gap) / total);
    }
    // console.log(elementY.value);
    if (elementY.value < 0) position.value = 0;
    if (elementY.value > containerH.value) position.value = scollerEnd.value;
  }
});

watch(pressed, () => {
  if (!pressed.value && thumbScrolling.value) {
    thumbScrolling.value = false;
    initialMousePos.value = null;
  }
});
</script>

<style scoped>
.scrollbar {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 12px;
  background-color: rgba(59, 59, 59, 0.096);
}
.thumb {
  width: 100%;
  min-height: 20px;
  max-height: 100%;
  top: 0;
  right: 0;
}
</style>
