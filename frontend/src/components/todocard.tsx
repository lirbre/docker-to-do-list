import { useMemo } from 'react'
import { AiFillEdit } from 'react-icons/ai'

import { useModal, useToDo } from '@/hooks'
import { CardComponentProps } from '@/types/component_types'

import { EditModal } from './_Modal'

export const ToDoCard = ({
  priority,
  title,
  isComplete,
  id
}: CardComponentProps) => {
  const { removeToDo, completeTodo, ToDoList } = useToDo()
  const { setIsOpen, setTitle, setBody } = useModal()

  const handleRemove = () => removeToDo(id)
  const handleComplete = () => completeTodo(id)
  const handleEdit = () => {
    setTitle('Editing a To Do')
    setBody(<EditModal itemId={id} title={title} priority={priority} />)
    setIsOpen(true)
  }

  return useMemo(() => {
    return (
      <div
        className={`min-h-[100px] flex items-center justify-between gap-4 bg-secondary p-3 rounded-sm shadow-lg shadow-black/25 border-b-2 text-[#f2f2f2] priority-${priority} ${
          isComplete ? 'opacity-50' : 'opacity-100'
        }`}
        style={{
          animation: `${isComplete ? 'fadeIn--complete' : 'fadeIn'} .3s`
        }}
        data-cy="todo-item"
      >
        <button
          onClick={handleComplete}
          className={`w-3/4 sm:w-11/12 cursor-pointer text-left h-full ${
            isComplete ? 'line-through' : ''
          }`}
          data-cy="complete-btn"
        >
          <small data-cy="todo-title">{title}</small>
        </button>
        <div className="flex flex-col items-center justify-center gap-2">
          <button
            onClick={handleEdit}
            className="z-10 cursor-pointer"
            data-cy="edit-btn"
          >
            <p className="font-black text-[#f2f2f2] hover:opacity-80">
              <AiFillEdit />
            </p>
          </button>
          <button
            onClick={handleRemove}
            className="z-10 cursor-pointer"
            data-cy="delete-btn"
          >
            <p className="font-black text-[#f2f2f2] hover:opacity-80">X</p>
          </button>
        </div>
      </div>
    )
  }, [priority, id, title, isComplete, ToDoList])
}
