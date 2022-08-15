import { useContext } from 'react'

import { ToDoContext } from '@/context'

export const useToDo = () => useContext(ToDoContext)
