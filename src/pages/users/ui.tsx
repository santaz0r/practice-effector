import { useGate, useUnit } from 'effector-react';
import { createUserModel } from '../../features/users/model';
import { UsersComponent } from '../../features/users/Users';
import { Layout } from '../../shared/Layout/Layout';

import styles from './styles.module.scss';
import { model } from './model';

const usersModel1 = createUserModel();
const usersModel2 = createUserModel();

export const UsersPage = () => {
  useGate(model.userGate, { userId: '4' });

  const { $user } = model;
  const [currentUser] = useUnit([$user]);

  return (
    <Layout>
      <h1>Users</h1>
      <div className={styles.users_wrapper}>
        <UsersComponent model={usersModel1} />
        <UsersComponent model={usersModel2} />
      </div>

      {currentUser ? `User is....: ${currentUser.name}, ${currentUser.username}` : 'loading user'}
    </Layout>
  );
};
