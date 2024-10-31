<template>
  <page :class="backgroundClass">
    <page-header>
      <template #button-left>
        <page-header-button-back-left label="settings" />
      </template>
      <template #title>Theme switcher</template>
    </page-header>
    <page-body>
      <div
        class="q-pt-lg q-pb-md q-pl-lg q-pr-lg"
        :style="{ color: selectedTextColor }"
      >
        <div class="grid-btn-group">
          <q-btn
            v-for="theme in themesList"
            :key="theme.name"
            @click="applyTheme(theme)"
            class="theme-btn"
            :style="{
              backgroundColor: theme.backgroundColor,
              color: theme.textColor,
            }"
          ></q-btn>
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

    const themesList = reactive([
      {
        name: "Bright Green",
        backgroundColor: "#b2ff66",
        textColor: "#000000",
      },
      { name: "Dark Green", backgroundColor: "#005500", textColor: "#db2777" },
      { name: "Bright Blue", backgroundColor: "#66b3ff", textColor: "#000000" },
      { name: "Dark Blue", backgroundColor: "#000055", textColor: "#ffffff" },
      { name: "Bright Red", backgroundColor: "#ff6666", textColor: "#000000" },
      { name: "Dark Red", backgroundColor: "#550000", textColor: "#ffffff" },
      {
        name: "Bright Yellow",
        backgroundColor: "#ffff66",
        textColor: "#000000",
      },
    ]);

    const applyTheme = (theme) => {
      backgroundClass.value = theme.name.toLowerCase().replace(/ /g, "-");
      selectedTextColor.value = theme.textColor;
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
}
</style>
