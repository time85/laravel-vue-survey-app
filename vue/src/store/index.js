import {createStore} from "vuex";
import axiosClient from "../vendor/axois";


const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN')
    },
    currentSurvey: {
      loading: false,
      data: {}
    },
    surveys: {
      loading: false,
      data: []
    },
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
    notification: {
      show: false,
      type: null,
      message: null
    }
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
    saveSurvey({commit}, survey) {
      delete survey.image_url;
      let response;
        if (survey.id) {
          response = axiosClient
            .put(`/survey/${survey.id}`, survey)
            .then((res) => {
              commit("setCurrentSurvey", res.data);
              return res;
            });
        }
        else {
          response = axiosClient
            .post(`/survey`, survey)
            .then((res) => {
              commit("setCurrentSurvey", res.data);
              return res;
            });
        }
        return response;
    },
    getSurvey({commit}, id) {
      commit("setCurrentSurveyLoading", true);
      let surveyId = parseInt(id);
      return axiosClient
        .get(`/survey/${surveyId}`)
        .then((res) => {
          commit("setCurrentSurvey", res.data);
          commit("setCurrentSurveyLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentSurveyLoading", false);
          throw err;
        })
    },
    deleteSurvey({}, id) {
      return axiosClient.delete(`/survey/${id}`);
    },
    getSurveys({commit}) {
      commit('setSurveysLoading', true);
      return axiosClient
        .get(`/survey`)
        .then((res) => {
          commit('setSurveys', res.data);
          commit('setSurveysLoading', false);
        })
        .catch((err) => {
          commit('setSurveysLoading', false);
          throw err;
        })
    }
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
    },
    setCurrentSurveyLoading: (state, loading) => {
      state.currentSurvey.loading = loading;
    },
    setCurrentSurvey: (state, currentSurvey) => {
      state.currentSurvey.data = currentSurvey.data;
    },
    setSurveysLoading: (state, loading) => {
      state.surveys.loading = loading;
    },
    setSurveys: (state, surveys) => {
      state.surveys.data = surveys.data;
    },
    notify: (state, {message, type}) => {
        state.notification.show = true;
        state.notification.type = type;
        state.notification.message = message;
        setTimeout(() => {
          state.notification.show = false;
        }, 3000);
    }
  },
  modules: {}
});

export default store;
