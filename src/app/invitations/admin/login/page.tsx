import AdminLoginClient from './AdminLoginClient'

export const metadata = {
  title: 'Bartsel Wedding Admin',
  description: 'Private wedding invitation',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLoginPage() {
  return <AdminLoginClient />
}