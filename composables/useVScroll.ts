import { WritableComputedRef } from "vue";

export const useVScroll = (
  el: Ref<HTMLElement>,
  list = [],
  {
    itemSize = 32,
    overscan = 40,
    position = undefined,
  }: {
    itemSize?: number;
    overscan?: number;
    position?: Ref<number>;
  } = {}
) => {
  const scrollerSize = computed(() => {
    return props.itemSize * props.list.length;
  });

  const { height: containerH } = useElementBounding(el);
  const itemInView: any = computed(() => {
    return Math.ceil(containerH.value / props.itemSize);
  });
  const { x, y, isScrolling, arrivedState, directions } = useScroll(el);

  // onMounted(() => {
  position = position ?? y;
  // });
  // let positionRef = ref();
  // if (position) positionRef = position;

  const renderedList: Ref = ref([]);

  // const positionRef = computed({
  //   get() {
  //     return y.value;
  //   },
  //   set(val) {
  //     y.value = Number.parseFloat(val);
  //   },
  // });
  // watch(
  //   y,
  //   () => {
  //     console.log(y.value, positionRef);
  //     if (!position) {
  //       positionRef.value = y.value;
  //       console.log(y.value, positionRef.value);
  //     }
  //   },
  //   { immediate: true }
  // );
  watch(
    position,
    async () => {
      console.log("run");
      await nextTick();
      if (!position) return;
      renderedList.value = useGetRenderedList(props, scrollerSize, position);
    },
    { immediate: true }
  );
  let props = { list, itemSize, overscan, itemInView };
  return renderedList;
};

export const useGetRenderedList = (
  props: any,
  scrollerSize: Ref<number>,
  position: Ref<number> | WritableComputedRef<number>
) => {
  const renderedList = [];
  const { list, overscan, itemSize, itemInView } = props;
  const listLength = list.length;
  const scrollPosition = scrollerSize.value - position.value;

  if (listLength <= itemInView.value + overscan * 2) {
    for (let index = 0; index < listLength; index++) {
      const element = { ...list[index] };
      element._stat = {
        position: index * itemSize,
        index,
      };
      renderedList.push(element);
    }
  } else {
    const lastIndex = Math.floor(listLength - scrollPosition / itemSize);
    const before = lastIndex - overscan;
    const after = listLength - (lastIndex + itemInView.value) - overscan;

    const renderBefore = before < 0 ? overscan - Math.abs(before) : overscan;
    const renderAfter = after < 0 ? overscan - Math.abs(after) : overscan;

    const renderArr = [renderBefore, itemInView.value, renderAfter];
    for (let Ri = 0; Ri < renderArr.length; Ri++) {
      let itemLength = renderArr[Ri];
      for (let i = 0; i < itemLength; i++) {
        const elementIndexArr = [
          lastIndex - (i + 1),
          lastIndex + i,
          lastIndex + itemInView.value + i,
        ];
        const elementIndex = elementIndexArr[Ri];
        const element = { ...list[elementIndex] };

        element._stat = {
          position: elementIndex * itemSize,
          index: elementIndex,
        };
        renderedList.push(element);
      }
    }
  }
  return renderedList;
};
