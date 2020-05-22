import Vue from 'vue';
import Router from 'vue-router';

/**
 * Views and Layouts imports.
 */
import Home from '@/view/Home';
import Main from '@/layout/Main';
import NotFound from '@/view/NotFound';
import Form from '@/view/Form';

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
          path: 'create',
          name: 'Create',
          component: Form,
        },
        {
          path: ':contato_id/edit',
          component: Form,
          name: 'Edit',
          props: true,
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
      redirect: '/404',
    },
  ],
});
