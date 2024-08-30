import { useList, useUnit } from 'effector-react';
import { model } from '../../../../pages/todos/model';
import { TodoItem } from '../../../../widgets/todo';

export const TodoListView = () => {
  const todos = useUnit(model.$filteredTodos);
  const results = useList(model.$filteredTodos, {
    getKey: (todo) => todo.id,
    fn: (todo) => <TodoItem todo={todo} onDelete={() => model.todoDeleted(todo.id)} />,
  });

  return <ul>{todos.length ? results : 'ничего не было найдено'}</ul>;
};
