import { chainRoute } from 'atomic-router';
import { routes } from '../../app/routes/router';
import { createStore, restore } from 'effector';
import { getTodoByIdFx } from '../../shared/api';

export const currentRoute = routes.todos.todo;

export const $todo = restore(getTodoByIdFx.doneData, null);

export const $loadingTodo = createStore(false).on(getTodoByIdFx.pending, (_, pending) => pending);

chainRoute({
  route: currentRoute,
  beforeOpen: {
    effect: getTodoByIdFx,
    mapParams: (params) => params.params.todoId,
  },
});
