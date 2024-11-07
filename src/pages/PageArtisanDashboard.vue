<!--src/pages/PageArtisanDashboard.vue-->
<template>
  <page>
    <page-header>
      <template #title> Artisan Dashboard </template>
    </page-header>
    <page-body>
      <div class="constrain q-pt-lg q-pb-md q-pl-lg q-pr-lg">
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-sm-8">
            <!-- Upcoming Jobs -->
            <div class="col-12 col-sm-8">
              <q-card class="q-mb-md">
                <q-card-section>
                  <div class="text-gradient text-h6">Upcoming Jobs</div>
                </q-card-section>
                <q-card-section>
                  <div>List of upcoming jobs will be displayed here.</div>
                </q-card-section>
              </q-card>
            </div>
            <!-- Recent Notifications -->
            <div class="col-12 col-sm-4">
              <q-card class="q-mb-md">
                <q-card-section>
                  <div class="text-h6">Recent Notifications</div>
                </q-card-section>
                <q-card-section>
                  <div>Recent notifications will be displayed here.</div>
                </q-card-section>
              </q-card>
            </div>
            <!-- Quick Actions -->
            <div class="col-12">
              <q-card class="q-mb-md">
                <q-card-section>
                  <div class="text-h6">Quick Actions</div>
                </q-card-section>
                <q-card-section>
                  <q-btn label="Create Job" color="primary" class="q-mr-sm" />
                  <q-btn label="View Groups" color="secondary" />
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
import { defineComponent } from "vue";

export default defineComponent({
  components: [Page, PageHeader, PageHeaderButtonBackLeft],
  name: "ArtisanDashboard",
});
</script>
