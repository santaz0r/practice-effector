import { useUnit } from 'effector-react';
import { model } from '../../../../pages/todos/model';

export const SearchTodo = () => {
  const [search] = useUnit([model.$searchField]);

  return (
    <div>
      <h2>Search todo</h2>
      <input type="text" value={search} placeholder="search..." onChange={(e) => model.searchChanged(e.target.value)} />
    </div>
  );
};
