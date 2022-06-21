import { useState } from 'react'

import { CardProps } from '@/types/component_types'

export const useToDo = () => {
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

  const removeToDo = (id: number) => {
    const NewTodoList = [...ToDoList]

    NewTodoList.splice(id - 1, 1)

    setToDoList(NewTodoList)
  }

  return { addToDo, removeToDo, ToDoList, setToDoList }
}
