import { currentRoute } from './model';
import { TodosPage } from './ui';

export const TodosRoute = {
  view: TodosPage,
  route: currentRoute,
};
