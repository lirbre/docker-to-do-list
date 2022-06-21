import { Dispatch, SetStateAction } from 'react'

import { CardProps, PriorityType } from './component_types'

export interface ToDoContextProps {
  addToDo: ({ id, priority, title }: CardProps) => void
  editToDo: (
    position: number,
    newTitle: string,
    newPriority: PriorityType
  ) => void
  removeToDo: (position: number) => void
  ToDoList: CardProps[]
  setToDoList: Dispatch<SetStateAction<CardProps[]>>
}
