import { Icon } from "material-react";

interface IconProps {
  size?: number;
  primaryColor?: string;
  backgroundColor?: string;
}

function TelegramIcon({
  size = 24,
  primaryColor = "var(--md-sys-color-primary)",
  backgroundColor = "var(--md-sys-color-primary-container)",
}: IconProps): React.ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className="rounded-full"
    >
      <defs>
        <linearGradient id="a" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stop-color={backgroundColor} />
          <stop offset="100%" stop-color={backgroundColor} />
        </linearGradient>
      </defs>
      <g fill="none" fill-rule="evenodd">
        <circle cx="8" cy="8" r="8" fill="url(#a)" />
        <path
          fill={primaryColor}
          d="M3.17 7.836a437.18 437.18 0 0 1 5.236-2.163c2.493-.994 2.84-1.139 3.177-1.144a.666.666 0 0 1 .397.147c.141.12.184.196.196.263.011.067.01.276-.002.395-.135 1.361-.648 4.504-.945 6.03-.126.645-.374.861-.614.882-.521.046-.917-.33-1.422-.648-.79-.497-1.054-.68-1.82-1.165-.887-.56-.522-.755-.017-1.258.132-.131 2.322-2.13 2.355-2.312.028-.16.038-.181-.034-.253-.073-.072-.16-.063-.216-.051-.08.017-1.286.78-3.62 2.29-.358.237-.682.352-.973.346-.32-.007-.937-.174-1.395-.317-.563-.176-1.01-.268-.97-.566.02-.155.242-.314.667-.476z"
        />
      </g>
    </svg>
  );
}
function WhatsAppIcon({
  size = 24,
  primaryColor = "var(--md-sys-color-primary)",
  backgroundColor = "var(--md-sys-color-primary-container)",
}: IconProps): React.ReactNode {
  return (
    <div
      className="flex items-center justify-center  rounded-full w-12 h-12"
      style={{ backgroundColor: backgroundColor }}
    >
      <svg
        fill={primaryColor}
        width={size / 1.3}
        height={size / 1.3}
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M26.576 5.363c-2.69-2.69-6.406-4.354-10.511-4.354-8.209 0-14.865 6.655-14.865 14.865 0 2.732 0.737 5.291 2.022 7.491l-0.038-0.070-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h0.006c8.209-0.003 14.862-6.659 14.862-14.868 0-4.103-1.662-7.817-4.349-10.507l0 0zM16.062 28.228h-0.005c-0 0-0.001 0-0.001 0-2.319 0-4.489-0.64-6.342-1.753l0.056 0.031-0.451-0.267-4.675 1.227 1.247-4.559-0.294-0.467c-1.185-1.862-1.889-4.131-1.889-6.565 0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353c0 6.822-5.53 12.353-12.353 12.353h-0zM22.838 18.977c-0.371-0.186-2.197-1.083-2.537-1.208-0.341-0.124-0.589-0.185-0.837 0.187-0.246 0.371-0.958 1.207-1.175 1.455-0.216 0.249-0.434 0.279-0.805 0.094-1.15-0.466-2.138-1.087-2.997-1.852l0.010 0.009c-0.799-0.74-1.484-1.587-2.037-2.521l-0.028-0.052c-0.216-0.371-0.023-0.572 0.162-0.757 0.167-0.166 0.372-0.434 0.557-0.65 0.146-0.179 0.271-0.384 0.366-0.604l0.006-0.017c0.043-0.087 0.068-0.188 0.068-0.296 0-0.131-0.037-0.253-0.101-0.357l0.002 0.003c-0.094-0.186-0.836-2.014-1.145-2.758-0.302-0.724-0.609-0.625-0.836-0.637-0.216-0.010-0.464-0.012-0.712-0.012-0.395 0.010-0.746 0.188-0.988 0.463l-0.001 0.002c-0.802 0.761-1.3 1.834-1.3 3.023 0 0.026 0 0.053 0.001 0.079l-0-0.004c0.131 1.467 0.681 2.784 1.527 3.857l-0.012-0.015c1.604 2.379 3.742 4.282 6.251 5.564l0.094 0.043c0.548 0.248 1.25 0.513 1.968 0.74l0.149 0.041c0.442 0.14 0.951 0.221 1.479 0.221 0.303 0 0.601-0.027 0.889-0.078l-0.031 0.004c1.069-0.223 1.956-0.868 2.497-1.749l0.009-0.017c0.165-0.366 0.261-0.793 0.261-1.242 0-0.185-0.016-0.366-0.047-0.542l0.003 0.019c-0.092-0.155-0.34-0.247-0.712-0.434z" />
      </svg>
    </div>
  );
}

function InstagramIcon({
  size = 24,
  primaryColor = "var(--md-sys-color-primary)",
  backgroundColor = "var(--md-sys-color-primary-container)",
}: IconProps): React.ReactNode {
  return (
    <div
      className="flex items-center justify-center rounded-full w-12 h-12"
      style={{ backgroundColor }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width={size / 1.2}
        height={size / 1.2}
        viewBox="0 0 30 30"
      >
        <path
          fill={primaryColor}
          d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z"
        ></path>
      </svg>
    </div>
  );
}

function TikTokIcon({
  size = 24,
  primaryColor = "var(--md-sys-color-primary)",
  backgroundColor = "var(--md-sys-color-primary-container)",
}: IconProps): React.ReactNode {
  return (
    <div
      className="flex items-center justify-center rounded-full w-12 h-12"
      style={{ backgroundColor }}
    >
      <svg
        fill={primaryColor}
        width={size / 1.5}
        height={size / 1.5}
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z" />
      </svg>
    </div>
  );
}

export default {
  PhoneNumber: ({
    size = 34,
    primaryColor = "var(--md-sys-color-primary)",
    backgroundColor = "var(--md-sys-color-primary-container)",
  }: IconProps) => (
    <div
      className="flex items-center justify-center rounded-full w-12 h-12"
      style={{ backgroundColor }}
    >
      <Icon name="call" size={size} style={{ color: primaryColor }} />
    </div>
  ),
  Telegram: ({
    size = 44,
    primaryColor = "var(--md-sys-color-primary)",
    backgroundColor = "var(--md-sys-color-primary-container)",
  }: IconProps) => (
    <TelegramIcon
      size={size}
      primaryColor={primaryColor}
      backgroundColor={backgroundColor}
    />
  ),
  WhatsApp: ({
    size = 44,
    primaryColor = "var(--md-sys-color-primary)",
    backgroundColor = "var(--md-sys-color-primary-container)",
  }: IconProps) => (
    <WhatsAppIcon
      size={size}
      primaryColor={primaryColor}
      backgroundColor={backgroundColor}
    />
  ),
  Instagram: ({
    size = 44,
    primaryColor = "var(--md-sys-color-primary)",
    backgroundColor = "var(--md-sys-color-primary-container)",
  }: IconProps) => (
    <InstagramIcon
      size={size}
      primaryColor={primaryColor}
      backgroundColor={backgroundColor}
    />
  ),
  TikTok: ({
    size = 44,
    primaryColor = "var(--md-sys-color-primary)",
    backgroundColor = "var(--md-sys-color-primary-container)",
  }: IconProps) => (
    <TikTokIcon
      size={size}
      primaryColor={primaryColor}
      backgroundColor={backgroundColor}
    />
  ),
};
