import { useMemo } from 'react'

import { useToDo } from '@/hooks'
import { CardProps } from '@/types/component_types'

import { ToDoCard } from './todocard'

export const MappedList = () => {
  const { ToDoList, shouldHide, desiredPriority, byPriority } = useToDo()

  const ToDoMap = useMemo(() => {
    return byPriority
      ? [...ToDoList]
          .sort((a, b) => +b.priority - +a.priority)
          .map(({ id, priority, title, isComplete }: CardProps, i: number) => {
            if (desiredPriority.indexOf(priority) === -1) return <></>

            return shouldHide && isComplete ? (
              <></>
            ) : (
              <ToDoCard
                key={id}
                id={id}
                priority={priority}
                title={title}
                isComplete={isComplete}
                position={i}
              />
            )
          })
      : ToDoList.map(
          ({ id, priority, title, isComplete }: CardProps, i: number) => {
            if (desiredPriority.indexOf(priority) === -1) return <></>

            return shouldHide && isComplete ? (
              <></>
            ) : (
              <ToDoCard
                key={id}
                id={id}
                priority={priority}
                title={title}
                isComplete={isComplete}
                position={i}
              />
            )
          }
        )
  }, [ToDoList, shouldHide, desiredPriority, byPriority])

  return (
    <div
      data-cy="todocontainer"
      className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3"
    >
      {ToDoMap}
    </div>
  )
}
