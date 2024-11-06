<!-- src/pages/PageGroup.vue -->
<template>
  <page>
    <page-header>
      <template #title> Group Details </template>
    </page-header>
    <page-body>
      <div class="constrain q-pt-lg q-pb-md q-pl-lg q-pr-lg">
        <div class="row q-col-gutter-lg">
          <!-- Group Information -->
          <div class="col-12 col-sm-8">
            <q-card class="q-mb-md" flat>
              <q-card-section>
                <div class="text-gradient text-h6">Group Information</div>
              </q-card-section>
              <q-card-section>
                <div><strong>Name:</strong> {{ group.name }}</div>
                <div><strong>Description:</strong> {{ group.description }}</div>
                <div><strong>Type:</strong> {{ group.type }}</div>
                <div>
                  <strong>Privacy:</strong>
                  {{ group.isPrivate ? "Private" : "Public" }}
                </div>
              </q-card-section>
            </q-card>
          </div>
          <!-- Group Members -->
          <div class="col-12 col-sm-8">
            <q-card class="q-mb-md" flat>
              <q-card-section>
                <div class="text-gradient text-h6">Group Members</div>
              </q-card-section>
              <q-card-section>
                <div v-for="member in group.members" :key="member.id">
                  {{ member.name }}
                </div>
              </q-card-section>
            </q-card>
          </div>
          <!-- Recent Activities -->
          <div class="col-12 col-sm-8">
            <q-card class="q-mb-md" flat>
              <q-card-section>
                <div class="text-gradient text-h6">Recent Activities</div>
              </q-card-section>
              <q-card-section>
                <div v-for="activity in group.activities" :key="activity.id">
                  {{ activity.description }}
                </div>
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
import { defineComponent, ref, onMounted } from "vue";
import Page from "src/components/PagePlumComponent/Page.vue";
import PageHeader from "src/components/PagePlumComponent/PageHeader.vue";

export default defineComponent({
  components: { Page, PageHeader },
  name: "Group",
  setup() {
    const group = ref({
      name: "",
      description: "",
      type: "",
      isPrivate: false,
      members: [],
      activities: [],
    });

    const fetchGroupDetails = async () => {
      // Logic to fetch group details from the API
      // Example data for illustration purposes:
      group.value = {
        name: "Sample Group",
        description: "This is a sample group.",
        type: "Open Group",
        isPrivate: false,
        members: [
          { id: 1, name: "John Doe" },
          { id: 2, name: "Jane Smith" },
        ],
        activities: [
          { id: 1, description: "John Doe joined the group." },
          { id: 2, description: "Jane Smith posted a new message." },
        ],
      };
    };

    onMounted(() => {
      fetchGroupDetails();
    });

    return {
      group,
    };
  },
});
</script>
