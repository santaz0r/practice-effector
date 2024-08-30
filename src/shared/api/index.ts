import { createEffect } from 'effector';

export type Todo = {
  id: string;
  title: string;
  body: string;
  completed: boolean;
};

type CreateTodo = Omit<Todo, 'id'>;

enum Url {
  baseUrl = 'https://jsonplaceholder.typicode.com/todos',
  users = 'https://jsonplaceholder.typicode.com/users',
}

enum Test {
  baseUrl = 'https://jsonplaceholder.typicode.com',
}

const getSource = (url: string) => {
  return createEffect(async () => {
    const options = {
      method: 'GET',
    };
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  });
};

export const getTodosFx = getSource(`${Test.baseUrl}/todos`);

// export const getTodosFx = createEffect(async () => {
//   const res = await fetch(Url.baseUrl);

//   const data = await res.json();
//   return data;
// });

export const getTodoByIdFx = createEffect<Todo['id'], Todo>(async (id) => {
  const res = await fetch(`${Url.baseUrl}/${id}`);

  const data = await res.json();
  return data;
});

export const addTodoFx = createEffect<CreateTodo, Todo>(async (body) => {
  const res = await fetch(Url.baseUrl, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const data = await res.json();
  return data;
});

export const deleteTodoFx = createEffect(async (id: string) => {
  const res = await fetch(`${Url.baseUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const data = await res.json();

  return data;
});

export const getUserByIdFx = createEffect(async (userId: string) => {
  const res = await fetch(`${Url.users}/${userId}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const data = await res.json();
  return data;
});
