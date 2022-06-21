import { useToDo } from '@/hooks'
import { CardComponentProps } from '@/types/component_types'
// import { AiFillEdit } from 'react-icons/ai'

export const ToDoCard = ({ priority, title, position }: CardComponentProps) => {
  const { removeToDo } = useToDo()

  const handleRemove = () => removeToDo(position)

  return (
    <div
      className={`min-h-[100px] flex items-center justify-between gap-4 bg-secondary p-3 rounded-sm shadow-lg shadow-black/25 border-b-2 text-[#f2f2f2] border-${priority}`}
    >
      <small className="w-3/4 sm:w-11/12">{title}</small>
      <div className="flex flex-col items-center justify-center gap-2">
        {/* <span>
                    <p><AiFillEdit /></p>
                </span> */}
        <span onClick={handleRemove} className="cursor-pointer">
          <p className="font-black text-[#f2f2f2] hover:opacity-80">X</p>
        </span>
      </div>
    </div>
  )
}
