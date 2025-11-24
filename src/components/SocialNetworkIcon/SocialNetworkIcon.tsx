import { Icon } from "material-react";
import socialNetworksData from "@/data/socialNetworks.json";

export interface SocialNetworkIconProps {
  /** ID социальной сети из socialNetworks.json */
  networkId: string;
  /** Размер иконки в пикселях */
  size?: number;
  /** Основной цвет (для SVG path или Material Icon) */
  primaryColor?: string;
  /** Цвет фона круга */
  backgroundColor?: string;
  /** Показывать ли круглый фон */
  showBackground?: boolean;
  /** Дополнительные CSS классы */
  className?: string;
  /** Дополнительные inline стили */
  style?: React.CSSProperties;
}

/** Типы значений для социальных сетей */
export type SocialNetworkValueType =
  | "number"
  | "username"
  | "@username"
  | "channel"
  | "@channel"
  | "mail"
  | "username|number";

export interface NetworkConfig {
  id: string;
  name: string;
  iconType: "material" | "svg";
  iconName?: string;
  viewBox?: string;
  svgPath?: string;
  hasCircleBackground?: boolean;
  defaultValue?: string;
  valueType?: SocialNetworkValueType;
  urlPrefix?: string;
}

// Получаем конфигурацию сети по ID
export function getNetworkById(id: string): NetworkConfig | undefined {
  return socialNetworksData.networks.find(
    (n: NetworkConfig) => n.id === id
  ) as NetworkConfig | undefined;
}

// Получаем все сети
export function getAllNetworks(): NetworkConfig[] {
  return socialNetworksData.networks as NetworkConfig[];
}

export default function SocialNetworkIcon({
  networkId,
  size = 24,
  primaryColor = "var(--md-sys-color-primary)",
  backgroundColor = "var(--md-sys-color-primary-container)",
  showBackground = true,
  className = "",
  style = {},
}: SocialNetworkIconProps) {
  const network = getNetworkById(networkId);

  if (!network) {
    return null;
  }

  // Размер контейнера (немного больше иконки)
  const containerSize = size * 2;

  // Для Material Icon
  if (network.iconType === "material" && network.iconName) {
    if (showBackground) {
      return (
        <div
          className={`flex items-center justify-center rounded-full ${className}`}
          style={{
            width: containerSize,
            height: containerSize,
            backgroundColor,
            ...style,
          }}
        >
          <Icon
            name={network.iconName}
            style={{ color: primaryColor, fontSize: size * 1.4 }}
          />
        </div>
      );
    }

    return (
      <Icon
        name={network.iconName}
        className={className}
        style={{ color: primaryColor, fontSize: size, ...style }}
      />
    );
  }

  // Для SVG иконок
  if (network.iconType === "svg" && network.svgPath && network.viewBox) {
    // Telegram имеет особую структуру с кругом внутри SVG
    if (network.hasCircleBackground) {
      const svgSize = showBackground ? size * 1.8 : size;
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={svgSize}
          height={svgSize}
          viewBox={network.viewBox}
          className={`rounded-full ${className}`}
          style={style}
        >
          <defs>
            <linearGradient id={`bg-${networkId}`} x1="50%" x2="50%" y1="0%" y2="100%">
              <stop offset="0%" stopColor={backgroundColor} />
              <stop offset="100%" stopColor={backgroundColor} />
            </linearGradient>
          </defs>
          <g fill="none" fillRule="evenodd">
            <circle cx="8" cy="8" r="8" fill={`url(#bg-${networkId})`} />
            <path fill={primaryColor} d={network.svgPath} />
          </g>
        </svg>
      );
    }

    // Остальные SVG иконки - с внешним контейнером
    const iconSize = size * 1.3;

    if (showBackground) {
      return (
        <div
          className={`flex items-center justify-center rounded-full ${className}`}
          style={{
            width: containerSize,
            height: containerSize,
            backgroundColor,
            ...style,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={iconSize}
            height={iconSize}
            viewBox={network.viewBox}
            fill={primaryColor}
          >
            <path d={network.svgPath} />
          </svg>
        </div>
      );
    }

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={network.viewBox}
        fill={primaryColor}
        className={className}
        style={style}
      >
        <path d={network.svgPath} />
      </svg>
    );
  }

  return null;
}
