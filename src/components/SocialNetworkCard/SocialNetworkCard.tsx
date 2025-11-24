import { ReactNode } from "react";
import { Icon, IconButton, Ripple, FilledButton } from "material-react";
import { openUrl } from "@tauri-apps/plugin-opener";

interface SocialNetworkCardProps {
  /** Иконка или аватар (ReactNode для гибкости) */
  icon?: ReactNode;
  /** Буква для аватара (если icon не указан) */
  avatarLetter?: string;
  /** Название соцсети */
  title: string;
  /** Юзернейм или значение */
  subtitle: string;
  /** Клик по кнопке редактирования */
  onEdit?: () => void;
  /** Клик по всей карточке */
  onClick?: () => void;
  /** URL префикс для открытия (если есть - показывается кнопка "Открыть") */
  urlPrefix?: string;
  /** Значение для открытия/копирования */
  value?: string;
}

export default function SocialNetworkCard({
  icon,
  avatarLetter,
  title,
  subtitle,
  onEdit,
  onClick,
  urlPrefix,
  value,
}: SocialNetworkCardProps) {
  const letter = avatarLetter || title.charAt(0).toUpperCase();

  const handleOpen = async () => {
    if (urlPrefix && value) {
      await openUrl(urlPrefix + value);
    }
  };

  const handleCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value);
    }
  };

  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "12px 16px",
        borderRadius: "28px",
        backgroundColor: "var(--md-sys-color-surface-container-low)",
        cursor: onClick ? "pointer" : "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {onClick && <Ripple />}

      {/* Аватар */}
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "var(--md-sys-color-primary-container)",
          color: "var(--md-sys-color-on-primary-container)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          fontWeight: 500,
          flexShrink: 0,
        }}
      >
        {icon || letter}
      </div>

      {/* Текст */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "16px",
            fontWeight: 500,
            color: "var(--md-sys-color-on-surface)",
            lineHeight: "24px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "14px",
            color: "var(--md-sys-color-on-surface-variant)",
            lineHeight: "20px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {subtitle}
        </div>
      </div>

      {/* Кнопка редактирования */}
      {onEdit && (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <Icon name="edit" style={{ color: "var(--md-sys-color-primary)" }} />
        </IconButton>
      )}

      {/* Кнопка открыть/копировать */}
      {value &&
        !onEdit &&
        (urlPrefix ? (
          <FilledButton
            onClick={(e) => {
              e.stopPropagation();
              handleOpen();
            }}
            style={{ flexShrink: 0 }}
          >
            <Icon name="open_in_new" filled className="p-2" />
          </FilledButton>
        ) : (
          <FilledButton
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
            style={{ flexShrink: 0 }}
          >
            <Icon name="content_copy" filled className="p-2" />
          </FilledButton>
        ))}
    </div>
  );
}
