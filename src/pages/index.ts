import { createRoutesView } from 'atomic-router-react';
import { TodosRoute } from './todos';
import { HomePageRoute } from './homePage';
import { TodoRoute } from './todo';
import { UsersRoute } from './users';

export const Pages = createRoutesView({
  routes: [HomePageRoute, TodosRoute, TodoRoute, UsersRoute],
});
