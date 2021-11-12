import Api from '@/api';
import reviews from '@/assets/data/reviews';

export default {
  namespaced: true,

  state: () => ({
    womenProducts: [],
    menProducts: [],
    kidsProducts: [],
    reviews
  }),

  mutations: {
    womenProducts: (state, womenProducts) => state.womenProducts = womenProducts,
    menProducts: (state, menProducts) => state.menProducts = menProducts,
    kidsProducts: (state, kidsProducts) => state.kidsProducts = kidsProducts,
  },

  actions: {
    async getProducts({ commit }) {
      try {
        const womenProducts = await Api.getWomenProducts();
        const menProducts = await Api.getMenProducts();
        const kidsProducts = await Api.getKidsProducts();

        commit('womenProducts', womenProducts);
        commit('menProducts', menProducts);
        commit('kidsProducts', kidsProducts);
      } catch (error) {
        console.error(error);
        throw new Error('Something went wrong!!', error);
      }
    },
  },

  getters: {
    getAllProducts: state => [...state.womenProducts, ...state.menProducts, ...state.kidsProducts],

    getProductById: (_state, getters) => (id) => {
      return getters.getAllProducts.find(product => product.id === id);
    },
  },
}
