import { ConfigButton, MappedList, Modal } from '@/components'
import { CompleteForm } from '@/components/completeform'
import { Meta } from '@/layouts'
import { Main } from '@/templates'

const Index = () => {
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
