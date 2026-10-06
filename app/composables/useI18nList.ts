/** Reads an array of messages from the locale files as plain strings. */
export function useI18nList() {
  const { tm, rt } = useI18n()
  return (key: string): string[] => {
    const messages = tm(key) as unknown
    return Array.isArray(messages) ? messages.map(message => rt(message)) : []
  }
}
