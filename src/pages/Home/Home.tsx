import { useState, useEffect } from "react";
import SegmentedButton from "@/components/SegmentedButton/SegmentedButton";
import { Icon } from "material-react";
import QRcodeScreen from "@/screens/QRcodeScreen";
import ScanScreen from "@/screens/ScanScreen";

const tabItems = [
  { id: "qrcode", label: "QRcode", icon: <Icon name="qr_code" filled /> },
  { id: "scan", label: "Scan", icon: <Icon name="qr_code_scanner" filled /> },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("qrcode");
  const [isAnimating, setIsAnimating] = useState(false);
  const [topPosition, setTopPosition] = useState("75%");

  useEffect(() => {
    const updatePosition = () => {
      const screenHeight = window.innerHeight;
      if (screenHeight > 900) {
        setTopPosition("80%");
      } else {
        setTopPosition("75%");
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  const handleTabChange = (newTab: string) => {
    if (newTab === activeTab || isAnimating) return;

    setIsAnimating(true);
    setActiveTab(newTab);

    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  return (
    <div className="relative h-full overflow-hidden">
      {/* Screen content with slide animation */}
      <div
        style={{
          display: "flex",
          width: "200%",
          height: "100%",
          transform:
            activeTab === "qrcode" ? "translateX(0%)" : "translateX(-50%)",
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div style={{ width: "50%", height: "100%", flexShrink: 0 }}>
          <QRcodeScreen />
        </div>
        <div style={{ width: "50%", height: "100%", flexShrink: 0 }}>
          <ScanScreen isActive={activeTab === "scan"} />
        </div>
      </div>

      {/* Bottom Bar */}
      <SegmentedButton
        items={tabItems}
        activeId={activeTab}
        onChange={handleTabChange}
        style={{
          position: "fixed",
          top: topPosition,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
        }}
      />
    </div>
  );
}
