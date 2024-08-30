import { currentRoute } from './model';
import { TodoPage } from './ui';

export const TodoRoute = {
  view: TodoPage,
  route: currentRoute,
};
