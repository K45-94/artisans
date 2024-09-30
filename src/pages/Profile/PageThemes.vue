<template>
  <page :class="backgroundClass">
    <page-header>
      <template #button-left>
        <page-header-button-back-left label="settings" />
      </template>
      <template #title>Theme switcher</template>
    </page-header>
    <page-body>
      <div class="q-pt-lg q-pb-md q-pl-lg q-pr-lg">
        <div class="q-col-gutter-lg" :style="{ color: selectedTextColor }">
          <div>
            <p>Change background colour</p>
            <q-option-group
              type="radio"
              v-model="themes"
              :options="select"
              color="secondary"
            />
            <q-space />
            <q-option-group
              type="radio"
              v-model="selectedTextColor"
              :options="
                currentTextColorOptions.map((color) => ({
                  label: color,
                  value: color,
                }))
              "
              color="secondary"
            />
          </div>
        </div>
      </div>
      <div class="page-body-spacer-footer"></div>
    </page-body>
  </page>
</template>

<script>
import { ref, computed, watch, defineComponent } from "vue";
import { QOptionGroup, QSlider, QSpace, QIcon } from "quasar";
import Page from "src/components/PagePlumComponent/Page.vue";
import PageHeader from "src/components/PagePlumComponent/PageHeader.vue";
import PageHeaderButtonBackLeft from "src/components/PagePlumComponent/PageHeaderButtonBackLeft.vue";
import store from "src/plumStore";

export default defineComponent({
  components: {
    Page,
    PageHeader,
    PageHeaderButtonBackLeft,
    QOptionGroup,
  },
  name: "PageThemes",
  setup() {
    const themes = ref("op1");
    const backgroundClass = ref("");
    const textModel = ref(2); // Default to medium size
    const fontWeightModel = ref(2);
    const selectedTextColor = ref(store.state.textColor);

    const select = [
      { label: "Bright background", value: "op1" },
      { label: "Dark background", value: "op3" },
    ];

    const currentTextColorOptions = computed(() => {
      return store.state.textColorOptions[backgroundClass.value] || [];
    });

    // Watch for changes in themes and update the background class and text color options
    watch(themes, (newVal) => {
      if (newVal === "op1") {
        backgroundClass.value = "bright-background";
        store.state.theme = "bright-background";
      } else if (newVal === "op3") {
        backgroundClass.value = "dark-background";
        store.state.theme = "dark-background";
      }
      selectedTextColor.value = currentTextColorOptions.value[0];
      store.state.textColor = selectedTextColor.value;
    });

    // Watcher for selectedTextColor to update the store
    watch(selectedTextColor, (newColor) => {
      store.state.textColor = newColor;
    });

    // Watcher for textModel to adjust text size
    watch(textModel, (newSize) => {
      const sizeClasses = ["sm", "md", "lg", "xl"];
      const sizeClass = sizeClasses[newSize] || "md"; // Default to 'md'
      document.documentElement.setAttribute("data-text-sizes", sizeClass);
    });

    return {
      themes,
      select,
      textModel,
      fontWeightModel,
      backgroundClass,
      selectedTextColor,
      currentTextColorOptions,
    };
  },
});
</script>

<style scoped>
.q-radio {
  margin-right: 10px;
}
</style>
