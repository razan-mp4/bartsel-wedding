import NewInvitationClient from './NewInvitationClient'

export const metadata = {
  title: 'Create Invitation | Bartsel Wedding Admin',
  description: 'Private wedding invitation',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NewInvitationPage() {
  return <NewInvitationClient />
}