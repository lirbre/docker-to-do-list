import { FormEvent, useState } from 'react'

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

    const newId = ToDoList[ToDoList.length - 1]?.id || 0

    addToDo({
      id: newId + 1,
      priority: form.priority,
      title: form.title
    })
  }

  return (
    <form className="flex w-full gap-4" onSubmit={(e) => handleSubmit(e)}>
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-3/4"
      ></input>
      <select
        onChange={(e) =>
          setForm({ ...form, priority: e.target.value as PriorityType })
        }
        className="w-1/4 bg-[#020202]"
      >
        <option value={'low'}>Low</option>
        <option value={'medium'}>Medium</option>
        <option value={'high'}>High</option>
      </select>
    </form>
  )
}
