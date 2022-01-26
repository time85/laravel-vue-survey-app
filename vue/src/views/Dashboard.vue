<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <PageComponent>
    <template v-slot:header>
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
    </template>
    Content of se dashboard
  </PageComponent>
</template>

<script setup>
import PageComponent from '../components/PageComponent.vue';

</script>
