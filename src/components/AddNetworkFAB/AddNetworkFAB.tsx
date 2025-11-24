import { useState } from "react";
import { FAB, Icon } from "material-react";
import {
  SocialNetworkIcon,
  getNetworkById,
} from "@/components/SocialNetworkIcon";
import { useSocialNetworks } from "@/context";

export default function AddNetworkFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const { addNetwork, getAvailableNetworks } = useSocialNetworks();

  const availableNetworks = getAvailableNetworks();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleAddNetwork = (networkId: string) => {
    addNetwork(networkId);
    setIsOpen(false);
  };

  // Если нет доступных сетей для добавления, не показываем FAB
  if (availableNetworks.length === 0) {
    return null;
  }

  return (
    <>
      {/* Overlay для закрытия меню */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 999,
            transition: "opacity 0.2s ease",
          }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Контейнер FAB меню */}
      <div
        style={{
          position: "fixed",
          bottom: "96px",
          right: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "12px",
          zIndex: 1000,
        }}
      >
        {/* Список доступных сетей - появляется сверху */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            overflowY: isOpen ? "auto" : "hidden",
            overflowX: "hidden",
            maxHeight: isOpen ? "min(600px, calc(100vh - 200px))" : "0px",
            opacity: isOpen ? 1 : 0,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            scrollbarWidth: "thin",
            scrollbarColor: "var(--md-sys-color-outline) transparent",
          }}
        >
          {availableNetworks.map((networkId, index) => {
            const network = getNetworkById(networkId);
            if (!network) return null;

            return (
              <button
                key={networkId}
                onClick={() => handleAddNetwork(networkId)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "8px 16px 8px 8px",
                  borderRadius: "28px",
                  border: "none",
                  backgroundColor: "var(--md-sys-color-surface-container-high)",
                  cursor: "pointer",
                  transform: isOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: isOpen ? 1 : 0,
                  transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${
                    index * 50
                  }ms`,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                }}
              >
                <SocialNetworkIcon
                  networkId={networkId}
                  size={16}
                  showBackground={true}
                />
                <span
                  style={{
                    color: "var(--md-sys-color-on-surface)",
                    fontSize: "14px",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {network.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Основная FAB кнопка */}
        <FAB
          variant="primary"
          onClick={handleToggle}
          style={{
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <Icon name="add" slot="icon" />
        </FAB>
      </div>
    </>
  );
}
