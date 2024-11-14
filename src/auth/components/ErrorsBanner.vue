<!--src/auth/components/ErrorsBanner.vue-->
<template>
  <div>
    <ul v-if="errors && errors.length">
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>
