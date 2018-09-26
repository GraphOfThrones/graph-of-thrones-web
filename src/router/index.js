import Vue from 'vue';
import Router from 'vue-router';
import CharacterExplorer from '@/components/CharacterExplorer';
import HouseExplorer from '@/components/HouseExplorer';
import About from '@/components/About';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CharacterExplorer',
      component: CharacterExplorer,
    },
    {
      path: '/houses',
      name: 'HouseExplorer',
      component: HouseExplorer,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
  ],
});
