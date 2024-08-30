import { combine, createEvent, createStore, restore, sample } from 'effector';
import { routes } from '../../app/routes/router';
import { getTodosFx, addTodoFx, deleteTodoFx, Todo } from '../../shared/api';
import { chainRoute } from 'atomic-router';
import { debounce, every, reset, status } from 'patronum';
import { createFieldFactory } from './lib/factroies';

export const currentRoute = routes.todos.todos;

const $todos = restore<Todo[]>(getTodosFx.doneData, []);
const $filteredTodos = restore<Todo[]>(getTodosFx.doneData, []);

const $searchField = createStore('');

const searchChanged = createEvent<string>();
$searchField.on(searchChanged, (_, val) => val);

const [$todoTitle, todoTitleChanged, $todoTitleError] = createFieldFactory<string, null | 'empty'>('');
const [$todoBody, todoBodyChanged, $todoBodyError] = createFieldFactory<string, null | 'empty'>('');

const $todoFormValid = every({
  stores: [$todoTitleError, $todoBodyError],
  predicate: null,
});

const $newTodoData = combine({ title: $todoTitle, body: $todoBody }, ({ title, body }) => ({
  title,
  body,
  completed: false,
  userId: 1,
}));

const formSubmitted = createEvent();
const $addPendingForm = addTodoFx.pending;

const todoDeleted = createEvent<string>();

const $status = status({
  effect: getTodosFx,
});

//

sample({
  clock: todoDeleted,
  source: $filteredTodos,
  fn: (_, idToDelete) => idToDelete,
  target: deleteTodoFx,
});

$filteredTodos.on(todoDeleted, (state, id) => {
  return state.filter((i) => i.id !== id);
});

sample({
  clock: formSubmitted,
  source: $todoTitle,
  fn: (todoTitle) => {
    if (isEmpty(todoTitle)) return 'empty';
    return null;
  },
  target: $todoTitleError,
});

sample({
  clock: formSubmitted,
  source: $todoBody,
  fn: (todoBody) => {
    if (isEmpty(todoBody)) return 'empty';
    return null;
  },
  target: $todoBodyError,
});

sample({
  clock: formSubmitted,
  source: $newTodoData,
  filter: $todoFormValid,
  fn: (data) => data,
  target: addTodoFx,
});

sample({
  clock: addTodoFx.doneData,
  source: $filteredTodos,
  fn: (state, val) => [val, ...state],
  target: $filteredTodos,
});

const searchDebounced = debounce({
  source: searchChanged,
  timeout: 700,
});

sample({
  clock: searchDebounced,
  source: $todos,
  fn: (todos, val) => {
    return val ? todos.filter((todo) => todo.title.toLowerCase().includes(val.toLowerCase())) : todos;
  },
  target: $filteredTodos,
});

reset({
  clock: addTodoFx.done,
  target: [$todoBody, $todoTitle],
});

reset({
  clock: currentRoute.closed,
  target: [$todos, $filteredTodos, $searchField, $todoTitle, $todoTitleError, $todoBody, $todoBodyError],
});

// Либо sample либо chainRoute
//
// sample({
//   clock: currentRoute.opened,
//   source: $todos,
//   filter: (source) => !source.length,
//   target: getTodosFx,
// });
//
chainRoute({
  route: currentRoute,
  beforeOpen: getTodosFx,
});
//

function isEmpty(input: string) {
  return input.trim().length === 0;
}

export const model = {
  $searchField,
  $filteredTodos,
  searchChanged,
  $addPendingForm,
  formSubmitted,
  $todoTitle,
  todoTitleChanged,
  todoBodyChanged,
  $todoBody,
  $todoTitleError,
  $todoBodyError,
  todoDeleted,
  $status,
  // отдельно в тесты
  $todos,
  addTodoFx,
  $newTodoData,
};
