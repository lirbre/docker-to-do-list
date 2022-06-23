import { createContext, useState } from 'react'
import { toast } from 'react-toastify'

import { CardProps, PriorityType } from '@/types/component_types'
import { ToDoContextProps } from '@/types/context_types'

export const ToDoContext = createContext({} as ToDoContextProps)

export const ToDoProvider = ({ children }: any) => {
  const [ToDoList, setToDoList] = useState<CardProps[]>([])
  const [shouldHide, setShouldHide] = useState<boolean>(false)
  const [desiredPriority, setDesiredPriority] = useState<PriorityType | 'all'>(
    'all'
  )
  const [byPriority, setByPriority] = useState<boolean>(false)

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

  const removeToDo = (id: number) => {
    const newList = [...ToDoList]

    const correct = newList.find((item) => item.id === id)
    const position = newList.indexOf(correct!)

    newList.splice(position, 1)
    setToDoList(newList)
  }

  const editToDo = (
    id: number,
    newTitle: string,
    newPriority: PriorityType
  ) => {
    const newList = [...ToDoList]
    const correct = newList.find((item) => item.id === id)

    if (newTitle === correct!.title && newPriority === correct!.priority) {
      toast.warn('Change something to edit.')
      return
    }

    correct!.title = newTitle
    correct!.priority = newPriority
    correct!.isComplete = false

    setToDoList(newList)
  }

  const completeTodo = (id: number) => {
    const newList = [...ToDoList]

    const correctItem = newList.find((item) => item.id === id)
    correctItem!.isComplete = !correctItem!.isComplete

    setToDoList(newList)
  }

  const hideComplete = () => {
    setShouldHide(true)
  }

  const showComplete = () => {
    setShouldHide(false)
  }

  const filterPriority = (desired: PriorityType | 'all') => {
    setDesiredPriority(desired)
  }

  const deleteCompletes = () => {
    const newList = [...ToDoList]

    const filtered = newList.filter((item) => item.isComplete === false)

    if (filtered.length === newList.length) {
      toast.warn("You don't have any To Dos marked as complete.")
      return
    }

    setToDoList(filtered)
    toast.success('Success! Deleted all To Dos marked as complete.')
  }

  const sortByPriority = () => {
    setByPriority(true)
  }

  const sortById = () => {
    setByPriority(false)
  }

  return (
    <ToDoContext.Provider
      value={{
        addToDo,
        editToDo,
        removeToDo,
        setToDoList,
        completeTodo,
        ToDoList,
        shouldHide,
        showComplete,
        hideComplete,
        desiredPriority,
        filterPriority,
        deleteCompletes,
        sortByPriority,
        sortById,
        byPriority
      }}
    >
      {children}
    </ToDoContext.Provider>
  )
}
