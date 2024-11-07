<!-- src/pages/PageJob.vue -->
<template>
  <page>
    <page-header>
      <template #title> Job Details </template>
    </page-header>
    <page-body>
      <div class="constrain q-pt-lg q-pb-md q-pl-lg q-pr-lg">
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-sm-8">
            <!-- Job Details -->
            <q-card class="q-mb-md">
              <q-card-section>
                <div class="text-h6">Job Information</div>
              </q-card-section>
              <q-card-section>
                <div>Job Title: {{ jobTitle }}</div>
                <div>Job Description: {{ jobDescription }}</div>
                <div>Required Skills: {{ jobSkills }}</div>
                <div>Hours: {{ jobHours }}</div>
                <div>Pay Rate: {{ jobPayRate }}</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 col-sm-4">
            <!-- Actions -->
            <q-card class="q-mb-md">
              <q-card-section>
                <div class="text-h6">Actions</div>
              </q-card-section>
              <q-card-section>
                <q-btn label="Apply Now" color="primary" class="q-mr-sm" />
                <q-btn label="Save Job" color="secondary" />
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
import Page from "src/components/PagePlumComponent/Page.vue";
import PageHeader from "src/components/PagePlumComponent/PageHeader.vue";
import PageHeaderButtonBackLeft from "src/components/PagePlumComponent/PageHeaderButtonBackLeft.vue";
import { ref, defineComponent } from "vue";

export default defineComponent({
  components: [Page, PageHeader, PageHeaderButtonBackLeft],
  name: "JobDetails",
  setup() {
    // These are placeholders. Replace them with actual data fetching logic.
    const jobTitle = ref("Sample Job Title");
    const jobDescription = ref("Sample Job Description");
    const jobSkills = ref("Sample Skills");
    const jobHours = ref(40);
    const jobPayRate = ref(50);

    return {
      jobTitle,
      jobDescription,
      jobSkills,
      jobHours,
      jobPayRate,
    };
  },
});
</script>
