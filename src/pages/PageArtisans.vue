<template>
  <page>
    <page-header>
      <template #title>Find Artisans & Groups</template>
    </page-header>
    <page-body>
      <div class="q-pt-lg q-pb-md q-pl-md q-pr-md text-brand">
        <!-- Dropdowns for filters -->
        <q-select
          v-model="selectedCraft"
          :options="craftOptions"
          label="Select Craft"
          filled
          clearable
        />
        <q-select
          v-model="selectedCounty"
          :options="countyOptions"
          label="Select County"
          filled
          clearable
        />
        <q-select
          v-model="selectedConstituency"
          :options="constituencyOptions"
          label="Select Constituency or Town"
          filled
          :disable="!selectedCounty"
          clearable
        />

        <!-- Tabs for switching between Artisans and Groups -->
        <q-tabs
          v-model="currentTab"
          class="q-my-md text-blue"
          dense
          active-color="positive"
          indicator-color="secondary"
          narrow-indicator
        >
          <q-tab name="artisans" label="Artisans" />
          <q-tab name="groups" label="Groups" />
        </q-tabs>

        <q-separator />

        <!-- Content based on the selected tab -->
        <div v-if="currentTab === 'artisans'">
          <!-- List of filtered artisans -->
          <div v-for="(artisan, index) in filteredArtisans" :key="index">
            <q-card class="q-mb-md" flat>
              <q-card-section class="col-8">
                <q-item-label>{{ artisan.name }}</q-item-label>
                <q-item-label>{{ artisan.craft }}</q-item-label>
                <q-item-label
                  >{{ artisan.county }} - {{ artisan.location }}</q-item-label
                >
                <!-- Add availability status and last job completion date -->
                <q-item-label>
                  Status:
                  <span
                    :class="
                      artisan.availabilityStatus === 'Available'
                        ? 'text-positive'
                        : 'text-negative'
                    "
                  >
                    {{ artisan.availabilityStatus }}
                  </span>
                </q-item-label>
                <q-item-label
                  >Last Job: {{ artisan.lastJobCompletionDate }}</q-item-label
                >

                <q-btn
                  v-if="artisan.showContact"
                  label="Hide Contact"
                  @click="revealContact(artisan)"
                  color="warning"
                  flat
                />
                <q-btn
                  v-else
                  label="Show Contact"
                  @click="revealContact(artisan)"
                  color="info"
                  flat
                />
                <div v-if="artisan.showContact">
                  <q-item-label>Phone: {{ artisan.phone }}</q-item-label>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <div v-else-if="currentTab === 'groups'">
          <!-- List of filtered groups -->
          <div v-for="(group, index) in filteredGroups" :key="index">
            <q-card class="q-mb-md" flat>
              <q-card-section class="col-8">
                <q-item-label>Group: {{ group.name }}</q-item-label>
                <q-item-label>Members: {{ group.members.length }}</q-item-label>
                <q-item-label>Location: {{ group.location }}</q-item-label>
                <!-- Add availability status and last job completion date -->
                <q-item-label>
                  Status:
                  <span
                    :class="
                      group.availabilityStatus === 'Available'
                        ? 'text-positive'
                        : 'text-negative'
                    "
                  >
                    {{ group.availabilityStatus }}
                  </span>
                </q-item-label>
                <q-item-label
                  >Last Job: {{ group.lastJobCompletionDate }}</q-item-label
                >

                <q-btn
                  v-if="group.showContact"
                  label="Hide Contact"
                  @click="revealGroupContact(group)"
                  color="primary"
                  flat
                />
                <q-btn
                  v-else
                  label="Show Contact"
                  @click="revealGroupContact(group)"
                  color="secondary"
                  flat
                />
                <div v-if="group.showContact">
                  <q-item-label>Phone: {{ group.contactPhone }}</q-item-label>
                </div>

                <!-- Render group members -->
                <q-btn
                  v-if="group.showMembers"
                  label="Hide Members"
                  @click="toggleMembers(group)"
                  color="primary"
                  flat
                />
                <q-btn
                  v-else
                  label="Show Members"
                  @click="toggleMembers(group)"
                  color="secondary"
                  flat
                />
                <div v-if="group.showMembers">
                  <!-- Render group members -->
                  <div
                    v-for="(member, memberIndex) in group.members"
                    :key="memberIndex"
                  >
                    <q-item-label>
                      Member {{ memberIndex + 1 }}: {{ member.fullName }} ({{
                        member.role
                      }})
                    </q-item-label>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </page-body>
  </page>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import store from "src/plumStore";

defineOptions({
  name: "PageArtisans",
});

const selectedCraft = ref("");
const selectedCounty = ref("");
const selectedConstituency = ref("");
const currentTab = ref("artisans");

const craftOptions = [
  { label: "Plumber", value: "Plumber" },
  { label: "Builder", value: "Builder" },
  { label: "Electrician", value: "Electrician" },
  { label: "Mechanic", value: "Mechanic" },
  { label: "Chef", value: "Chef" },
  { label: "Cleaner", value: "Cleaner" },
  { label: "Janitor", value: "Janitor" },
  { label: "Helper", value: "Helper" },
  { label: "Painter", value: "Painter" },
];

const countyOptions = computed(() =>
  store.state.locations.map((location) => ({
    label: location.name,
    value: location.name,
  })),
);

const constituencyOptions = ref([]);

watch(selectedCounty, (newVal) => {
  if (newVal) {
    const countyName = typeof newVal === "object" ? newVal.value : newVal;
    const selectedLocation = store.state.locations.find(
      (location) => location.name === countyName,
    );

    if (selectedLocation) {
      constituencyOptions.value = selectedLocation.constituencies.map(
        (constituency) => ({
          label: constituency,
          value: constituency,
        }),
      );
    } else {
      constituencyOptions.value = [];
    }
  } else {
    constituencyOptions.value = [];
  }
  selectedConstituency.value = "";
});

const filteredArtisans = computed(() => {
  return store.state.artisans.filter((artisan) => {
    const matchesCraft = selectedCraft.value
      ? artisan.craft === selectedCraft.value.value
      : true;
    const matchesCounty = selectedCounty.value
      ? artisan.county === selectedCounty.value.value
      : true;
    const matchesConstituency = selectedConstituency.value
      ? artisan.location === selectedConstituency.value.value
      : true;

    return matchesCraft && matchesCounty && matchesConstituency;
  });
});

const filteredGroups = computed(() => {
  return store.state.groups.filter((group) => {
    const matchesCounty = selectedCounty.value
      ? group.county === selectedCounty.value.value
      : true;
    const matchesConstituency = selectedConstituency.value
      ? group.location === selectedConstituency.value.value
      : true;

    return matchesCounty && matchesConstituency;
  });
});

function revealContact(artisan) {
  artisan.showContact = !artisan.showContact;
}

function revealGroupContact(group) {
  group.showContact = !group.showContact;
}

function toggleMembers(group) {
  group.showMembers = !group.showMembers;
}
</script>

<style scoped>
.availability-indicator {
  width: 10px;
  height: 100%;
  margin-right: 10px;
}
</style>
