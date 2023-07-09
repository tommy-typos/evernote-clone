import '@/styles/globals.css'
import '@/styles/tiptap.scss'
import '@/styles/calendar.scss'
import '@/styles/calendar-colors.scss'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
