<template>
  <page>
    <page-header>
      <template #title>PROFILE</template>
      <template v-if="isAuthenticated" #logout-button>
        <Logout-button label="logout" flat color="secondary" />
      </template>
    </page-header>
    <page-body>
      <div class="q-pt-lg q-pb-md q-pl-md q-pr-md">
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-sm-8">
            <q-list class="full-width">
              <q-item to="/profile/settings" clickable>
                <q-item-section avatar class="col-4">
                  <q-avatar color="primary" icon="eva-settings-2"></q-avatar>
                </q-item-section>
                <q-item-section class="col-4">
                  <q-item-label class="text-bold absolute-center"
                    >Settings</q-item-label
                  >
                </q-item-section>
                <q-item-section class="col-4">
                  <q-btn
                    to="/profile/settings"
                    class="absolute-right"
                    icon="eva-arrow-ios-forward-outline"
                    flat
                    dense
                    color="secondary"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
      <div class="page-body-spacer-footer"></div>
    </page-body>
  </page>
</template>

<script>
import { defineComponent } from "vue";
import Page from "src/components/PagePlumComponent/Page.vue";
import PageHeader from "src/components/PagePlumComponent/PageHeader.vue";
import LogoutButton from "src/auth/components/LogoutButton.vue";
import PageBody from "src/components/PagePlumComponent/PageBody.vue";
import { useAuthState } from "@vueauth/core";

export default defineComponent({
  components: {
    Page,
    PageHeader,
    PageBody,
    LogoutButton,
  },
  name: "PageProfile",
  setup() {
    const { isAuthenticated } = useAuthState();
    return { isAuthenticated };
  },
});
</script>
