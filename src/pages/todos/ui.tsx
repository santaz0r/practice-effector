import { Layout } from '../../shared/Layout/Layout';
import { model } from './model';
import { useUnit } from 'effector-react';

import { AddTodoForm, SearchTodo, TodoListView } from '../../features/todos';

import styles from './styles.module.scss';

export const TodosPage = () => {
  const [isTodoLoading] = useUnit([model.$status]);

  return (
    <Layout>
      <h1>Todos</h1>
      <div className={styles.container}>
        <AddTodoForm />
        <SearchTodo />
      </div>

      <div>{isTodoLoading === 'pending' ? <h1>Loading todos....</h1> : <TodoListView />}</div>
    </Layout>
  );
};
