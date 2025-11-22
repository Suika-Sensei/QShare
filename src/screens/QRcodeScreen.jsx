import { useState, useMemo, useCallback } from "react";
import { SocialNetworkPicker } from "@/components/SocialNetworkPicker";
import Icons from "@/components/SocialNetworkPicker/Icons";
import { QRCode } from "@/components/QRCode";
import { ThemeSelector } from "@/components/ThemeSelector";
import { useMD3Colors } from "@/theme/colors";
import LZString from "lz-string";

const socialNetworks = [
  { name: "Number", id: "number", icon: Icons.PhoneNumber({}), value: "" },
  {
    name: "Telegram",
    id: "telegram",
    icon: Icons.Telegram({}),
    value: "+3801234567",
  },
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

  // Compress selected networks data for QR code
  const qrData = useMemo(() => {
    const result = networks.selected.map((item) => [item.id, item.value]);
    return LZString.compressToBase64(JSON.stringify(result));
  }, [networks.selected]);

  // Scale QR code size based on data amount (max +100px for 6+ items)
  const qrSize = useMemo(() => {
    const baseSize = 200;
    const additionalSize = Math.min((networks.selected.length - 1) * 25, 100);
    return baseSize + additionalSize;
  }, [networks.selected.length]);

  const dotsOptions = useMemo(
    () => ({ color: Color.primary, type: "rounded" }),
    [Color.primary]
  );

  const cornersSquareOptions = useMemo(
    () => ({ type: "extra-rounded", color: Color.primary }),
    [Color.primary]
  );

  const cornersDotOptions = useMemo(
    () => ({ type: "dot", color: Color.primary }),
    [Color.primary]
  );

  const backgroundOptions = useMemo(
    () => ({ color: Color.primaryContainer }),
    [Color.primaryContainer]
  );

  const handleSelect = useCallback((unselected, selected) => {
    setNetworks({ selected, unselected });
  }, []);

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
          <div className="flex flex-col items-center p-5 gap-4 bg-(--md-sys-color-primary-container) rounded-[4em] shadow-lg">
            <QRCode
              data={qrData}
              width={qrSize}
              height={qrSize}
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
