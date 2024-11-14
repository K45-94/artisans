<!-- src/components/PagePlumComponent/PageHeaderButtonBackLeft.vue -->
<template>
  <q-btn
    @click="useGoBack"
    icon="chevron_left"
    flat
    rounded
    dense
    no-caps
    class="text-gradient"
  />
</template>

<script>
import useGoBack from "src/use/useGoBack";
export default {
  name: "PageHeaderButtonBackLeft",
  setup() {
    return {
      useGoBack,
    };
  },
};
</script>
