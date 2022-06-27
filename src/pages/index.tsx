import { useEffect } from 'react'

import { ConfigButton, MappedList, Modal } from '@/components'
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
      <div
        className="container flex w-11/12 flex-col gap-4 overflow-hidden pt-4"
        style={{ animation: 'fadeIn .7s' }}
      >
        <CompleteForm />
        <MappedList />
        <ConfigButton />
      </div>
      <Modal />
    </Main>
  )
}

export default Index
