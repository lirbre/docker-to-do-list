import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

import { useModal } from '@/context/modal-context'
import { useToDo } from '@/hooks'
import { FormProps, PriorityType } from '@/types/component_types'

interface EditModalProps {
  position: number
}

export const EditModal = ({ position }: EditModalProps) => {
  const { ToDoList, editToDo } = useToDo()
  const [form, setForm] = useState<FormProps>({
    title: ToDoList[position]!.title,
    priority: ToDoList[position]!.priority
  })
  const { close } = useModal()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (form.title === '') {
      toast.warn("Don't add empty To Do.")
      return
    }

    editToDo(position, form.title, form.priority)

    close()
  }

  return (
    <form
      className="flex w-full flex-col gap-4 px-4 pb-4"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="flex w-full justify-between gap-4">
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          type={'text'}
          className="w-3/4 bg-secondary p-3 text-[#f2f2f2]"
        />
        <select
          onChange={(e) =>
            setForm({ ...form, priority: e.target.value as PriorityType })
          }
          className="w-1/4 bg-secondary p-3 text-[#f2f2f2]"
        >
          <option value={'low'}>Low</option>
          <option value={'medium'}>Medium</option>
          <option value={'high'}>High</option>
        </select>
      </div>
      <div className="flex w-full justify-between gap-4">
        <button
          type={'reset'}
          onClick={close}
          className="w-full bg-[#FF5B00] p-3"
        >
          <p className="font-black text-[#f2f2f2]">Cancel</p>
        </button>
        <button
          type={'submit'}
          onClick={handleSubmit}
          className="w-full bg-[#1A4D2E] p-3"
        >
          <p className="font-black text-[#f2f2f2]">Edit</p>
        </button>
      </div>
    </form>
  )
}