import { useEffect, useState, useMemo, useCallback } from "react";
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
    value: "",
  },
  { name: "Telegram", id: "telegram", icon: Icons.Telegram({}), value: "" },
  { name: "WhatsApp", id: "whatsapp", icon: Icons.WhatsApp({}), value: "" },
  { name: "Instagram", id: "instagram", icon: Icons.Instagram({}), value: "" },
  { name: "TikTok", id: "tiktok", icon: Icons.TikTok({}), value: "" },
];

export default function QRcodeScreen() {
  const [networks, setNetworks] = useState({
    selected: socialNetworks.slice(0, 1),
    unselected: socialNetworks.slice(1),
  });
  const Color = useMD3Colors();

  const qrData = useMemo(() => {
    const result = networks.selected.map((item) => [item.id, item.value]);
    return JSON.stringify(result, null, 2);
  }, [networks.selected]);

  const dotsOptions = useMemo(
    () => ({
      color: Color.primary,
      type: "rounded",
    }),
    [Color.primary]
  );

  const cornersSquareOptions = useMemo(
    () => ({
      type: "extra-rounded",
      color: Color.primary,
    }),
    [Color.primary]
  );

  const cornersDotOptions = useMemo(
    () => ({
      type: "dot",
      color: Color.primary,
    }),
    [Color.primary]
  );

  const backgroundOptions = useMemo(
    () => ({
      color: Color.primaryContainer,
    }),
    [Color.primaryContainer]
  );

  const handleSelect = useCallback((unselected, selected) => {
    setNetworks({ selected, unselected });
  }, []);

  // Don't render QR code until colors are loaded
  const colorsReady = Color.primary && Color.background;

  return (
    <div className="flex flex-col items-center h-full">
      <div className="w-full max-w-md mt-[3em] px-8">
        <SocialNetworkPicker
          socialNetworks={socialNetworks}
          onSelect={handleSelect}
        />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        {qrData && colorsReady && (
          <div className="flex flex-col items-center p-6 gap-4 bg-[var(--md-sys-color-primary-container)] rounded-[4em] shadow-lg">
            <QRCode
              data={qrData}
              width={230}
              height={230}
              dotsOptions={dotsOptions}
              cornersSquareOptions={cornersSquareOptions}
              cornersDotOptions={cornersDotOptions}
              backgroundOptions={backgroundOptions}
            />
          </div>
        )}
        <div style={{ position: "relative", right: "50%", bottom: "20px" }}>
          <ThemeSelector />
        </div>
      </div>

      {qrData && !colorsReady && (
        <div className="flex items-center justify-center mt-[8em]">
          <p>Loading colors...</p>
        </div>
      )}
    </div>
  );
}
