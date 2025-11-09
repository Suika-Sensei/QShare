import { useState } from "react";
import SocialNetworkPicker from "../components/SocialNetworkPicker/SocialNetworkPicker";
import Icons from "../components/SocialNetworkPicker/Icons";
import QRCode from "../components/QRCode.tsx";

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

      {generateQRData() && (
        <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-lg mt-[8em]">
          <QRCode
            data={generateQRData()}
            width={280}
            height={280}
            dotsOptions={{
              color: "#4267b2",
              type: "rounded",
            }}
            cornersSquareOptions={{
              type: "extra-rounded",
              color: "#1a1a1a",
            }}
            cornersDotOptions={{
              type: "dot",
              color: "#4267b2",
            }}
            backgroundOptions={{
              color: "#ffffff",
            }}
          />
        </div>
      )}
    </div>
  );
}
