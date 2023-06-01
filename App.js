import { AuthProvider } from "./src/common/context/AuthContext";
import { RootNavigator } from "./src/navigation/_rootNavigation";

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
