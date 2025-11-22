import { ReactNode } from "react";
import { Icon, IconButton, Ripple } from "material-react";

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
}

export default function SocialNetworkCard({
  icon,
  avatarLetter,
  title,
  subtitle,
  onEdit,
  onClick,
}: SocialNetworkCardProps) {
  const letter = avatarLetter || title.charAt(0).toUpperCase();

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
          <Icon
            name="edit"
            style={{ color: "var(--md-sys-color-primary)" }}
          />
        </IconButton>
      )}
    </div>
  );
}
