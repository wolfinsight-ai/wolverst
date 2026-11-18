import type { Metadata,Viewport } from 'next'
import './globals.css'
export const metadata:Metadata={title:'Wolf Insights | Regulatory Intelligence Terminal',description:'Indian renewable energy, transmission and green hydrogen regulatory intelligence for executive teams.'}
export const viewport:Viewport={themeColor:'#05070A',colorScheme:'dark'}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
