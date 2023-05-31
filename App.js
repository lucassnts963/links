import { AuthProvider } from './src/common/context/AuthContext'
import { HomeView } from './src/views/Home'

export default function App() {
  return (
    <AuthProvider>
      <HomeView />
    </AuthProvider>
    )
}