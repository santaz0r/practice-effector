import { useUnit } from 'effector-react';
import { Layout } from '../../shared/Layout/Layout';
import { $loadingTodo, $todo } from './model';

export const TodoPage = () => {
  const [todo, isLoading] = useUnit([$todo, $loadingTodo]);

  return <Layout>{isLoading ? <h1>Loading Todo</h1> : todo && <h1>{todo.title}</h1>}</Layout>;
};
