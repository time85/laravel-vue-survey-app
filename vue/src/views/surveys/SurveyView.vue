<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">
          {{model.id ? model.title : 'Create a new Survey'}}
        </h1>
      </div>
    </template>

    <form @submit.prevent="saveSurvey">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Image
              </label>
              <div class="mt-1 flex items-center">
                <img
                  v-if="model.image"
                  :src="model.image"
                  :alt="model.title"
                  class="w-64 h-48 object-cover" />
                <span
                  v-else
                  class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
                  >
                    <svg class="h-[80%] w-[80%] text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </span>

                <button type="button" class="ml-5 bg-white py-2 px-3 border border-indigo-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <input
                    type="file"
                    class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
                  />
                  Change
                </button>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" name="title" id="title" v-model="model.title" autocomplete="survey_title"
                     class="mt-1 focus:ring-indigo-500 focus:border-indigo-500
                            block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
          </div>
      </div>
    </form>
  </PageComponent>
</template>

<script setup>
import store from '../../store';
import PageComponent from "../../components/PageComponent.vue";
import {ref} from "vue";
import {useRoute} from 'vue-router';

const route = useRoute();

let model = ref({
  title: '',
  status: false,
  description: null,
  image: null,
  expire_date: null,
  questions: []
});

if (route.params.id) {
  model.value = store.state.surveys.find((survey) => survey.id === parseInt(route.params.id));
}

</script>

<style scoped>

</style>
