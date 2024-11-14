<!--src/pages/Profile/PageAgentApplicationForm.vue-->
<template>
  <page>
    <page-header>
      <template #button-left>
        <page-header-button-back-left label="back" />
      </template>
      <template #title>AGENT APPLICATION</template>
    </page-header>
    <page-body>
      <div class="q-pt-lg q-pb-md q-pl-lg q-pr-lg">
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-sm-8">
            <div class="text-left q-mb-md">
              <h3 class="text-caption text-weight-bold text-uppercase">
                Apply to Open a Shop
              </h3>
            </div>

            <q-form @submit="handleSubmit" class="q-mb-md">
              <q-input
                v-model="form.name"
                label="Name of the Agent"
                outlined
                class="q-mb-md"
                :rules="[(val) => !!val || 'Name is required']"
              />
              <q-input
                v-model="form.email"
                label="Email"
                type="email"
                outlined
                class="q-mb-md"
                :rules="[(val) => !!val || 'Email is required']"
              />
              <q-input
                v-model="form.phone"
                label="Phone Number"
                type="tel"
                outlined
                class="q-mb-md"
                :rules="[(val) => !!val || 'Phone number is required']"
              />
              <q-input
                v-model="form.address"
                label="Address"
                outlined
                class="q-mb-md"
                :rules="[(val) => !!val || 'Address is required']"
              />
              <q-input
                v-model="form.shopLocation"
                label="Proposed Shop Location"
                outlined
                class="q-mb-md"
                :rules="[(val) => !!val || 'Shop location is required']"
              />
              <q-input
                v-model="form.servicesOffered"
                label="Services Offered"
                outlined
                class="q-mb-md"
                :rules="[(val) => !!val || 'Services offered is required']"
              />
              <q-file
                v-model="form.documents"
                label="Upload Relevant Documents"
                outlined
                multiple
                class="q-mb-md"
              />
              <q-checkbox
                v-model="form.assignCurrentUser"
                label="Assign me as an employee"
                class="q-mb-md"
              />
              <q-btn
                label="Submit Application"
                type="submit"
                color="secondary"
                outline
                class="full-width"
              />
            </q-form>
          </div>
        </div>
      </div>
      <div class="page-body-spacer-footer"></div>
    </page-body>
  </page>
</template>

<script>
import { defineComponent, reactive } from "vue";
import Page from "src/components/PagePlumComponent/Page.vue";
import PageHeader from "src/components/PagePlumComponent/PageHeader.vue";
import PageHeaderButtonBackLeft from "src/components/PagePlumComponent/PageHeaderButtonBackLeft.vue";
import PageBody from "src/components/PagePlumComponent/PageBody.vue";
import { useQuasar } from "quasar";
import store from "src/plumStore";

export default defineComponent({
  components: { Page, PageHeader, PageHeaderButtonBackLeft, PageBody },
  name: "PageAgentApplicationForm",
  setup() {
    const $q = useQuasar();
    const form = reactive({
      name: "",
      email: "",
      phone: "",
      address: "",
      shopLocation: "",
      servicesOffered: "",
      documents: [],
      assignCurrentUser: false,
    });

    const handleSubmit = () => {
      if (!$q.validateForm(form)) {
        $q.notify({
          type: "negative",
          message: "Please fill out all required fields.",
        });
        return;
      }

      // Process the form submission logic here
      console.log("Form submitted:", form);

      if (form.assignCurrentUser) {
        // Assign the current user as an employee
        store.assignCurrentUserToShop(form.name);
      }
    };

    return {
      form,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
.q-mb-md {
  margin-bottom: 1rem;
}
.full-width {
  width: 100%;
}
</style>
