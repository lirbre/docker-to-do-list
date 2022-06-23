import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

import { useToDo } from '@/hooks'
import { FormProps, PriorityType } from '@/types/component_types'

export const CompleteForm = () => {
  const { ToDoList, addToDo } = useToDo()
  const [form, setForm] = useState<FormProps>({
    title: '',
    priority: 'low'
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (form.title === '') {
      toast.warn('Please add a Title.')
      return
    }

    const newId = ToDoList[ToDoList.length - 1]?.id || 0

    addToDo({
      id: newId + 1,
      priority: form.priority,
      title: form.title,
      isComplete: false
    })

    setForm({
      title: '',
      priority: 'low'
    })
  }

  return (
    <form className="flex w-full gap-4" onSubmit={(e) => handleSubmit(e)}>
      <label className="w-3/5 text-[#f2f2f2] sm:w-3/4">
        <p>Add a Title:</p>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          type={'text'}
          className="w-full bg-secondary p-3 text-[#f2f2f2]"
        />
      </label>
      <label className="w-2/5 text-[#f2f2f2] sm:w-1/4">
        <p>Add a Priority:</p>
        <select
          onChange={(e) =>
            setForm({ ...form, priority: e.target.value as PriorityType })
          }
          value={form.priority}
          className="w-full bg-secondary p-3 text-[#f2f2f2]"
        >
          <option value="" disabled>
            Priority
          </option>
          <option value={'low'}>Low</option>
          <option value={'medium'}>Medium</option>
          <option value={'high'}>High</option>
        </select>
      </label>
    </form>
  )
}
