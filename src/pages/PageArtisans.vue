<template>
  <page>
    <page-header>
      <template #title>Find Artisans</template>
    </page-header>
    <page-body>
      <div class="q-pt-lg q-pb-md q-pl-md q-pr-md">
        <!-- Search Bar -->
        <q-input v-model="searchTerm" label="Search..." filled clearable />

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

        <!-- Tabs for switching between Artisans, Groups, and Shops -->
        <q-tabs
          v-model="currentTab"
          class="q-my-md"
          dense
          indicator-color="secondary"
          narrow-indicator
        >
          <q-tab name="artisans" label="Artisans" />
          <q-tab name="groups" label="Groups" />
          <q-tab name="shops" label="Shops" v-if="isAuthenticated" />
        </q-tabs>

        <q-separator />

        <!-- Loading State -->
        <q-spinner v-if="loading" size="50px" />

        <!-- Content based on the selected tab -->
        <div v-else>
          <div v-if="currentTab === 'artisans'">
            <div v-for="(artisan, index) in filteredArtisans" :key="index">
              <q-card class="q-mb-md" flat>
                <q-card-section class="col-8">
                  <q-item-label>{{ artisan.name }}</q-item-label>
                  <q-item-label>{{ artisan.craft }}</q-item-label>
                  <q-item-label v-if="isAuthenticated">
                    {{ artisan.county }} - {{ artisan.location }}
                  </q-item-label>
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
                  <q-item-label>
                    Last Job: {{ artisan.lastJobCompletionDate }}
                  </q-item-label>

                  <q-btn
                    v-if="artisan.showContact && isAuthenticated"
                    label="Hide Contact"
                    @click="revealContact(artisan)"
                    color="info"
                    flat
                  />
                  <q-btn
                    v-else-if="isAuthenticated"
                    label="Show Contact"
                    @click="revealContact(artisan)"
                    color="secondary"
                    flat
                  />
                  <div v-if="artisan.showContact && isAuthenticated">
                    <q-item-label>Phone: {{ artisan.phone }}</q-item-label>
                  </div>

                  <q-btn
                    v-if="!isAuthenticated && !artisan.showContact"
                    label="Show Contact"
                    to="/login"
                    color="secondary"
                    flat
                  />
                </q-card-section>
              </q-card>
            </div>
          </div>

          <div v-else-if="currentTab === 'groups'">
            <div v-for="(group, index) in filteredGroups" :key="index">
              <q-card class="q-mb-md" flat>
                <q-card-section class="col-8">
                  <q-item-label>Group: {{ group.name }}</q-item-label>
                  <q-item-label
                    >Members: {{ group.members.length }}</q-item-label
                  >
                  <q-item-label>Location: {{ group.location }}</q-item-label>
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
                  <q-item-label>
                    Last Job: {{ group.lastJobCompletionDate }}
                  </q-item-label>

                  <q-btn
                    v-if="group.showContact && isAuthenticated"
                    label="Hide Contact"
                    @click="revealGroupContact(group)"
                    color="info"
                    flat
                  />
                  <q-btn
                    v-else-if="isAuthenticated"
                    label="Show Contact"
                    @click="revealGroupContact(group)"
                    color="secondary"
                    flat
                  />
                  <div v-if="group.showContact && isAuthenticated">
                    <q-item-label>Phone: {{ group.contactPhone }}</q-item-label>
                  </div>

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
                    <div
                      v-for="(member, memberIndex) in group.members"
                      :key="memberIndex"
                    >
                      <q-item-label class="flex flex-right">
                        {{ member.role }}
                      </q-item-label>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <div v-else-if="currentTab === 'shops' && isAuthenticated">
            <div v-for="(shop, index) in filteredShops" :key="index">
              <q-card class="q-mb-md" flat>
                <q-card-section>
                  <q-item-label>{{ shop.name }}</q-item-label>
                  <q-item-label>{{ shop.description }}</q-item-label>

                  <!-- List of Products -->
                  <q-item-label>Products:</q-item-label>
                  <ul>
                    <li v-for="product in shop.products" :key="product.id">
                      {{ product.name }} - Ksh {{ product.price }}
                      <span
                        :class="
                          product.available ? 'text-positive' : 'text-negative'
                        "
                      >
                        ({{ product.available ? "Available" : "Unavailable" }})
                      </span>
                    </li>
                  </ul>

                  <!-- List of Jobs -->
                  <q-item-label>Openings:</q-item-label>
                  <ul>
                    <li v-for="job in shop.jobs" :key="job.id">
                      {{ job.title }} - {{ job.shift }}
                      <span
                        :class="
                          job.available ? 'text-positive' : 'text-negative'
                        "
                      >
                        ({{ job.available ? "Available" : "Filled" }})
                      </span>
                      <!-- Apply button for available jobs -->
                      <q-btn
                        v-if="job.available"
                        label="Apply"
                        @click="applyForJob(job)"
                        color="primary"
                        flat
                      />
                    </li>
                  </ul>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </page-body>
  </page>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import store from "src/plumStore";
