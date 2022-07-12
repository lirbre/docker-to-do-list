const useLocalStorage = () => {
  const setValue = <T>(key: string, newValue: T) => {
    if (typeof window !== 'undefined') {
      const raw = JSON.stringify(newValue)
      localStorage.setItem(key, raw)
    }
  }

  const getValue = <T>(key: string, defaultValue: T) => {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key)
      const raw = JSON.stringify(defaultValue)

      if (!item) {
        localStorage.setItem(key, raw)
        return defaultValue
      }

      const parsed = JSON.parse(item) as T
      return parsed
    }
    return []
  }
  return { setValue, getValue }
}

export default useLocalStorage
