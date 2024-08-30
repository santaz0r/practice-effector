import { createStore, sample } from 'effector';
import { routes } from '../../app/routes/router';
import { getUserByIdFx } from '../../shared/api';
import { createGate } from 'effector-react';

export const currentRoute = routes.users;

type User = {
  id: string;
  name: string;
  username: string;
  email: string;
};

const $user = createStore<User | null>(null);
const $userId = createStore<{ userId: string } | null>(null);

const userGate = createGate<{ userId: string }>();

sample({
  clock: userGate.open,
  fn: (userId) => userId.userId,
  target: getUserByIdFx,
});

sample({
  clock: getUserByIdFx.doneData,
  fn: (user) => user,
  target: $user,
});

export const model = {
  userGate,
  $user,
  $userId,
};
