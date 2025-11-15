import { useState } from "react";
import SocialNetworkPicker from "../components/SocialNetworkPicker/SocialNetworkPicker";
import Icons from "../components/SocialNetworkPicker/Icons";
import QRCode from "../components/QRCode/QRCode.tsx";
import { useMD3Colors } from "../theme/colors";
import ThemeSelector from "../themeSelector/ThemeSelector";

const socialNetworks = [
  {
    name: "Number",
    id: "number",
    icon: Icons.PhoneNumber({}),
  },
  { name: "Telegram", id: "telegram", icon: Icons.Telegram({}) },
  { name: "WhatsApp", id: "whatsapp", icon: Icons.WhatsApp({}) },
  { name: "Instagram", id: "instagram", icon: Icons.Instagram({}) },
  { name: "TikTok", id: "tiktok", icon: Icons.TikTok({}) },
];

export default function QRcodeScreen() {
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [username, setUsername] = useState("");
  const Color = useMD3Colors();

  const generateQRData = () => {
    // if (!selectedNetwork || !username) return "";

    // const urlMap = {
    //   number: `tel:${username}`,
    //   telegram: `https://t.me/${username}`,
    //   whatsapp: `https://wa.me/${username}`,
    //   instagram: `https://instagram.com/${username}`,
    //   tiktok: `https://tiktok.com/@${username}`,
    // };

    return "https://t.me/";
  };

  // Don't render QR code until colors are loaded
  const colorsReady = Color.primary && Color.background;

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="w-full max-w-md mt-[3em]">
        <SocialNetworkPicker
          socialNetworks={socialNetworks}
          onSelect={(network) => setSelectedNetwork(network.id)}
        />
      </div>
      <div>
        {generateQRData() && colorsReady && (
          <div className="flex flex-col items-center p-6 gap-4 bg-[var(--md-sys-color-primary-container)] rounded-[4em] shadow-lg mt-[8em]">
            <QRCode
              data={generateQRData()}
              width={280}
              height={280}
              dotsOptions={{
                color: Color.primary,
                type: "rounded",
              }}
              cornersSquareOptions={{
                type: "extra-rounded",
                color: Color.primary,
              }}
              cornersDotOptions={{
                type: "dot",
                color: Color.primary,
              }}
              backgroundOptions={{
                color: Color.primaryContainer,
              }}
            />
          </div>
        )}
        <div style={{ position: "relative", right: "10%", bottom: "25px" }}>
          <ThemeSelector />
        </div>
      </div>

      {generateQRData() && !colorsReady && (
        <div className="flex items-center justify-center mt-[8em]">
          <p>Loading colors...</p>
        </div>
      )}
    </div>
  );
}
