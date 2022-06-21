import { useEffect } from 'react'

import { MappedList } from '@/components'
import { useToDo } from '@/hooks/useToDo'
import { Meta } from '@/layouts'
import { Main } from '@/templates'

const Index = () => {
  const { addToDo, ToDoList } = useToDo()

  const handleAdd = () => {
    const newId = ToDoList[ToDoList.length - 1]?.id || 0

    addToDo({
      id: newId + 1,
      priority: 'high',
      title: 'lol'
    })
  }

  useEffect(() => {
    console.log('my todo list ->', ToDoList)
  }, [ToDoList])

  return (
    <Main
      meta={
        <Meta
          title="To do List"
          description="A minimalist and functional To do List."
        />
      }
    >
      <div className="container flex flex-col gap-4 overflow-hidden pt-4">
        <button onClick={handleAdd}>strange button to test add</button>
        <MappedList />
      </div>
    </Main>
  )
}

export default Index
