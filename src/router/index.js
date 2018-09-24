import Vue from 'vue';
import Router from 'vue-router';
import Explorer from '@/components/Explorer';
import About from '@/components/About';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Explorer',
      component: Explorer,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
  ],
});
