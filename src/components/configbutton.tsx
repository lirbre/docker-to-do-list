import { FcDataConfiguration } from 'react-icons/fc'

import { useModal } from '@/context/modal-context'

import { ConfigModal } from './_Modal'

export const ConfigButton = () => {
  const { open, setBody, setTitle } = useModal()

  const handleOpen = () => {
    setBody(<ConfigModal />)
    setTitle('Setup your To Do List')
    open()
  }

  return (
    <button
      onClick={handleOpen}
      className="fixed bottom-8 right-8 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-secondary opacity-75 backdrop-blur-lg"
      aria-label="Settings Button"
    >
      <p className="font-black text-[#f2f2f2] hover:opacity-80">
        <FcDataConfiguration size={32} />
      </p>
    </button>
  )
}
