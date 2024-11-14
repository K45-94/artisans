<!--src/pages/Profile/PageSupportPlumArtisans.vue-->
<template>
  <page>
    <page-header>
      <template #button-left>
        <page-header-button-back-left label="settings" />
      </template>
      <template #title>ABOUT PLUM ARTISANS</template>
    </page-header>
    <page-body>
      <div class="q-pt-lg q-pb-md q-pl-lg q-pr-lg">
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-sm-8">
            <div class="text-left q-mb-md">
              <h3 class="text-caption text-weight-bold text-uppercase">
                A Platform for Local Craftsmanship and Expertise
              </h3>
              <p class="text-weight-light">
                Plum Artisans was born from the vision of connecting skilled
                artisans with the people who need their services. Whether you
                are looking for a Plumber, Electrician, Chef, Carpenter, or any
                other skilled craftsperson, Plum Artisans is here to make the
                process easy and reliable.
              </p>
            </div>

            <div class="text-left q-mb-md">
              <h4 class="text-caption text-weight-bold">Our Mission</h4>
              <p class="text-weight-light">
                To empower local artisans by giving them a platform to connect
                with clients and grow their businesses. Our mission is to bridge
                the gap between quality service providers and those who need
                them.
              </p>
            </div>

            <div class="text-left q-mb-md">
              <h4 class="text-caption text-weight-bold">What We Offer</h4>
              <ul class="q-pl-md">
                <li class="text-weight-light">
                  Comprehensive Artisan Listings
                </li>
                <li class="text-weight-light">Trusted Professionals</li>
                <li class="text-weight-light">Direct Contact</li>
                <li class="text-weight-light">User-Friendly Experience</li>
              </ul>
              <p class="text-weight-light">
                Our commitment is to promote local talent and encourage quality
                craftsmanship. Every user joins us in the journey to support
                artisans and enhance the local community.
              </p>
            </div>

            <div class="text-left q-mb-md">
              <h4 class="text-caption text-weight-bold">
                Ways You Can Support
              </h4>
              <ol class="q-pl-md">
                <li class="text-weight-bold">Hire an Artisan.</li>
                <li class="text-weight-bold">
                  Share their work on various platforms.
                </li>
              </ol>
            </div>

            <!-- Definitions Section -->
            <div class="text-left q-mb-md">
              <h4 class="text-caption text-weight-bold">Definitions</h4>
              <p class="text-weight-light">
                <strong>Helper:</strong> An individual ready to assist with a
                wide array of activities such as housing-movement services or
                looking for an apartment assistance.
              </p>
            </div>

            <!-- Create Shop Button -->
            <q-btn
              v-if="isLoggedIn"
              label="Create Shop"
              color="secondary"
              class="full-width"
              flat
              to="/profile/settings/supportplumartisans/agentapp"
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
import { defineComponent, ref, watch } from "vue";
import Page from "src/components/PagePlumComponent/Page.vue";
import PageHeader from "src/components/PagePlumComponent/PageHeader.vue";
import PageHeaderButtonBackLeft from "src/components/PagePlumComponent/PageHeaderButtonBackLeft.vue";
import { useAuthState } from "@vueauth/core";

export default defineComponent({
  name: "SupportPlumArtisans",
  components: {
    Page,
    PageHeader,
    PageHeaderButtonBackLeft,
  },
  setup() {
    const { isAuthenticated } = useAuthState();
    const isLoggedIn = ref(isAuthenticated.value);

    // Watch for changes in authentication state
    watch(isAuthenticated, (newVal) => {
      isLoggedIn.value = newVal;
    });

    return {
      isLoggedIn,
    };
  },
});
</script>
