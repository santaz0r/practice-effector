import { createHistoryRouter, createRoute, createRouterControls } from 'atomic-router';
import { sample } from 'effector';
import { createBrowserHistory } from 'history';
import { appStarted } from './init';

export const routes = {
  home: createRoute(),

  todos: {
    todos: createRoute(),
    todo: createRoute<{ todoId: string }>(),
  },
  users: createRoute(),
};

export const controls = createRouterControls();

export const router = createHistoryRouter({
  routes: [
    {
      route: routes.home,
      path: '/',
    },
    {
      route: routes.todos.todos,
      path: '/todos',
    },
    {
      route: routes.todos.todo,
      path: '/todos/:todoId',
    },
    {
      route: routes.users,
      path: '/users',
    },
  ],
  controls,
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});
