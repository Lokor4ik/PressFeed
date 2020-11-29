export const state = () => ({
  activeTab: ''
});

export const mutations = {
  setActiveTab(state, activeTab) {
    state.activeTab = activeTab;
  }
};

export const actions = {
  appointTab({ commit }, { data }) {
    commit('setActiveTab', data);
  }
};

export const getters = {
  activeTab: s => s.activeTab
};
