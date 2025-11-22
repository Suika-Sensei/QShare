import { useState, useEffect, useRef, useCallback, ReactNode } from "react";
import { Icon } from "material-react";

interface SocialNetwork {
  name: string;
  id: string;
  icon: ReactNode;
  value: string;
}

interface Props {
  socialNetworks: SocialNetwork[];
  onSelect: (unselected: SocialNetwork[], selected: SocialNetwork[]) => void;
}

export default function SocialNetworkPicker({
  socialNetworks,
  onSelect,
}: Props) {
  // Set выбранных индексов (первый выбран по умолчанию)
  const [selected, setSelected] = useState<Set<number>>(() => new Set([0]));

  // Вызываем onSelect при изменении выбора (пропускаем первый рендер)
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const selectedNetworks = socialNetworks.filter((_, i) => selected.has(i));
    const unselectedNetworks = socialNetworks.filter(
      (_, i) => !selected.has(i)
    );
    onSelect(unselectedNetworks, selectedNetworks);
  }, [selected, socialNetworks, onSelect]);

  // Переключение выбора
  const toggleSelect = useCallback((index: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        // Не даём снять выбор если это последний выбранный
        if (next.size <= 1) return prev;
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        justifyContent: "center",
      }}
    >
      {socialNetworks.map((network, index) => {
        const isSelected = selected.has(index);

        return (
          <div
            key={network.id}
            onClick={() => toggleSelect(index)}
            style={{
              position: "relative",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "12px",
              cursor: "pointer",
              backgroundColor: isSelected
                ? "var(--md-sys-color-secondary-container)"
                : "var(--md-sys-color-surface-container)",
              transition: "background-color 0.2s ease",
              fontSize: "24px",
            }}
          >
            {network.icon}

            {/* Галочка внизу справа */}
            {isSelected && (
              <div
                style={{
                  position: "absolute",
                  bottom: "-4px",
                  right: "-4px",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  backgroundColor: "var(--md-sys-color-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  name="check"
                  style={{
                    fontSize: "14px",
                    color: "var(--md-sys-color-on-primary)",
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
