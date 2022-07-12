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
import { DefaultConfigProps } from '@/types/context_types'

const defaultConfig: DefaultConfigProps = {
  saveOnLS: true,
  hideComplete: false,
  sortByPriority: false,
  priority: ['1', '2', '3']
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { getValue, setValue } = useLocalStorage()
  const [showChild, setShowChild] = useState(false)
  // useState to make it async
  const [LocalStorageToDos] = useState<CardProps[]>(() =>
    getValue<CardProps[]>('todolist', [])
  )
  const [LocalStorageConfig] = useState<DefaultConfigProps>(() =>
    getValue<DefaultConfigProps>('todoconfig', defaultConfig)
  )
  const setToDos = (newValue: CardProps[]) =>
    setValue<CardProps[]>('todolist', newValue)
  const setConfig = (newValue: DefaultConfigProps) =>
    setValue<DefaultConfigProps>('todoconfig', newValue)

  // prevent hydration problem from react 18
  useEffect(() => setShowChild(true), [])

  if (!showChild) {
    return null
  }

  return (
    <ThemeProvider forcedTheme={'dark'}>
      <ModalProvider>
        <ToDoProvider
          defaultToDos={LocalStorageToDos}
          saveTodoLS={setToDos}
          defaultConfig={LocalStorageConfig}
          saveConfigLS={setConfig}
        >
          <Component {...pageProps} />
          <ToastContainer toastClassName="text-sm" theme="dark" />
        </ToDoProvider>
      </ModalProvider>
    </ThemeProvider>
  )
}

export default MyApp
