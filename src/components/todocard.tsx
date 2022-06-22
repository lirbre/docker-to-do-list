import { useCallback } from 'react'
import { AiFillEdit } from 'react-icons/ai'

import { useModal, useToDo } from '@/hooks'
import { CardComponentProps } from '@/types/component_types'

export const ToDoCard = ({
  priority,
  title,
  position,
  isComplete
}: CardComponentProps) => {
  const { removeToDo, completeTodo } = useToDo()
  const { open, setTitle, setBody } = useModal()

  const handleRemove = useCallback(() => removeToDo(position), [position])
  const handleComplete = useCallback(() => completeTodo(position), [position])
  const handleEdit = () => {
    setTitle('Editing a To Do')
    setBody(<></>)
    open()
  }

  return (
    <div
      className={`min-h-[100px] flex items-center justify-between gap-4 bg-secondary p-3 rounded-sm shadow-lg shadow-black/25 border-b-2 text-[#f2f2f2] border-${priority} ${
        isComplete ? 'opacity-70' : 'opacity-100'
      }`}
    >
      <button
        onClick={handleComplete}
        className={`w-3/4 sm:w-11/12 cursor-pointer text-left h-full ${
          isComplete ? 'line-through' : ''
        }`}
      >
        <small>{title}</small>
      </button>
      <div className="flex flex-col items-center justify-center gap-2">
        <button onClick={handleEdit} className="z-10 cursor-pointer">
          <p className="font-black text-[#f2f2f2] hover:opacity-80">
            <AiFillEdit />
          </p>
        </button>
        <button onClick={handleRemove} className="z-10 cursor-pointer">
          <p className="font-black text-[#f2f2f2] hover:opacity-80">X</p>
        </button>
      </div>
    </div>
  )
}
