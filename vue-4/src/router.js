import Vue from 'vue';
import Router from 'vue-router';

/**
 * Layouts.
 */
import Main from '@/layouts/Main';

/**
 * Views.
 */
import Home from '@/views/Home';
import Thread from '@/views/Thread';
import NotFound from '@/views/NotFound';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '',
          name: 'Home',
          component: Home,
        },
        {
          path: 'thread/:thread_slug',
          name: 'Thread',
          props: true,
          component: Thread,
        },
        {
          path: '404',
          name: 'NotFound',
          component: NotFound,
        },
      ],
    },
    {
      path: '*',
      redirect: '404',
    },
  ],
});
