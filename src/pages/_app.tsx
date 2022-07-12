import '@fontsource/nunito-sans/600.css'
import '@fontsource/nunito-sans/700.css'
import '@fontsource/nunito-sans/800.css'
import '../styles/global.css'
import '../styles/typography.css'
import 'react-toastify/dist/ReactToastify.css'

import { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

import { ModalProvider, ToDoProvider } from '@/context'
import useLocalStorage from '@/hooks/useLocalStorage'
import { CardProps } from '@/types/component_types'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { getValue, setValue } = useLocalStorage()
  const [showChild, setShowChild] = useState(false)
  const [LocalStorageToDos] = useState<CardProps[]>(() =>
    getValue<CardProps[]>('todolist', [])
  )
  const setToDos = (newValue: CardProps[]) =>
    setValue<CardProps[]>('todolist', newValue)

  // prevent hydration problem from react 18
  useEffect(() => setShowChild(true), [])

  if (!showChild) {
    return null
  }

  return (
    <ThemeProvider forcedTheme={'dark'}>
      <ModalProvider>
        <ToDoProvider defaultToDos={LocalStorageToDos} saveToDos={setToDos}>
          <Component {...pageProps} />
          <ToastContainer toastClassName="text-sm" theme="dark" />
        </ToDoProvider>
      </ModalProvider>
    </ThemeProvider>
  )
}

export default MyApp
