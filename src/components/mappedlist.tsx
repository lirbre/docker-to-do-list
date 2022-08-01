import { useMemo } from 'react'

import { useToDo } from '@/hooks'

import { ToDoCard } from './todocard'

const NUMBER_TO_PRIORITY = {
  1: 'low',
  2: 'medium',
  3: 'high'
}

export const MappedList = () => {
  const { ToDoList, shouldHide, desiredPriority, byPriority } = useToDo()
  const completedTodos = useMemo(
    () =>
      shouldHide ? [...ToDoList].filter((item) => !item.isComplete) : ToDoList,
    [ToDoList, shouldHide]
  )
  const prioritySort = useMemo(
    () =>
      !byPriority
        ? [...completedTodos]
        : [...completedTodos].sort((a, b) => +b.priority - +a.priority),
    [completedTodos, byPriority, ToDoList]
  )
  const desiredSort = useMemo(
    () =>
      [...prioritySort].filter(
        (item) => desiredPriority.indexOf(item.priority) !== -1
      ),
    [prioritySort, desiredPriority]
  )
  const memoList = useMemo(
    () =>
      desiredSort.length > 0 &&
      [...desiredSort].map(({ id, priority, title, isComplete }, i: number) => (
        <ToDoCard
          key={id}
          id={id}
          priority={priority}
          title={title}
          isComplete={isComplete}
          position={i}
        />
      )),
    [desiredSort]
  )

  if (ToDoList.length === 0) {
    return (
      <h6 className="pt-12 text-center">
        You don&apos;t have any registered To Do.
      </h6>
    )
  }

  if (completedTodos.length === 0 && shouldHide) {
    return (
      <h6 className="pt-12 text-center">
        You don&apos;t have any uncompleted To Do.
      </h6>
    )
  }

  if (desiredSort.length === 0) {
    return (
      <h6 className="pt-12 text-center">
        You don&apos;t have any{' '}
        {desiredPriority.map(
          (item, i) =>
            `${NUMBER_TO_PRIORITY[item]}${
              i === desiredPriority.length - 1 ? ' priority' : ' or '
            }
            `
        )}{' '}
        To Do.
      </h6>
    )
  }

  return (
    <div
      data-cy="todo-container"
      className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3"
    >
      {memoList}
    </div>
  )
}
