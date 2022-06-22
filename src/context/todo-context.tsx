import { createContext, useState } from 'react'
import { toast } from 'react-toastify'

import { CardProps, PriorityType } from '@/types/component_types'
import { ToDoContextProps } from '@/types/context_types'

export const ToDoContext = createContext({} as ToDoContextProps)

export const ToDoProvider = ({ children }: any) => {
  const [ToDoList, setToDoList] = useState<CardProps[]>([])

  const addToDo = ({ id, priority, title, isComplete }: CardProps) => {
    setToDoList([
      ...ToDoList,
      {
        id,
        priority,
        title,
        isComplete
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

    if (
      newTitle === newList[position]!.title &&
      newPriority === newList[position]!.priority
    ) {
      toast.warn('Change something to edit.')
      return
    }

    newList[position]!.title = newTitle
    newList[position]!.priority = newPriority
    newList[position]!.isComplete = false

    setToDoList(newList)
  }

  const completeTodo = (position: number) => {
    const newList = [...ToDoList]

    newList[position]!.isComplete = !newList[position]!.isComplete

    setToDoList(newList)
  }

  return (
    <ToDoContext.Provider
      value={{
        addToDo,
        editToDo,
        removeToDo,
        setToDoList,
        completeTodo,
        ToDoList
      }}
    >
      {children}
    </ToDoContext.Provider>
  )
}
