<template>
  <div class="bg-red flex flex-center">
    <f-v-scroll
      :list="arr"
      v-slot="{ item, index, topIndex }"
      style="height: 450px; width: 100px"
    >
      <!-- <q-btn color="primary" icon="check" :label="index" v-for="n in 1" style="width: 150px;"/> -->
      <div class="flex" style="width: 150px">{{ item.name }} {{ index }}</div>
    </f-v-scroll>
  </div>
</template>

<script setup>
const arr = Array.from(Array(100559).keys(), (x) => {
  return { name: x + 1 };
});
</script>

<style scoped></style>
