<template>
  <page>
    <page-header>
      <template #title> PROFILE </template>
      <template #logout-button v-if="isAuthenticated">
        <LogoutButton label="logout" flat color="secondary" />
      </template>
    </page-header>
    <page-body>
      <div class="q-pt-lg q-pb-md q-pl-md q-pr-md">
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-sm-8">
            <q-card class="q-mb-md" flat v-if="isAuthenticated">
              <q-card-section>
                <div class="text-h6">Profile Details</div>
              </q-card-section>
              <q-card-section>
                <q-form @submit="updateProfile">
                  <q-input v-model="profile.displayName" label="Display Name" />
                  <q-input v-model="profile.username" label="Username" />
                  <q-input v-model="profile.email" label="Email" disable />
                  <q-select
                    v-model="profile.jobCategory"
                    :options="craftOptions"
                    label="Craft"
                    filled
                    clearable
                  />
                  <q-input
                    v-model="profile.availability"
                    label="Availability"
                    type="text"
                  />
                  <q-btn
                    type="submit"
                    label="Update Profile"
                    color="secondary"
                    class="q-mt-md"
                    outline=""
                  />
                </q-form>
              </q-card-section>
            </q-card>

            <q-list class="full-width">
              <q-item to="/profile/settings" clickable>
                <q-item-section avatar class="col-4">
                  <q-avatar color="primary" icon="eva-settings-2"></q-avatar>
                </q-item-section>
                <q-item-section class="col-4">
                  <q-item-label class="text-bold absolute-center">
                    Settings
                  </q-item-label>
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
// src/pages/Profile/PageProfile.vue
import { defineComponent, ref, onMounted, computed } from "vue";
import Page from "src/components/PagePlumComponent/Page.vue";
import PageHeader from "src/components/PagePlumComponent/PageHeader.vue";
import LogoutButton from "src/auth/components/LogoutButton.vue";
import PageBody from "src/components/PagePlumComponent/PageBody.vue";
import { usePlumAuthState } from "src/auth/composables/usePlumAuthState";
import {
  getUserProfile,
  updateUserProfile,
} from "src/services/profileServices";
import store from "src/plumStore";

export default defineComponent({
  components: {
    Page,
    PageHeader,
    PageBody,
    LogoutButton,
  },
  setup() {
    const { isAuthenticated, user } = usePlumAuthState();

    const profile = ref(store.state.user);

    const craftOptions = computed(() => store.state.craftOptions);

    const fetchProfile = async () => {
      if (user.value) {
        try {
          const userProfile = await getUserProfile(user.value.id);
          profile.value = userProfile;
          store.setUserDetails(userProfile);
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        }
      }
    };

    const updateProfile = async () => {
      if (user.value) {
        try {
          await updateUserProfile(user.value.id, profile.value);
          store.setUserDetails(profile.value);
          console.log("Profile updated:", profile.value);
        } catch (error) {
          console.error("Error updating profile:", error);
        }
      }
    };

    onMounted(fetchProfile);

    console.log("isAuthenticated:", isAuthenticated.value);

    return {
      isAuthenticated,
      profile,
      craftOptions,
      updateProfile,
    };
  },
  name: "PageProfile",
});
</script>
