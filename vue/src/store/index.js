import {createStore} from "vuex";
import axiosClient from "../vendor/axois";

const tmpSurveys = [
  {
    id: 100,
    title: "This is my Video",
    slug: 'this-is-my-video',
    status: 'draft',
    image: 'https://via.placeholder.com/400',
    description: 'Hi, my Name is .. my name is .. ',
    created_at: '2022-01-12 18:00:00',
    updated_at: '2022-01-12 18:00:00',
    expire_date: '2022-01-31 18:00:00',
    questions: [
      {
        id: 1,
        type: 'select',
        question: 'From which country are you?',
        description: null,
        data: {
          options: [
            {"uuid": "fb8a044d-e546-48d8-9c05-82d086f65a6b","text": "Antigua and Barbuda" },
            {"uuid": "771b9e1e-c32c-48f0-aecd-bff6f7c73e0a","text": "Somalia" },
            {"uuid": "45e412f9-402a-4690-a3a1-2f420e441608", "text": "French Southern Territories"},
            {"uuid": "b3503c8a-e7fc-4c90-a537-ffadc2587e21","text": "Cayman Islands" },
            {"uuid": "a01ea0e3-d810-4d9c-92d4-a2e45c25577a","text": "Netherlands"},
            {"uuid": "e80f5332-1f66-4ad0-91a1-7c202c71c696", "text": "Costa Rica"}
          ]
        }
      },
      {
        id: 2,
        type: 'checkbox',
        question: 'What are you interested in?',
        description: 'This is my text .. you can read here many things',
        data: {
          options: [
            {"uuid": "46eb38f4-ddcb-447b-bc39-c187d31a17b2", "text": "React"},
            {"uuid": "6055c433-64be-463e-9b21-f1bafbbd6cb5", "text": "Vue.JS"},
            {"uuid": "a0f303e4-cfb5-48a7-b686-e012f7740a89", "text": "Angularrrr"},
            {"uuid": "0e073618-d788-4a1a-a45a-31d4898fd558", "text": "PHP"},
            {"uuid": "fad6835d-d760-4ec8-a859-f64df2c6fa4d", "text": "Laravel"},
          ]
        }
      },
      {
        id: 3,
        type: 'checkbox',
        question: 'What frameworks do you like??',
        description: null,
        data: {
          options: [
            {"uuid":"6d5c3250-0250-4751-b21e-b1958f63e28a","text":"Laravel"},
            {"uuid":"85c7a57d-288a-4393-acd9-d513d0285ba4","text":"Codeigniter"},
            {"uuid":"1aaa8063-f8d0-4eec-8252-560476273330","text":"Yiii"},
            {"uuid":"3d3c8bf1-a266-42c1-9011-d0bdf7834eb7","text":"Symphony"}
          ]
        }
      },
      {
        id: 4,
        type: 'radio',
        question: 'What Version of Laravel du you like most??',
        description: null,
        data: {
          options: [
            {"uuid":"ddef3b13-93c8-4a3e-ac98-37e1dfee8c0e","text":"Laravel 5"},
            {"uuid":"2c7c118e-6a79-4baa-b826-7f8a801c1e7f","text":"Laravel 6"},
            {"uuid":"9f0082ff-0d24-42d4-84b7-39f381e77d1c","text":"Laravel 7"},
            {"uuid":"4acf665d-fd55-42ec-aeea-52e094f83dbb","text":"Laravel 8"},
            ]
        }
      },
      {
        id: 5,
        type: 'text',
        question: 'Whats your favorite channel?',
        description: null,
        data: {  }
      },
      {
        id: 6,
        type: 'textarea',
        question: 'How do you like this here??',
        description: 'Please, be honest :) ',
        data: {  }
      }
    ]
  },
  {
    id: 200,
    title: "Laravel 8",
    slug: 'laravel-8',
    status: 'draft',
    image: 'https://via.placeholder.com/400',
    description: 'What do you think of laravel 8?',
    created_at: '2022-01-14 18:00:00',
    updated_at: '2022-01-14 18:00:00',
    expire_date: '2022-03-31 18:00:00',
    questions: []
  },
  {
    id: 300,
    title: "Vue3 & the composition api",
    slug: 'vue-3-the-composition-api',
    status: 'active',
    image: 'https://via.placeholder.com/400',
    description: 'What do you think of vue 3?',
    created_at: '2022-01-16 18:00:00',
    updated_at: '2022-01-16 18:00:00',
    expire_date: '2022-07-31 18:00:00',
    questions: []
  }

];

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN')
    },
    surveys: [...tmpSurveys],
  },
  getters: {},
  actions: {
    register({commit}, user) {
      return axiosClient.post('/register', user)
        .then(({data}) => {
          commit('setUser', data);
          return data;
        });
    },
    login({commit}, user) {
      return axiosClient.post('/login', user)
        .then(({data}) => {
          commit('setUser', data);
          return data;
        });
    },
    logout({commit}) {
      return axiosClient.post('/logout')
        .then(({data}) => {
          commit('logout');
          return data;
        });
    },
  },
  mutations: {
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem('TOKEN');
    },
    setUser: (state, userData) => {
      state.user.data = userData.user;
      state.user.token = userData.token;
      sessionStorage.setItem('TOKEN', userData.token);
    }
  },
  modules: {}
});

export default store;
