import { useAuth } from "../common/context/AuthContext";
import { HomeView } from "../views/Home";
import { SignInView } from "../views/SignIn";

export function RootNavigator() {
  const { user } = useAuth();

  if (!user) {
    return <SignInView />;
  }

  return <HomeView />;
}
