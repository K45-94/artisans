// src/auth/components/forms/RegisterForm.vue
<template>
  <q-form @submit.prevent="onSubmit">
    <q-input
      v-model="localEmail"
      type="email"
      label="Email"
      outlined
      required
      :error="!!validationErrors?.['email']"
      :error-message="validationErrors?.['email']?.[0]"
      class="q-mb-sm"
      color="secondary"
    />
    <q-input
      v-model="localPassword"
      type="password"
      label="Password"
      outlined
      required
      :error="!!validationErrors?.['password']"
      :error-message="validationErrors?.['password']?.[0]"
      class="q-mb-sm"
      color="secondary"
    />
    <q-input
      v-model="localPasswordConfirmation"
      type="password"
      label="Confirm Password"
      outlined
      required
      :error="!!validationErrors?.['password_confirmation']"
      :error-message="validationErrors?.['password_confirmation']?.[0]"
      class="q-mb-sm"
      color="secondary"
    />
    <q-input
      v-model="localName"
      label="Display Name"
      outlined
      required
      :error="!!validationErrors?.['name']"
      :error-message="validationErrors?.['name']?.[0]"
      class="q-mb-sm"
      color="secondary"
    />
    <q-input
      v-model="localUsername"
      label="Username"
      outlined
      required
      :rules="[
        (val) => !!val || 'Username is required',
        (val) => val.length >= 3 || 'Username must be at least 3 characters',
      ]"
      :error="!!validationErrors?.['username']"
      :error-message="validationErrors?.['username']?.[0]"
      class="q-mb-sm"
      color="info"
    />
  </q-form>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  email: String,
  password: String,
  passwordConfirmation: String,
  name: String,
  username: String,
  validationErrors: {
    type: Object,
    default() {
      return {};
    },
  },
});

const emit = defineEmits([
  "update:email",
  "update:password",
  "update:password-confirmation",
  "update:name",
  "update:username",
  "submit",
]);

// Local state for the form data
const localEmail = ref(props.email);
const localPassword = ref(props.password);
const localPasswordConfirmation = ref(props.passwordConfirmation);
const localName = ref(props.name);
const localUsername = ref(props.username);

function onSubmit() {
  emit("update:email", localEmail.value);
  emit("update:password", localPassword.value);
  emit("update:password-confirmation", localPasswordConfirmation.value);
  emit("update:name", localName.value);
  emit("update:username", localUsername.value);
  emit("submit");
}
</script>
