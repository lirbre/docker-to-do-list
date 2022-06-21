import { useToDo } from '@/hooks'
import { CardComponentProps } from '@/types/component_types'

export const ToDoCard = ({
  id,
  priority,
  title,
  position
}: CardComponentProps) => {
  const { removeToDo } = useToDo()

  const handleRemove = () => removeToDo(position)

  return (
    <div className="flex items-center gap-4">
      <p>{id}</p>
      <p>{priority}</p>
      <p>{title}</p>
      <span onClick={handleRemove} className="cursor-pointer">
        <h4>X</h4>
      </span>
    </div>
  )
}
