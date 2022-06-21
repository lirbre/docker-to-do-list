import { Dispatch, SetStateAction } from 'react'

import { CardProps } from './component_types'

export interface ToDoContextProps {
  addToDo: ({ id, priority, title }: CardProps) => void
  removeToDo: (id: number) => void
  ToDoList: CardProps[]
  setToDoList: Dispatch<SetStateAction<CardProps[]>>
}
