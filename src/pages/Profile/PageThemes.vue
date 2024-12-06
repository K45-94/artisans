<!--src\pages\Profile\PageThemes.vue-->
<template>
  <page :class="backgroundClass">
    <page-header>
      <template #button-left>
        <page-header-button-back-left label="settings" />
      </template>
      <template #title>Theme Switcher</template>
    </page-header>
    <page-body>
      <div
        class="q-pt-lg q-pb-md q-pl-lg q-pr-lg"
        :style="{ color: selectedTextColor }"
      >
        <div v-for="theme in themesList" :key="theme.name" class="theme-group">
          <div class="theme-name">{{ theme.name }}</div>
          <div class="grid-btn-group">
            <div
              v-for="shade in theme.shades"
              :key="shade.name"
              class="theme-preview"
              :style="{
                backgroundColor: shade.backgroundColor,
                color: shade.textColor,
              }"
              :class="{ 'current-theme': isCurrentTheme(shade) }"
              @click="applyTheme(shade)"
            >
              <span class="preview-text">Sample Text</span>
            </div>
          </div>
        </div>
      </div>
      <div class="page-body-spacer-footer"></div>
    </page-body>
  </page>
</template>

<script>
import { ref, reactive, computed } from "vue";
import Page from "src/components/PagePlumComponent/Page.vue";
import PageHeader from "src/components/PagePlumComponent/PageHeader.vue";
import PageHeaderButtonBackLeft from "src/components/PagePlumComponent/PageHeaderButtonBackLeft.vue";
import store from "src/plumStore";

export default {
  components: {
    Page,
    PageHeader,
    PageHeaderButtonBackLeft,
  },
  name: "PageThemes",
  setup() {
    const backgroundClass = ref("");
    const selectedTextColor = ref(store.state.textColor);

    // Define themes with multiple shades for each base color
    const themesList = reactive([
      {
        name: "Green",
        shades: [
          {
            name: "Bright Green",
            backgroundColor: "#b2ff66",
            textColor: "#000000",
          },
          {
            name: "Dark Green",
            backgroundColor: "#005500",
            textColor: "#db2777",
          },
        ],
      },
      {
        name: "Blue",
        shades: [
          {
            name: "Bright Blue",
            backgroundColor: "#66b3ff",
            textColor: "#000000",
          },
          {
            name: "Dark Blue",
            backgroundColor: "#000055",
            textColor: "#ffffff",
          },
        ],
      },
      {
        name: "Red",
        shades: [
          {
            name: "Bright Red",
            backgroundColor: "#ff6666",
            textColor: "#000000",
          },
          {
            name: "Dark Red",
            backgroundColor: "#550000",
            textColor: "#ffffff",
          },
        ],
      },
      {
        name: "Yellow",
        shades: [
          {
            name: "Bright Yellow",
            backgroundColor: "#ffff66",
            textColor: "#000000",
          },
        ],
      },
      {
        name: "White",
        shades: [
          {
            name: "Bright White",
            backgroundColor: "#ffffff",
            textColor: "#000000",
          },
        ],
      },
    ]);

    const applyTheme = (shade) => {
      backgroundClass.value = shade.name.toLowerCase().replace(/ /g, "-");
      selectedTextColor.value = shade.textColor;
      store.state.theme = backgroundClass.value;
      store.state.textColor = selectedTextColor.value;
    };

    const isCurrentTheme = (shade) => {
      return shade.name.toLowerCase().replace(/ /g, "-") === store.state.theme;
    };

    return {
      themesList,
      applyTheme,
      backgroundClass,
      selectedTextColor,
      isCurrentTheme,
    };
  },
};
</script>

<style scoped>
.grid-btn-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px; /* Space between buttons */
}

.theme-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px; /* Increase height for better preview */
  border-radius: 5px;
  font-size: 0.85em;
  cursor: pointer;
  border: 2px solid transparent; /* Default border */
}

.current-theme {
  border: 2px solid #333; /* Highlight for current theme */
  opacity: 0.9; /* Slightly transparent for visual cue */
}

.theme-group {
  margin-bottom: 16px;
}

.theme-name {
  font-weight: bold;
  margin-bottom: 8px;
}

.preview-text {
  font-family: Arial, sans-serif; /* Example font for better readability */
}
</style>
