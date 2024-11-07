<!-- src/pages/PageCreateGroup.vue -->
<template>
  <page>
    <page-header>
      <template #title> Create Group </template>
    </page-header>
    <page-body>
      <div class="constrain q-pt-lg q-pb-md q-pl-lg q-pr-lg">
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-sm-8">
            <!-- Group Creation Form -->
            <q-card class="q-mb-md">
              <q-card-section>
                <div class="text-gradient text-h6">Group Details</div>
              </q-card-section>
              <q-card-section>
                <q-form @submit="submitGroup">
                  <q-input v-model="groupName" label="Group Name" required />
                  <q-input
                    v-model="groupDescription"
                    label="Group Description"
                    type="textarea"
                    required
                  />
                  <q-select
                    v-model="groupType"
                    :options="groupTypeOptions"
                    label="Group Type"
                    required
                  />
                  <q-checkbox v-model="isPrivate" label="Private Group" />
                  <div class="q-mt-md">
                    <q-btn label="Create Group" type="submit" color="primary" />
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div class="page-body-spacer-footer"></div>
    </page-body>
  </page>
</template>

<script>
import { defineComponent, ref } from "vue";
import Page from "src/components/PagePlumComponent/Page.vue";
import PageHeader from "src/components/PagePlumComponent/PageHeader.vue";

export default defineComponent({
  components: { Page, PageHeader },
  name: "CreateGroup",
  setup() {
    const groupName = ref("");
    const groupDescription = ref("");
    const groupType = ref(null);
    const isPrivate = ref(false);

    const groupTypeOptions = [
      { label: "Open Group", value: "open" },
      { label: "Industry-Specific Group", value: "industry" },
      { label: "Private Group", value: "private" },
    ];

    const submitGroup = () => {
      // Logic to create group
    };

    return {
      groupName,
      groupDescription,
      groupType,
      groupTypeOptions,
      isPrivate,
      submitGroup,
    };
  },
});
</script>
