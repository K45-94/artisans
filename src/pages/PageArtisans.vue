<template>
  <page>
    <page-header>
      <template #title>Find Artisans</template>
    </page-header>
    <page-body>
      <div class="q-pt-lg q-pb-md q-pl-md q-pr-md">
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

        <!-- Content based on the selected tab -->
        <div v-if="currentTab === 'artisans'">
          <!-- List of filtered artisans -->
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
          <!-- List of filtered groups -->
          <div v-for="(group, index) in filteredGroups" :key="index">
            <q-card class="q-mb-md" flat>
              <q-card-section class="col-8">
                <q-item-label>Group: {{ group.name }}</q-item-label>
                <q-item-label>Members: {{ group.members.length }}</q-item-label>
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
          <!-- List of filtered shops -->
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
                      :class="job.available ? 'text-positive' : 'text-negative'"
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
    </page-body>
  </page>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import store from "src/plumStore";
import { useAuthState } from "@vueauth/core";

defineOptions({
  name: "PageArtisans",
});

// Access the authentication state to check if the user is authenticated
const { isAuthenticated } = useAuthState();

// Reactive variables for selected filter options
const selectedCraft = ref("");
const selectedCounty = ref("");
const selectedConstituency = ref("");
const currentTab = ref("artisans"); // Default to 'artisans' tab

// Compute the craft options from the store
const craftOptions = computed(() => store.state.craftOptions);

// Compute the county options from the store
const countyOptions = computed(() =>
  store.state.locations.map((location) => ({
    label: location.name,
    value: location.name,
  })),
);

// Reactive variable for constituency options, which will be updated based on the selected county
const constituencyOptions = ref([]);

// Watch for changes in the selected county and update the constituency options accordingly
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

// Compute the filtered artisans based on the selected filter options
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

// Compute the filtered groups based on the selected filter options
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
// Compute the filtered shops based on the selected filter options
const filteredShops = computed(() => {
  return store.state.shops.filter((shop) => {
    const matchesCounty = selectedCounty.value
      ? shop.county === selectedCounty.value.value
      : true;
    const matchesConstituency = selectedConstituency.value
      ? shop.location === selectedConstituency.value.value
      : true;

    return matchesCounty && matchesConstituency;
  });
});

// Function to toggle contact visibility for artisans
const revealContact = (artisan) => {
  artisan.showContact = !artisan.showContact;
};

// Function to toggle contact visibility for groups
const revealGroupContact = (group) => {
  group.showContact = !group.showContact;
};

// Function to toggle group members visibility
const toggleMembers = (group) => {
  group.showMembers = !group.showMembers;
};

// Function to apply for a job
const applyForJob = (job) => {
  // Here, you can implement the logic to submit a job application
  console.log("Applying for job:", job);
  // You might want to trigger a modal or redirect to an application page
};
</script>
