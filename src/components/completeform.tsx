import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { toast } from 'react-toastify'

import { useToDo } from '@/hooks'
import { FormProps, PriorityType } from '@/types/component_types'

export const CompleteForm = () => {
  const { ToDoList, addToDo } = useToDo()
  const [form, setForm] = useState<FormProps>({
    title: '',
    priority: '1'
  })

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()

      if (form.title === '') {
        toast.warn('Please add a Title.')
        return
      }

      const newId = [...ToDoList].sort((a, b) => b.id - a.id)[0]?.id || 0

      addToDo({
        id: newId + 1,
        priority: form.priority,
        title: form.title,
        isComplete: false
      })

      setForm({
        title: '',
        priority: '1'
      })
    },
    [form, ToDoList]
  )

  const handleTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.split('').length > 100) {
        toast.warn('The limit is 100 characters.')
        return
      }

      setForm({ ...form, title: e.target.value })
    },
    [form]
  )

  return (
    <form
      className="flex w-full gap-4"
      onSubmit={(e) => handleSubmit(e)}
      data-cy="todoform"
    >
      <label className="w-3/5 text-[#f2f2f2] sm:w-3/4">
        <p>Add a Title:</p>
        <input
          value={form.title}
          onChange={(e) => handleTitleChange(e)}
          type={'text'}
          className="w-full bg-secondary p-3 text-[#f2f2f2]"
          name="title"
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
          name="priority"
        >
          <option value="" disabled>
            Priority
          </option>
          <option value={'1'}>Low</option>
          <option value={'2'}>Medium</option>
          <option value={'3'}>High</option>
        </select>
      </label>
    </form>
  )
}
