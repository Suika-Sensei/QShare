import { useState, useMemo, useCallback } from "react";
import { SocialNetworkPicker } from "@/components/SocialNetworkPicker";
import {
  SocialNetworkIcon,
  getAllNetworks,
} from "@/components/SocialNetworkIcon";
import { QRCode } from "@/components/QRCode";
import { ThemeSelector } from "@/components/ThemeSelector";
import { useMD3Colors } from "@/theme/colors";
import { useSocialNetworks } from "@/context";
import LZString from "lz-string";

export default function QRcodeScreen() {
  const { networks: userNetworks } = useSocialNetworks();
  const Color = useMD3Colors();

  // Получаем только включенные сети с актуальными значениями
  const enabledNetworks = useMemo(() => {
    return getAllNetworks()
      .map((network) => {
        const userData = userNetworks.find((n) => n.id === network.id);
        if (!userData?.enabled) return null;
        return {
          id: network.id,
          name: network.name,
          icon: <SocialNetworkIcon networkId={network.id} size={22} />,
          value: userData?.value || network.defaultValue || "",
        };
      })
      .filter((n): n is NonNullable<typeof n> => n !== null);
  }, [userNetworks]);

  const [selectedIds, setSelectedIds] = useState(() =>
    enabledNetworks.length > 0 ? new Set([enabledNetworks[0]?.id]) : new Set()
  );

  // Выбранные сети для QR кода
  const selectedNetworks = useMemo(() => {
    return enabledNetworks.filter((n) => selectedIds.has(n.id));
  }, [enabledNetworks, selectedIds]);

  // Compress selected networks data for QR code
  const qrData = useMemo(() => {
    const result = selectedNetworks.map((item) => [item.id, item.value]);
    return LZString.compressToBase64(JSON.stringify(result));
  }, [selectedNetworks]);

  // Scale QR code size based on data amount (max +100px for 6+ items)
  const qrSize = useMemo(() => {
    const baseSize = 200;
    const additionalSize = Math.min((selectedNetworks.length - 1) * 15, 100);
    return baseSize + additionalSize;
  }, [selectedNetworks.length]);

  const dotsOptions = useMemo(
    () => ({ color: Color.primary, type: "rounded" as const }),
    [Color.primary]
  );

  const cornersSquareOptions = useMemo(
    () => ({ type: "extra-rounded" as const, color: Color.primary }),
    [Color.primary]
  );

  const cornersDotOptions = useMemo(
    () => ({ type: "dot" as const, color: Color.primary }),
    [Color.primary]
  );

  const backgroundOptions = useMemo(
    () => ({ color: Color.primaryContainer }),
    [Color.primaryContainer]
  );

  const handleSelect = useCallback((_unselected: any, selected: any) => {
    setSelectedIds(new Set(selected.map((n: any) => n.id)));
  }, []);

  const colorsReady = Color.primary && Color.background;

  return (
    <div className="flex flex-col items-center h-full">
      <div className="w-full max-w-md mt-[6em]">
        {enabledNetworks.length > 0 ? (
          <SocialNetworkPicker
            socialNetworks={enabledNetworks}
            onSelect={handleSelect}
          />
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "var(--md-sys-color-on-surface-variant)",
            }}
          >
            Enable social networks in Settings
          </p>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-start pt-[8em]">
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
