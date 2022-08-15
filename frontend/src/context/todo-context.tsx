import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState
} from 'react'
import { toast } from 'react-toastify'

import { CardProps, PriorityType } from '@/types/component_types'
import { DefaultConfigProps, ToDoContextProps } from '@/types/context_types'

export const ToDoContext = createContext({} as ToDoContextProps)

interface ToDoProviderProps {
  children: ReactNode
  defaultToDos: CardProps[]
  defaultConfig: DefaultConfigProps
  saveTodoLS: (newValue: CardProps[]) => void
  saveConfigLS: (newValue: DefaultConfigProps) => void
}

export const ToDoProvider = ({
  children,
  defaultToDos,
  defaultConfig,
  saveTodoLS,
  saveConfigLS
}: ToDoProviderProps) => {
  const [ToDoList, setToDoList] = useState<CardProps[]>(defaultToDos)
  const [shouldSave, setShouldSave] = useState<boolean>(defaultConfig.saveOnLS)
  const [shouldHide, setShouldHide] = useState<boolean>(
    defaultConfig.hideComplete
  )
  const [desiredPriority, setDesiredPriority] = useState<PriorityType[]>(
    defaultConfig.priority
  )

  const [byPriority, setByPriority] = useState<boolean>(
    defaultConfig.sortByPriority
  )

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

  const addPriority = useCallback(
    (priority: PriorityType) => {
      setDesiredPriority([...desiredPriority, priority])
    },
    [desiredPriority]
  )

  const removePriority = useCallback(
    (priority: PriorityType) => {
      if (desiredPriority.length === 1) {
        toast.warn('You should show at least one Priority!')
        return
      }

      const validIndex = desiredPriority.indexOf(priority)
      const newPriority: PriorityType[] = [...desiredPriority]

      newPriority.splice(validIndex, 1)
      setDesiredPriority(newPriority)
    },
    [desiredPriority]
  )

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

  const saveToDos = () => {
    setShouldSave(true)
  }

  const notSaveToDos = () => {
    setShouldSave(false)
  }

  useEffect(() => {
    if (shouldSave) {
      saveTodoLS(ToDoList)
      return
    }
    saveTodoLS([])
  }, [ToDoList, shouldSave])

  useEffect(
    () =>
      saveConfigLS({
        hideComplete: shouldHide,
        priority: desiredPriority,
        saveOnLS: shouldSave,
        sortByPriority: byPriority
      }),
    [shouldHide, shouldSave, desiredPriority, byPriority]
  )

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
        addPriority,
        removePriority,
        deleteCompletes,
        sortByPriority,
        sortById,
        byPriority,
        shouldSave,
        saveToDos,
        notSaveToDos
      }}
    >
      {children}
    </ToDoContext.Provider>
  )
}
