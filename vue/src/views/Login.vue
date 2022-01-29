 <template>
  <div>
    <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
         alt="Workflow">
    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
      Login to your account
    </h2>
    <p class="mt-2 text-center text-sm text-gray-600">
      Or
      {{ ' ' }}
      <router-link :to="{name: 'Register'}" class="font-medium text-indigo-600 hover:text-indigo-500">
        Register for free.
      </router-link>
    </p>
  </div>
  <form class="mt-8 space-y-6" @submit="login">
    <div v-if="errorMsg" class="flex items-center justify-between py-3 px-5 bg-red-500 text-white rounded shadow">
      {{errorMsg}}
      <span @click="errorMsg = ''"
            class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="text-white h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
    </div>

    <input type="hidden" name="remember" value="true">
    <div class="rounded-md shadow-sm -space-y-px">
      <div>
        <label for="email-address" class="sr-only">Email address</label>
        <input id="email-address" name="email" type="email" autocomplete="email" required v-model="user.email"
               class="appearance-none rounded-t-md  rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address">
      </div>
      <div>
        <label for="password" class="sr-only">Password</label>
        <input id="password" name="password" type="password" autocomplete="current-password" v-model="user.password"
               required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <input id="remember-me" name="remember-me" type="checkbox" v-model="user.remeber"
               class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
        <label for="remember-me" class="ml-2 block text-sm text-gray-900">
          Remember me
        </label>
      </div>


    </div>

    <div>
      <button
          :disabled="loading"
          type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- Heroicon name: solid/lock-closed -->
            <!-- animate-spin -ml-1 mr-3 h-5 w-5 text-white-->
            <svg v-if="!loading" class="h-5 w- 5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>

            <svg
              v-if="loading"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>

          </span>
        Sign in
      </button>
    </div>
  </form>
</template>

<script setup>
import {ref} from "vue";
import store from '../store';
import {useRouter} from "vue-router";

const router = useRouter();

const user = {
  email: 'thomas.imensek@gmail.com',
  password: 'test1234',
  remeber: false
}

let errorMsg = ref('');

const loading = ref(false);

function login(ev) {
  ev.preventDefault();
  loading.value = true;
  store
    .dispatch('login', user)
    .then(() => {
      loading.value = false;
      router.push({name: 'Dashboard'});
    })
  .catch((res) => {
    loading.value = false;
      errorMsg.value = res.response.data.error;
  })
}

</script>

<style scoped>

</style>
