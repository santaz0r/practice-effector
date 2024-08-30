import { FormEventHandler } from 'react';
import { model } from '../../../../pages/todos/model';
import { useUnit } from 'effector-react';

import styles from './styles.module.scss';

export const AddTodoForm = () => {
  const errorText = {
    empty: 'Поле не может быть пустым',
  };

  const { $todoTitle, $todoBody, $addPendingForm, $todoTitleError, $todoBodyError } = model;

  const [todoTitle, todoBody, disabled, todoTitleError, todoBodyError] = useUnit([
    $todoTitle,
    $todoBody,
    $addPendingForm,
    $todoTitleError,
    $todoBodyError,
  ]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    model.formSubmitted();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Create Todo</h2>
      <input
        type="text"
        placeholder="Todo title"
        value={todoTitle}
        onChange={(e) => model.todoTitleChanged(e.target.value)}
      />
      {<p className={styles.error}>{todoTitleError && errorText[todoTitleError]}</p>}
      <input
        type="text"
        placeholder="Todo body"
        value={todoBody}
        onChange={(e) => model.todoBodyChanged(e.target.value)}
      />
      {<p className={styles.error}>{todoBodyError && errorText[todoBodyError]}</p>}
      <button disabled={disabled}>{disabled ? 'Pending...' : 'Add todo'}</button>
    </form>
  );
};
