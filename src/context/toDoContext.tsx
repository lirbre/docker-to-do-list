import { createContext, useState } from 'react'

import { CardProps } from '@/types/component_types'
import { ToDoContextProps } from '@/types/context_types'

export const ToDoContext = createContext({} as ToDoContextProps)

export const ToDoProvider = ({ children }: any) => {
  const [ToDoList, setToDoList] = useState<CardProps[]>([])

  const addToDo = ({ id, priority, title }: CardProps) => {
    setToDoList([
      ...ToDoList,
      {
        id,
        priority,
        title
      }
    ])
  }

  const removeToDo = (position: number) => {
    const newList = [...ToDoList]
    newList.splice(position, 1)
    setToDoList(newList)
  }

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
