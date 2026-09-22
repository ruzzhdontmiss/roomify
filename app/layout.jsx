import "./globals.css"

export const metadata = { title: "Verde — Better rooms, beautifully imagined", description: "A considered interior design studio." }

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>
}
