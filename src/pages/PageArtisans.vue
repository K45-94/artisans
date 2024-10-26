<template>
  <page>
    <page-header>
      <template #title>Find Artisans</template>
    </page-header>
    <page-body>
      <div class="q-pt-lg q-pb-md q-pl-md q-pr-md">
        <!-- Search Bar -->
        <q-input
          v-model="searchTerm"
          label="Search..."
          filled
          clearable
          active-color="secondary"
        />

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
import { ref, computed, onMounted } from "vue";
import supabase from "src/config/supabase";
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

const artisans = ref([]);
const groups = ref([]);
const shops = ref([]);
const craftOptions = ref([]);
const countyOptions = ref([]);
const constituencyOptions = ref([]);

// Fetch functions
async function fetchArtisans() {
  const { data, error } = await supabase.from("artisans").select("*");
  if (error) {
    console.error("Error fetching artisans:", error);
  } else {
    artisans.value = data;
  }
}

async function fetchGroups() {
  const { data, error } = await supabase.from("groups").select("*");
  if (error) {
    console.error("Error fetching groups:", error);
  } else {
    groups.value = data;
  }
}

async function fetchShops() {
  const { data, error } = await supabase.from("shops").select("*");
  if (error) {
    console.error("Error fetching shops:", error);
  } else {
    shops.value = data;
  }
}

async function fetchCraftOptions() {
  const { data, error } = await supabase.from("crafts").select("*");
  if (error) {
    console.error("Error fetching craft options:", error);
  } else {
    craftOptions.value = data.map((craft) => ({
      label: craft.name,
      value: craft.name,
    }));
  }
}

async function fetchCountyOptions() {
  const { data, error } = await supabase.from("counties").select("*");
  if (error) {
    console.error("Error fetching county options:", error);
  } else {
    countyOptions.value = data.map((county) => ({
      label: county.name,
      value: county.name,
    }));
  }
}

async function fetchConstituencyOptions() {
  const { data, error } = await supabase.from("constituencies").select("*");
  if (error) {
    console.error("Error fetching constituency options:", error);
  } else {
    constituencyOptions.value = data.map((constituency) => ({
      label: constituency.name,
      value: constituency.name,
    }));
  }
}

// Call the fetch functions on component mount
onMounted(async () => {
  loading.value = true;
  await Promise.all([
    fetchArtisans(),
    fetchGroups(),
    fetchShops(),
    fetchCraftOptions(),
    fetchCountyOptions(),
    fetchConstituencyOptions(),
  ]);
  loading.value = false;
});

// Filtering logic
const filteredArtisans = computed(() => {
  return artisans.value.filter((artisan) => {
    return (
      (artisan.craft === selectedCraft.value || !selectedCraft.value) &&
      (artisan.county === selectedCounty.value || !selectedCounty.value) &&
      (artisan.constituency === selectedConstituency.value ||
        !selectedConstituency.value) &&
      (artisan.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        artisan.craft.toLowerCase().includes(searchTerm.value.toLowerCase()))
    );
  });
});

const filteredGroups = computed(() => {
  return groups.value.filter((group) => {
    return (
      (group.county === selectedCounty.value || !selectedCounty.value) &&
      (group.constituency === selectedConstituency.value ||
        !selectedConstituency.value) &&
      group.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  });
});

const filteredShops = computed(() => {
  return shops.value.filter((shop) => {
    return (
      (shop.county === selectedCounty.value || !selectedCounty.value) &&
      (shop.constituency === selectedConstituency.value ||
        !selectedConstituency.value) &&
      shop.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  });
});

// Reveal contact function
const revealContact = (artisan) => {
  artisan.showContact = !artisan.showContact;
};

const revealGroupContact = (group) => {
  group.showContact = !group.showContact;
};

// Toggle members in group
const toggleMembers = (group) => {
  group.showMembers = !group.showMembers;
};

// Apply for job function
const applyForJob = (job) => {
  console.log("Applying for job:", job);
  // Implement job application logic here
};
</script>
