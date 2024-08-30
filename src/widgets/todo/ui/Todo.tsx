import { FC } from 'react';
import { Todo } from '../../../shared/api';
import { Link } from 'atomic-router-react';
import { routes } from '../../../app/routes/router';

import styles from './styles.module.scss';

type PropsTodo = {
  todo: Todo;
  onDelete: () => void;
};

export const TodoItem: FC<PropsTodo> = ({ todo, onDelete }) => {
  return (
    <li key={todo.id} className={styles.todo_item}>
      <div>
        <label className={styles.label}>
          <input defaultChecked={todo.completed} type="checkbox" onClick={() => console.log(todo.id)} />
          {todo.title}
        </label>
      </div>
      <div>
        <button onClick={onDelete}>delete</button>
        <Link
          className={styles.link}
          params={{ todoId: todo.id }}
          to={routes.todos.todo}
          onClick={() => console.log(todo.id)}
        >
          Подробнее
        </Link>
      </div>
    </li>
  );
};
