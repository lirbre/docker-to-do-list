import { useEffect } from 'react'

import { MappedList } from '@/components'
import { CompleteForm } from '@/components/completeform'
import { useToDo } from '@/hooks/useToDo'
import { Meta } from '@/layouts'
import { Main } from '@/templates'

const Index = () => {
  const { ToDoList } = useToDo()

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
        <CompleteForm />
        <MappedList />
      </div>
    </Main>
  )
}

export default Index
