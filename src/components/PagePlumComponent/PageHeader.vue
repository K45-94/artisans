<!-- src/components/PagePlumComponent/PageHeader.vue -->
<template>
  <header
    :class="[
      'page-header q-header q-layout__section',
      { 'fixed-top': !isScrolling, 'hide-header': isScrolling },
    ]"
  >
    <div class="q-toolbar row no-wrap items-center">
      <slot name="button-left" class="text-gradient" />
      <div
        class="page-header-title q-toolbar__title ellipsis q-pl-none q-ml-md text-weight-light text-center text-body1"
      >
        <span class="q-pa-md text-gradient">
          <slot name="title" />
        </span>
      </div>
      <slot name="button-right" />
      <div class="logout-button text-gradient">
        <slot name="logout-button"></slot>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "PageHeader",

  data() {
    return {
      isScrolling: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolling = window.scrollY > 0;
    },
  },
};
</script>

<style lang="scss">
.hide-header {
  transform: translateY(-100%);

  opacity: 0;
  transition: opacity 0.3s ease;
}
</style>
