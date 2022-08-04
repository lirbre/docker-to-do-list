import { useMemo } from 'react'
import { AiOutlineFileSearch, AiOutlineOrderedList } from 'react-icons/ai'
import { BiTask } from 'react-icons/bi'

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
      <p
        style={{ animation: 'fadeIn .7s' }}
        className="flex w-full items-center justify-center gap-4 bg-secondary py-3 text-center text-[#fff]"
      >
        <AiOutlineFileSearch className="text-lg" /> You don&apos;t have any
        registered To Do.
      </p>
    )
  }

  if (completedTodos.length === 0 && shouldHide) {
    return (
      <p
        style={{ animation: 'fadeIn .7s' }}
        className="flex w-full items-center justify-center gap-4 bg-secondary py-3 text-center text-[#fff]"
      >
        <BiTask className="text-lg" /> You don&apos;t have any uncompleted To
        Do.
      </p>
    )
  }

  if (desiredSort.length === 0) {
    return (
      <p
        style={{ animation: 'fadeIn .7s' }}
        className="flex w-full items-center justify-center gap-4 bg-secondary py-3 text-center text-[#fff]"
      >
        <AiOutlineOrderedList className="text-lg" /> You don&apos;t have any{' '}
        {shouldHide ? ' uncompleted ' : ''}
        {desiredPriority.map(
          (item, i) =>
            `${NUMBER_TO_PRIORITY[item]}${
              i === desiredPriority.length - 1 ? ' priority' : ' or '
            }
            `
        )}{' '}
        To Do.
      </p>
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
