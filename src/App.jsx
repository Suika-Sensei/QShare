// Import Material Design 3 themes
import "./styles";
import "material-react/styles";
import { NavigationController } from "@/components";
import { SocialNetworksProvider } from "@/context";

function App() {
  return (
    <SocialNetworksProvider>
      <NavigationController />
    </SocialNetworksProvider>
  );
}

export default App;
