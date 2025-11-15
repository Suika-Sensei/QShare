import { useState, useRef, useEffect } from "react";

interface SegmentedButtonItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface SegmentedButtonProps {
  items: SegmentedButtonItem[];
  defaultActiveId?: string;
  activeId?: string;
  onChange?: (id: string) => void;
  style?: React.CSSProperties;
  className?: string;
}

const SegmentedButton: React.FC<SegmentedButtonProps> = ({
  items,
  defaultActiveId,
  activeId: controlledActiveId,
  onChange,
  style,
  className,
}) => {
  const [internalActiveId, setInternalActiveId] = useState(
    defaultActiveId || items[0]?.id || ""
  );
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeId = controlledActiveId ?? internalActiveId;

  const handleClick = (id: string) => {
    if (!controlledActiveId) {
      setInternalActiveId(id);
    }
    onChange?.(id);
  };

  useEffect(() => {
    const updateSlider = () => {
      const activeIndex = items.findIndex((item) => item.id === activeId);
      const activeButton = buttonsRef.current[activeIndex];

      if (activeButton && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();

        setSliderStyle({
          left: buttonRect.left - containerRect.left,
          width: buttonRect.width,
        });
      }
    };

    // Update immediately for initial render
    updateSlider();

    // Update again after animation completes
    const timeoutId = setTimeout(updateSlider, 350);

    return () => clearTimeout(timeoutId);
  }, [activeId, items]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        backgroundColor: "var(--md-sys-color-surface-container-high, #e0e0e0)",
        borderRadius: "100px",
        padding: "4px",
        display: "inline-flex",
        gap: "0",
        ...style,
      }}
      className={className}
    >
      {/* Sliding background */}
      <div
        style={{
          position: "absolute",
          top: "4px",
          left: `${sliderStyle.left}px`,
          width: `${sliderStyle.width}px`,
          height: "calc(100% - 8px)",
          backgroundColor: "var(--md-sys-color-segmented-button-selected)",
          borderRadius: "100px",
          transition:
            "left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 0,
        }}
      />
      {items.map((item, index) => (
        <button
          key={item.id}
          ref={(el) => {
            buttonsRef.current[index] = el;
          }}
          onClick={() => handleClick(item.id)}
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: activeId === item.id ? "8px" : "0px",
            padding: "10px 24px",
            borderRadius: "100px",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            backgroundColor: "transparent",
            color:
              activeId === item.id
                ? "var(--md-sys-color-segmented-button-text-selected)"
                : "var(--md-sys-color-on-surface-variant)",
            transition:
              "color 0.3s cubic-bezier(0.4, 0, 0.2, 1), gap 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              width: activeId === item.id ? "18px" : "0px",
              opacity: activeId === item.id ? 1 : 0,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {item.icon}
          </div>
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SegmentedButton;
