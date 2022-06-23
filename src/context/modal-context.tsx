import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { toast } from 'react-toastify'

interface ComponentWithChildren {
  children: ReactNode
}

export interface ModalProviderProps {
  body: ReactNode | string
  title: Element | string | undefined
  isOpen: boolean
  setBody(value: ReactNode | string): void
  minWidth: string
  setTitle(value: Element | string): void
  maxWidth: string
  setIsOpen(value: boolean): void
  setMinWidth(value: string): void
  setMaxWidth(value: string): void
  setRender(value: boolean): void
  shouldRender: boolean
  desirableWidth: string
  setDesirableWidth(value: string): void
  shouldOverlayClose: boolean
  setShouldOverlayClose(value: boolean): void
  close(): void
  open(): void
  preventClose: boolean
  setPreventClose(value: boolean): void
}

const ModalContext = createContext({} as ModalProviderProps)

const ModalProvider = ({ children }: any) => {
  const [title, setTitle] = useState<Element | string | undefined>()
  const [body, setBody] = useState<JSX.Element>()
  const [minWidth, setMinWidth] = useState<string>('600px')
  const [desirableWidth, setDesirableWidth] = useState<string>('15vw')
  const [maxWidth, setMaxWidth] = useState<string>('900px')
  const [shouldOverlayClose, setShouldOverlayClose] = useState<boolean>(true)
  const [preventClose, setPreventClose] = useState<boolean>(false)

  const [isOpen, setIsOpen] = useState(false)
  const [shouldRender, setRender] = useState(isOpen)

  useEffect(() => {
    const el = document.querySelector('html')
    if (isOpen) {
      setRender(true)
      el?.classList.add('lock-scroll')
    }

    // timer to ensure the animation end
    if (!isOpen) {
      setTimeout(() => setRender(false), 450)
    }

    return () => {
      el?.classList.remove('lock-scroll')
    }
  }, [isOpen])

  return (
    <ModalContext.Provider
      value={{
        body,
        title,
        isOpen,
        setBody,
        minWidth,
        setTitle,
        maxWidth,
        setIsOpen,
        setMinWidth,
        setMaxWidth,
        setRender,
        shouldRender,
        desirableWidth,
        setDesirableWidth,
        shouldOverlayClose,
        setShouldOverlayClose,
        close: () => setIsOpen(false),
        open: () => setIsOpen(true),
        preventClose,
        setPreventClose
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

const useModal = () => useContext(ModalContext)

const Main = ({ children }: ComponentWithChildren) => {
  const { shouldRender, isOpen, shouldOverlayClose, close, preventClose } =
    useModal()

  const handleClose = () => {
    if (!shouldOverlayClose) return
    if (preventClose) {
      toast.error(
        `Please wait your transaction be processed to close this popup.`
      )
      return
    }

    close()
  }

  return (
    <>
      {shouldRender && (
        <div
          className="fixed inset-0 z-[15] border-[#4E44CE]/40 backdrop-blur-sm"
          style={{ animation: `${isOpen ? 'fadeIn' : 'fadeOut'} .5s` }}
        >
          <div
            className="absolute h-full w-full cursor-pointer bg-secondary opacity-70 "
            onClick={handleClose}
          />
          {children}
        </div>
      )}
    </>
  )
}

const ModalCard = ({ children }: ComponentWithChildren) => {
  const { minWidth, desirableWidth, maxWidth } = useModal()

  return (
    <div
      style={{
        width: `clamp(${minWidth}, ${desirableWidth}, ${maxWidth})`
      }}
      className={`
          absolute bg-[#101010] min-h-[180px] -translate-x-1/2 overflow-y-auto
          -translate-y-1/2 top-[50%] left-[50%] lg:w-[30vw] z-[5] max-h-[80vh]
          max-w-[90vw] rounded-sm
        `}
    >
      {children}
    </div>
  )
}

const Header = () => {
  const { title, shouldOverlayClose, preventClose, close } = useModal()

  const handleClose = () => {
    if (!shouldOverlayClose) return
    if (preventClose) {
      toast.error(
        `Please wait your transaction be processed to close this popup.`
      )
      return
    }

    close()
  }

  return (
    <div
      className={`flex flex-row items-center ${
        title
          ? 'mb-3.5 border-b border-[#c1c1c1]/10 pb-2 pt-2 text-[#f2f2f2]'
          : ''
      }`}
    >
      {title && <p className="mr-auto ml-3 mt-2 px-1 font-semibold">{title}</p>}
      <button
        onClick={handleClose}
        className="ml-auto mr-2 mt-2 cursor-pointer px-1 font-black text-[#f2f2f2]"
        tabIndex={1}
      >
        <p>X</p>
      </button>
    </div>
  )
}

const Body = (): any => {
  const { body } = useModal()
  return body
}

export { Body, Header, Main, ModalCard, ModalContext, ModalProvider, useModal }