import { useAuthState } from "@vueauth/core";

// Access the authentication state to check if the user is authenticated
const { isAuthenticated } = useAuthState();

// Reactive variables for selected filter options
const selectedCraft = ref("");
const selectedCounty = ref("");
const selectedConstituency = ref("");
const currentTab = ref("artisans"); // Default to 'artisans' tab
const searchTerm = ref(""); // Search term input
const loading = ref(true); // Loading state

// Ensure store data is available before mapping
const craftOptions = computed(() =>
  store.state.craftOptions ? store.state.craftOptions : [],
);

const countyOptions = computed(() =>
  store.state.locations
    ? store.state.locations.map((location) => ({
        label: location.name,
        value: location.name,
      }))
    : [],
);

// Reactive variable for constituency options, which will be updated based on the selected county
const constituencyOptions = ref([]);

// Watch for changes in the selected county and update the constituency options accordingly
watch(selectedCounty, (newVal) => {
  if (newVal) {
    const countyName = typeof newVal === "object" ? newVal.value : newVal;
    const selectedLocation = store.state.locations?.find(
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

// Compute the filtered artisans based on the selected filter options
const filteredArtisans = computed(() => {
  const artisans = store.state.artisans || [];
  return artisans.filter((artisan) => {
    const matchesCraft =
      !selectedCraft.value || artisan.craft === selectedCraft.value;
    const matchesCounty =
      !selectedCounty.value || artisan.county === selectedCounty.value;
    const matchesConstituency =
      !selectedConstituency.value ||
      artisan.constituency === selectedConstituency.value;
    const matchesSearch =
      !searchTerm.value ||
      artisan.name.toLowerCase().includes(searchTerm.value.toLowerCase());

    return (
      matchesCraft && matchesCounty && matchesConstituency && matchesSearch
    );
  });
});

// Similar computed properties for groups and shops
const filteredGroups = computed(() => {
  const groups = store.state.groups || [];
  return groups.filter((group) => {
    const matchesCounty =
      !selectedCounty.value || group.county === selectedCounty.value;
    const matchesSearch =
      !searchTerm.value ||
      group.name.toLowerCase().includes(searchTerm.value.toLowerCase());

    return matchesCounty && matchesSearch;
  });
});

const filteredShops = computed(() => {
  const shops = store.state.shops || [];
  return shops.filter((shop) => {
    const matchesCounty =
      !selectedCounty.value || shop.county === selectedCounty.value;
    const matchesSearch =
      !searchTerm.value ||
      shop.name.toLowerCase().includes(searchTerm.value.toLowerCase());

    return matchesCounty && matchesSearch;
  });
});

// Simulate loading artisans, groups, and shops data
setTimeout(() => {
  loading.value = false; // Set loading to false after data is fetched
}, 1000);

// Function to reveal contact details of artisans
function revealContact(artisan) {
  artisan.showContact = !artisan.showContact; // Toggle the visibility of contact details
}

// Function to reveal contact details of groups
function revealGroupContact(group) {
  group.showContact = !group.showContact; // Toggle the visibility of contact details
}

// Function to apply for a job at a shop
function applyForJob(job) {
  // Implementation for applying for a job (e.g., show a dialog or redirect)
}
</script>
