import { createContext, useCallback, useState } from 'react'

import { CardProps } from '@/types/component_types'
import { ToDoContextProps } from '@/types/context_types'

export const ToDoContext = createContext({} as ToDoContextProps)

export const ToDoProvider = ({ children }: any) => {
  const [ToDoList, setToDoList] = useState<CardProps[]>([])

  const addToDo = useCallback(
    ({ id, priority, title }: CardProps) => {
      setToDoList([
        ...ToDoList,
        {
          id,
          priority,
          title
        }
      ])
    },
    [ToDoList]
  )

  const removeToDo = useCallback(
    (id: number) => {
      const NewTodoList = [...ToDoList]

      NewTodoList.splice(id - 1, 1)

      setToDoList(NewTodoList)
    },
    [ToDoList]
  )

  return (
    <ToDoContext.Provider
      value={{
        addToDo,
        removeToDo,
        setToDoList,
        ToDoList
      }}
    >
      {children}
    </ToDoContext.Provider>
  )
}
