<template>
  <page>
    <page-header>
      <template #title>PROFILE</template>

      <template #logout-button v-if="isAuthenticated">
        <LogoutButton label="logout" flat />
      </template>
    </page-header>
    <page-body>
      <div class="q-pt-lg q-pb-md q-pl-md q-pr-md">
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-sm-8">
            <q-list class="full-width" v-if="isAuthenticated">
              <q-item clickable @click="toggleProfileDetails">
                <q-item-section avatar class="col-4">
                  <q-avatar icon="eva-person-outline"></q-avatar>
                </q-item-section>
                <q-item-section class="col-4">
                  <q-item-label class="text-bold absolute-center">
                    Profile Details
                  </q-item-label>
                </q-item-section>
                <q-item-section class="col-4">
                  <q-btn
                    class="absolute-right"
                    :icon="
                      profileDetailsVisible
                        ? 'eva-arrow-ios-downward-outline'
                        : 'eva-arrow-ios-forward-outline'
                    "
                    flat
                    dense
                    color="secondary"
                  />
                </q-item-section>
              </q-item>
            </q-list>
            <q-list class="full-width" v-if="!isAuthenticated">
              <q-item clickable :to="{ name: 'auth.login' }">
                <q-item-section avatar class="col-4">
                  <q-avatar icon="eva-person-outline"></q-avatar>
                </q-item-section>
                <q-item-section class="col-4">
                  <q-item-label class="text-bold absolute-center">
                    Login
                  </q-item-label>
                </q-item-section>
                <q-item-section class="col-4">
                  <q-btn
                    class="absolute-right"
                    :icon="
                      profileDetailsVisible
                        ? 'eva-arrow-ios-downward-outline'
                        : 'eva-arrow-ios-forward-outline'
                    "
                    flat
                    dense
                    color="secondary"
                    :to="{ name: 'auth.login' }"
                  />
                </q-item-section>
              </q-item>
            </q-list>
            <q-card
              class="q-mb-md"
              flat
              v-if="isAuthenticated && profileDetailsVisible"
            >
              <q-card-section>
                <q-form @submit.prevent="updateProfile">
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
                    class="q-mt-md"
                  />
                  <q-btn type="submit" label="Update Profile" class="q-mt-md" />
                </q-form>
              </q-card-section>
            </q-card>

            <q-list class="full-width">
              <q-item to="/profile/settings" clickable>
                <q-item-section avatar class="col-4">
                  <q-avatar icon="eva-settings-2"></q-avatar>
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
              <q-item to="/profile/payments" clickable>
                <q-item-section avatar class="col-4">
                  <q-avatar icon="eva-credit-card-outline"></q-avatar>
                </q-item-section>
                <q-item-section class="col-4">
                  <q-item-label class="text-bold absolute-center">
                    Payments
                  </q-item-label>
                </q-item-section>
                <q-item-section class="col-4">
                  <q-btn
                    to="/profile/payments"
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
import { defineComponent, ref, computed } from "vue";
import { Notify } from "quasar";
import Page from "src/components/PagePlumComponent/Page.vue";
import PageHeader from "src/components/PagePlumComponent/PageHeader.vue";
import PageBody from "src/components/PagePlumComponent/PageBody.vue";
import LogoutButton from "src/auth/components/LogoutButton.vue";
import { usePlumAuthState } from "src/auth/composables/usePlumAuthState";
import store from "src/plumStore";

export default defineComponent({
  components: {
    Page,
    PageHeader,
    PageBody,
    LogoutButton,
  },
  setup() {
    const { isAuthenticated, isShopOwner } = usePlumAuthState();

    // Use a deep copy to avoid directly mutating the state
    const profile = ref({ ...store.state.user });

    const craftOptions = computed(() => store.state.craftOptions);
    const profileDetailsVisible = ref(false);

    const toggleProfileDetails = () => {
      profileDetailsVisible.value = !profileDetailsVisible.value;
    };

    const updateProfile = async () => {
      try {
        // Logic to update profile in the store
        store.setUserDetails(profile.value);
        console.log("Profile updated:", profile.value);
        Notify.create({
          type: "positive",
          message: "Profile updated successfully!",
        });
        // TODO: Add logic to update profile in the backend (e.g., Supabase)
      } catch (error) {
        console.error("Failed to update profile:", error);
        Notify.create({
          type: "negative",
          message: "Failed to update profile. Please try again.",
        });
      }
    };

    console.log("isAuthenticated:", isAuthenticated.value);
    console.log("isShopOwner:", isShopOwner.value);

    return {
      isAuthenticated,
      isShopOwner,
      profile,
      craftOptions,
      profileDetailsVisible,
      toggleProfileDetails,
      updateProfile,
    };
  },
  name: "PageProfile",
});
</script>
