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

interface LocalStorageProps {
  LocalStorageToDos: CardProps[]
  LocalStorageConfig: DefaultConfigProps
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { getValue, setValue } = useLocalStorage()
  const [showChild, setShowChild] = useState(false)
  // useState to make it async
  // agroup Todos e Config in the same useState
  // to prevent extra hooks being called
  const [{ LocalStorageToDos, LocalStorageConfig }] =
    useState<LocalStorageProps>(() => {
      const todos = getValue<CardProps[]>('todolist', [])
      const config = getValue<DefaultConfigProps>('todoconfig', defaultConfig)

      return {
        LocalStorageToDos: todos,
        LocalStorageConfig: config
      }
    })

  const setToDos = (newValue: CardProps[]) =>
    setValue<CardProps[]>('todolist', newValue)

  const setConfig = (newValue: DefaultConfigProps) =>
    setValue<DefaultConfigProps>('todoconfig', newValue)

  // prevent hydration problem from react 18y
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
        </ToDoProvider>
        <ToastContainer toastClassName="text-sm" theme="dark" />
      </ModalProvider>
    </ThemeProvider>
  )
}

export default MyApp
