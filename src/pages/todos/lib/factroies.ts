import { createEvent, createStore } from 'effector';

export function createFieldFactory<Value, Error>(defaultValue: Value) {
  const $value = createStore(defaultValue);
  const changed = createEvent<Value>();
  const $error = createStore<Error | null>(null);

  $value.on(changed, (_, val) => val);
  return [$value, changed, $error] as const;
}
