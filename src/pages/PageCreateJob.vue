<!-- src/pages/PageCreateJob.vue -->
<template>
  <page>
    <page-header>
      <template #title> Create Job </template>
    </page-header>
    <page-body>
      <div class="constrain q-pt-lg q-pb-md q-pl-lg q-pr-lg">
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-sm-8">
            <!-- Job Creation Form -->
            <div class="col-12">
              <q-card class="q-mb-md">
                <q-card-section>
                  <div class="text-gradient text-h6">Job Details</div>
                </q-card-section>
                <q-card-section>
                  <q-form @submit="submitJob">
                    <q-input v-model="jobTitle" label="Job Title" required />
                    <q-input
                      v-model="jobDescription"
                      label="Job Description"
                      type="textarea"
                      required
                    />
                    <q-input
                      v-model="jobSkills"
                      label="Required Skills"
                      required
                    />
                    <q-input
                      v-model="jobHours"
                      label="Hours"
                      type="number"
                      required
                    />
                    <q-input
                      v-model="jobPayRate"
                      label="Pay Rate"
                      type="number"
                      required
                    />
                    <div class="q-mt-md">
                      <q-btn label="Submit" type="submit" color="primary" />
                    </div>
                  </q-form>
                </q-card-section>
              </q-card>
            </div>
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
  name: "CreateJob",
  setup() {
    const jobTitle = ref("");
    const jobDescription = ref("");
    const jobSkills = ref("");
    const jobHours = ref("");
    const jobPayRate = ref("");

    const submitJob = () => {
      // Logic to submit job details
    };

    return {
      jobTitle,
      jobDescription,
      jobSkills,
      jobHours,
      jobPayRate,
      submitJob,
    };
  },
});
</script>
