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
      toast.warn("Don't add empty To Do.")
      return
    }

    const newId = ToDoList[ToDoList.length - 1]?.id || 0

    addToDo({
      id: newId + 1,
      priority: form.priority,
      title: form.title,
      isComplete: false
    })
  }

  return (
    <form className="flex w-full gap-4" onSubmit={(e) => handleSubmit(e)}>
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
    </form>
  )
}
