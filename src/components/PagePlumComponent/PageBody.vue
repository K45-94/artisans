<!-- src/components/PagePlumComponent/PageBody.vue -->
<template>
  <q-scroll-area
    class="page-body absolute-top fit constrain small-screen-only"
    :class="textColorClass"
  >
    <div class="page-body-spacer-header"></div>
    <slot></slot>
  </q-scroll-area>
</template>

<script>
import { computed } from "vue";
import store from "src/plumStore";

export default {
  name: "PageBody",
  setup() {
    const textColorClass = computed(() => store.state.textColor);
    return { textColorClass };
  },
};
</script>
