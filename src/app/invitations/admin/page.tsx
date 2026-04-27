import AdminDashboardClient from './AdminDashboardClient'

export const metadata = {
  title: 'Admin Dashboard | Bartsel Wedding',
  description: 'Private wedding invitation',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminPage() {
  return <AdminDashboardClient />
}