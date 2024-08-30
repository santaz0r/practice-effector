import { allSettled, fork } from 'effector';
import { describe, expect, it } from 'vitest';
import { getTodosFx } from '../../../shared/api';
import { model } from '../model';

const mock = [
  { id: '1', title: 'Title 1', body: 'Body 1', completed: false },
  { id: '2', title: 'Title 2', body: 'Body 2', completed: false },
  { id: '3', title: 'Title 3', body: 'Body 3', completed: false },
];

const testItem = {
  title: 'Title 4',
  body: 'Body 4',
  completed: false,
  id: 201,
};

describe('Todo page', () => {
  it('fetch', async () => {
    const scope = fork({
      handlers: [[getTodosFx, async () => mock]],
    });
    await allSettled(getTodosFx, { scope });
    expect(scope.getState(model.$todos)).toEqual(mock);
  });

  it('add new todo', async () => {
    const scope = fork({
      handlers: [[getTodosFx, async () => mock]],
    });

    await allSettled(getTodosFx, { scope });
    await allSettled(model.addTodoFx, { scope, params: testItem });

    expect(scope.getState(model.$filteredTodos)).toEqual([testItem, ...mock]);
  });

  it('delete todo', async () => {
    const scope = fork({
      handlers: [[getTodosFx, async () => mock]],
    });
    const params = '3';

    await allSettled(getTodosFx, { scope });
    await allSettled(model.todoDeleted, { scope, params });

    const filtered = mock.filter((i) => i.id !== params);

    expect(scope.getState(model.$filteredTodos)).toEqual(filtered);
  });
});
