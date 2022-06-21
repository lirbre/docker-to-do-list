import { useMemo } from 'react'

import { useToDo } from '@/hooks'
import { CardProps } from '@/types/component_types'

import { ToDoCard } from './todocard'

export const MappedList = () => {
  const { ToDoList } = useToDo()

  const ToDoMap = useMemo(() => {
    return ToDoList.map(({ id, priority, title }: CardProps, i: number) => (
      <ToDoCard
        key={id}
        id={id}
        priority={priority}
        title={title}
        position={i}
      />
    ))
  }, [ToDoList])

  return (
    <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
      {ToDoMap}
    </div>
  )
}
