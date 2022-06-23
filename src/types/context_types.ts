import { Dispatch, SetStateAction } from 'react'

import { CardProps, PriorityType } from './component_types'

export interface ToDoContextProps {
  addToDo: ({ id, priority, title }: CardProps) => void
  editToDo: (
    position: number,
    newTitle: string,
    newPriority: PriorityType
  ) => void
  completeTodo: (position: number) => void
  removeToDo: (position: number) => void
  ToDoList: CardProps[]
  setToDoList: Dispatch<SetStateAction<CardProps[]>>
  shouldHide: boolean
  showComplete(): void
  hideComplete(): void
  desiredPriority: PriorityType | 'all'
  filterPriority(desired: PriorityType | 'all'): void
  deleteCompletes(): void
  sortByPriority(): void
  sortById(): void
  byPriority: boolean
}
