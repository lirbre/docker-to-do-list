import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

import { useModal } from '@/context/modal-context'
import { useToDo } from '@/hooks'
import { FormProps, PriorityType } from '@/types/component_types'

interface EditModalProps {
  id: number
  title: string
  priority: PriorityType
}

export const EditModal = ({ id, title, priority }: EditModalProps) => {
  const { editToDo } = useToDo()
  const [form, setForm] = useState<FormProps>({
    title,
    priority
  })
  const { close } = useModal()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (form.title === '') {
      toast.warn("Don't add empty To Do.")
      return
    }

    editToDo(id, form.title, form.priority)

    close()
  }

  return (
    <form
      className="flex w-full flex-col gap-4 px-4 pb-4"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="flex w-full justify-between gap-4">
        <label className="w-3/4 text-[#f2f2f2]">
          <small>New Title:</small>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            type={'text'}
            className="w-full bg-secondary p-3 text-[#f2f2f2]"
          />
        </label>
        <label className="w-2/5 text-[#f2f2f2] sm:w-1/4">
          <small>New Priority:</small>
          <select
            onChange={(e) =>
              setForm({ ...form, priority: e.target.value as PriorityType })
            }
            className="w-full bg-secondary p-3 text-[#f2f2f2]"
            value={form.priority}
          >
            <option value="" disabled>
              Priority
            </option>
            <option value={'1'}>Low</option>
            <option value={'2'}>Medium</option>
            <option value={'3'}>High</option>
          </select>
        </label>
      </div>
      <div className="flex w-full justify-between gap-4">
        <button
          type={'reset'}
          onClick={close}
          className="w-full bg-[#d1342fff] p-3"
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
