<!-- src/pages/Profile/PageThemes.vue -->
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
            <q-btn
              v-for="shade in theme.shades"
              :key="shade.name"
              @click="applyTheme(shade)"
              class="theme-btn"
              :style="{
                backgroundColor: shade.backgroundColor,
                color: shade.textColor,
              }"
            >
            </q-btn>
          </div>
        </div>
      </div>
      <div class="page-body-spacer-footer"></div>
    </page-body>
  </page>
</template>

<script>
import { ref, reactive } from "vue";
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

    return {
      themesList,
      applyTheme,
      backgroundClass,
      selectedTextColor,
    };
  },
};
</script>

<style scoped>
.grid-btn-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px; /* Space between buttons */
}

.theme-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px; /* Adjust height as needed */
  border-radius: 5px;
  font-size: 0.85em;
}

.theme-group {
  margin-bottom: 16px;
}

.theme-name {
  font-weight: bold;
  margin-bottom: 8px;
}
</style>
