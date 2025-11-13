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

export default function Home() {
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [username, setUsername] = useState("");
  const Color = useMD3Colors();

  console.log("Colors loaded:", Color);
  console.log("Primary color:", Color.primary);
  console.log("Background color:", Color.background);

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

      {/* <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Введите username или номер"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div> */}

      {generateQRData() && colorsReady && (
        <div className="flex flex-col items-center gap-4 p-6 bg-[var(--md-sys-color-primary-container)] rounded-2xl shadow-lg mt-[8em]">
          <QRCode
            data={generateQRData()}
            width={230}
            height={230}
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
      <ThemeSelector />

      {generateQRData() && !colorsReady && (
        <div className="flex items-center justify-center mt-[8em]">
          <p>Loading colors...</p>
        </div>
      )}
    </div>
  );
}
