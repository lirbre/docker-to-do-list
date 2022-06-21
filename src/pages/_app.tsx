import '@fontsource/nunito-sans/600.css'
import '@fontsource/nunito-sans/700.css'
import '@fontsource/nunito-sans/800.css'
import '../styles/global.css'
import '../styles/typography.css'
import 'react-toastify/dist/ReactToastify.css'

import { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify'

import { ToDoProvider } from '@/context'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={'dark'}>
    <ToDoProvider>
      <Component {...pageProps} />
      <ToastContainer toastClassName="text-sm" theme="dark" />
    </ToDoProvider>
  </ThemeProvider>
)

export default MyApp
