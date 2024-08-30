import { useList, useUnit } from 'effector-react';
import { createUserModel } from './model';
import { FC } from 'react';

type UsersProps = {
  model: ReturnType<typeof createUserModel>;
};

export const UsersComponent: FC<UsersProps> = ({ model }) => {
  const { addedUser, $loading } = model;
  const [loading] = useUnit([$loading]);

  return (
    <div>
      <h3>Список пользователей</h3>
      {loading ? (
        <h1>Loading Users...</h1>
      ) : (
        <div>
          <button onClick={() => addedUser('Новый пользователь')}>Добавить пользователя</button>
          <UsersListView model={model} />
        </div>
      )}
    </div>
  );
};

const UsersListView: FC<UsersProps> = ({ model }) => {
  const { $users, removedUser } = model;
  const results = useList($users, {
    getKey: (user) => user.id,
    fn: (user) => (
      <li key={user.id}>
        {user.name}
        <button onClick={() => removedUser(user.id)}>Удалить</button>
      </li>
    ),
  });
  return <ul>{results}</ul>;
};
