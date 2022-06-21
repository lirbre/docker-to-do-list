import { createContext, useState } from 'react'

import { CardProps, PriorityType } from '@/types/component_types'
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

  const editToDo = (
    position: number,
    newTitle: string,
    newPriority: PriorityType
  ) => {
    const newList = [...ToDoList]

    newList[position]!.title = newTitle
    newList[position]!.priority = newPriority

    setToDoList(newList)
  }

  return (
    <ToDoContext.Provider
      value={{
        addToDo,
        editToDo,
        removeToDo,
        setToDoList,
        ToDoList
      }}
    >
      {children}
    </ToDoContext.Provider>
  )
}
