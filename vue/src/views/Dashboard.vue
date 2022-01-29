<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <PageComponent>
    <template v-slot:header>
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
    </template>

    <!-- <div>
      <pre>{{data}}</pre>
    </div> -->

    <div v-if="loading" class="flex justify-center">Loading...</div>
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700">

      <div class="bg-white shadow-md p-3 text-center flex flex-col order-1 lg:order-2 animate-fade-in-down"
      style="animation-delay: 0.1s">
        <h3 class="text-2xl font-semibold">Total Surveys</h3>
        <div class="text-8xl font-semibold flex-1 flex items-center justify-center">
          {{data.totalSurveys}}
        </div>
      </div>

      <div class="bg-white shadow-md p-3 text-center flex flex-col order-2 lg:order-4 animate-fade-in-down"
           style="animation-delay: 0.2s">
        <h3 class="text-2xl font-semibold">Total Answers</h3>
        <div class="text-8xl font-semibold flex-1 flex items-center justify-center">
          {{data.totalAnswers}}
        </div>
      </div>

      <div class="row-span-2 order-3 lg:order-1 bg-white shadow-md p-4 animate-fade-in-down">
        <h3 class="text-2xl font-semibold">Latest Survey</h3>
        <img class="w-[240px} mx-auto"
             :src="data.latestSurvey.image_url"
             :alt="data.latestSurvey.title"
             />
        <h3 class="tefont-bold text-xl mb-3">{{data.latestSurvey.title}}</h3>
        <div class="flex justify-between text-sm mb-1">
          <div>Create Date:</div>
          <div>{{data.latestSurvey.created_at}}</div>
        </div>
        <div class="flex justify-between text-sm mb-1">
          <div>Expiration Date:</div>
          <div>{{data.latestSurvey.expire_date}}</div>
        </div>
        <div class="flex justify-between text-sm mb-1">
          <div>Status:</div>
          <div>{{data.latestSurvey.status ? 'Active' : 'Draft'}}</div>
        </div>
        <div class="flex justify-between text-sm mb-1">
          <div>Questions:</div>
          <div>{{data.latestSurvey.questions}}</div>
        </div>
        <div class="flex justify-between text-sm mb-1">
          <div>Answers:</div>
          <div>{{data.latestSurvey.answers}}</div>
        </div>
        <div class="mt-4 flex justify-between">
          <router-link  :to="{name: 'SurveyView', params: {id: data.latestSurvey.id}}"
                        class="flex py-2 px-4 border border-transparent
                text-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                focus:ring-2 focus:ring-offset-2 focus:ring-inidgo-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit Survey
          </router-link>

          <button
            type="button"
            class="flex items-center justify-center h-8 w-8
                  rounded-full border border-transparent
                  text-sm text-red-500
                  focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 -mt-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>

        </div>
      </div>

      <div class="bg-white shadow-md p-3 row-span-2 order-4 lg:order-3 animate-fade-in-down"
           style="animation-delay: 0.3s">

        <div class="flex justify-between items-center mb-3 px-2">
          <h3 class="font-bold text-xl mb-3">Latest Answers</h3>

          <a href="javascript:void(0)"
            class="text-sm text-blue-500 hover:decoration-blue-500"
          >
            View all
          </a>
        </div>

        <a
          href="#"
          v-for="answer of data.latestAnswers"
          :key="answer.id"
          class="block p-2 hover:bg-gray-100/90"
          >

            <div class="font-semibold">{{answer.survey.title}}</div>
            <small>
              Answer Made at: <i class="font-semibold">{{answer.end_date}}</i>
            </small>


        </a>


      </div>

    </div>

  </PageComponent>
</template>

<script setup>
import PageComponent from '../components/PageComponent.vue';
import {computed} from "vue";
import {useStore} from "vuex";

const store = useStore();

const loading = computed(() => store.state.dashboard.loading);
const data = computed(() => store.state.dashboard.data);

store.dispatch("getDashboardData");

</script>
