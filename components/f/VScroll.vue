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
      <!-- <div style="right: 50px; position: absolute">
        {{ renderedList.length }}
      </div> -->
      <div
        v-for="(item, i) in renderedList"
        class="absolute full-width"
        :style="{
          height: `${props.itemSize}px`,
          top: `${item['_stat'].position}px`,
        }"
        style="box-shadow: 0 0 0 1px inset black"
      >
        <slot :item="item" :index="item['_stat'].index" />
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
import { computed, nextTick, onMounted, watch } from "vue";
import {
  useMousePressed,
  useElementBounding,
  useMouseInElement,
} from "@vueuse/core";
import Impetus from "./Impetus";

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
// new Impetus({
//   source: container.value,
//   update: function (x, y) {
//     // whatever you want to do with the values
//     console.log("run",'asda');
//   },
// });
const {
  width: containerW,
  height: containerH,
  top: containerTop,
} = useElementBounding(container);
const scroller = ref();
const scollerSize = computed(() => {
  return props.itemSize * props.list.length;
});
const scollerEnd = computed(() => {
  return scollerSize.value - containerH.value;
});

const position = ref(0);
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
  return containerH.value / scollerSize.value;
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
const { y, elementY } = useMouseInElement(container);
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

watch(y, () => {
  if (thumbScrolling.value && initialMousePos.value) {
    if (
      y.value >= containerTop.value &&
      y.value <= containerTop.value + containerH.value
    ) {
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

const itemInView = computed(() => {
  return Math.ceil(containerH.value / props.itemSize);
});
const renderedList = ref([]);
const getRenderedList = () => {
  renderedList.value = [];
  if (props.list.length <= itemInView.value + props.overscan * 2) {
    for (let index = 0; index < props.list.length; index++) {
      let el = index;
      const element = props.list[el];
      element["_stat"] = {
        position: el * props.itemSize,
      };
      renderedList.value.push(element);
    }
    return;
  }
  let index = Math.floor(
    props.list.length - (scollerSize.value - position.value) / props.itemSize
  );
  const before = index - props.overscan;
  const after = props.list.length - (index + itemInView.value) - props.overscan;
  const renderBefore =
    before < 0
      ? props.overscan - Math.abs(before)
      : after < 0
      ? props.overscan +
        (Math.abs(after % props.overscan) == 0
          ? props.overscan
          : Math.abs(after % props.overscan))
      : props.overscan;

  const renderAfter =
    after < 0
      ? props.overscan - Math.abs(after)
      : before < 0
      ? props.overscan +
        (Math.abs(before % props.overscan) == 0
          ? props.overscan
          : Math.abs(before % props.overscan))
      : props.overscan;

  for (let i = 0; i < renderBefore; i++) {
    let elementIndex = index - (i + 1);
    const element = props.list[elementIndex];

    element["_stat"] = {
      position: elementIndex * props.itemSize,
      index: elementIndex,
    };
    renderedList.value.push(element);
  }
  for (let i = 0; i < itemInView.value; i++) {
    let elementIndex = index + i;
    const element = props.list[elementIndex];
    element["_stat"] = {
      position: elementIndex * props.itemSize,
      index: elementIndex,
    };
    renderedList.value.push(element);
  }
  for (let i = 0; i < renderAfter; i++) {
    let elementIndex = index + itemInView.value + i;
    const element = props.list[elementIndex];
    element["_stat"] = {
      position: elementIndex * props.itemSize,
      index: elementIndex,
    };
    renderedList.value.push(element);
  }
  //   renderedList.value = [...rendered];
  //   return rendered;
  //   console.log(renderedList.value);
  return `${renderAfter},${renderBefore}`;
};
watch(
  position,
  async () => {
    await nextTick();
    getRenderedList();
    // renderedList.value = [];
    // renderedList.value = [];
    // console.log(renderedList.value);
  },
  { immediate: true }
);
onMounted(() => {
  //   console.log(renderedList.value);
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
