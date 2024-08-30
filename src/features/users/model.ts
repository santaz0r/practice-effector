import { createStore, createEvent, createEffect } from 'effector';
import { routes } from '../../app/routes/router';
import { chainRoute } from 'atomic-router';

export const createUserModel = () => {
  const currentRoute = routes.users;
  const addedUser = createEvent<string>();
  const removedUser = createEvent<number>();
  const fetchUsersFx = createEffect(async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');

    const data = await res.json();
    return data;
  });

  const $loading = createStore(false).on(fetchUsersFx.pending, (_, pending) => pending);

  const $users = createStore<{ id: number; name: string }[]>([])
    .on(fetchUsersFx.doneData, (_, users) => users)
    .on(addedUser, (users, name) => [...users, { id: Date.now(), name }])
    .on(removedUser, (users, id) => users.filter((u) => u.id !== id));

  chainRoute({
    route: currentRoute,
    beforeOpen: fetchUsersFx,
  });

  return { $users, addedUser, removedUser, $loading };
};
