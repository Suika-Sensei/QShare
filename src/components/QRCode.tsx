import { useEffect, useRef } from "react";
import QRCodeStyling, {
  Options,
  DotType,
  CornerSquareType,
  CornerDotType,
  DrawType,
  TypeNumber,
  Mode,
  ErrorCorrectionLevel,
} from "qr-code-styling";

interface DotsOptions {
  color?: string;
  type?: DotType;
}

interface CornersSquareOptions {
  type?: CornerSquareType;
  color?: string;
}

interface CornersDotOptions {
  type?: CornerDotType;
  color?: string;
}

interface BackgroundOptions {
  color?: string;
}

interface ImageOptions {
  crossOrigin?: string;
  margin?: number;
}

interface QRCodeProps {
  /** The data to encode in the QR code */
  data: string;
  /** Width of the QR code */
  width?: number;
  /** Height of the QR code */
  height?: number;
  /** Optional logo image URL to display in center */
  image?: string;
  /** Customization for QR dots */
  dotsOptions?: DotsOptions;
  /** Customization for corner squares */
  cornersSquareOptions?: CornersSquareOptions;
  /** Customization for corner dots */
  cornersDotOptions?: CornersDotOptions;
  /** Background customization */
  backgroundOptions?: BackgroundOptions;
  /** Image/logo customization */
  imageOptions?: ImageOptions;
}

export default function QRCode({
  data,
  width = 300,
  height = 300,
  image,
  dotsOptions = {
    color: "#000000",
    type: "rounded",
  },
  cornersSquareOptions = {
    type: "extra-rounded",
    color: "#000000",
  },
  cornersDotOptions = {
    type: "dot",
    color: "#000000",
  },
  backgroundOptions = {
    color: "#ffffff",
  },
  imageOptions = {
    crossOrigin: "anonymous",
    margin: 10,
  },
}: QRCodeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!qrCodeRef.current) {
      console.log("Creating QR code with data:", data);
      qrCodeRef.current = new QRCodeStyling({
        width,
        height,
        data,
        image,
        dotsOptions,
        backgroundOptions,
        imageOptions,
        cornersSquareOptions,
        cornersDotOptions,
        qrOptions: {
          errorCorrectionLevel: "H", // High error correction for logos
        },
      });

      if (ref.current) {
        console.log("Appending QR code to DOM");
        qrCodeRef.current.append(ref.current);
      } else {
        console.warn("ref.current is null");
      }
    }
  }, []);

  // Update QR code when data changes
  useEffect(() => {
    if (qrCodeRef.current) {
      console.log("Updating QR code with data:", data);
      qrCodeRef.current.update({
        data,
        image,
        width,
        height,
        dotsOptions,
        backgroundOptions,
        imageOptions,
        cornersSquareOptions,
        cornersDotOptions,
      });
    }
  }, [
    data,
    image,
    width,
    height,
    dotsOptions,
    backgroundOptions,
    imageOptions,
    cornersSquareOptions,
    cornersDotOptions,
  ]);

  return <div ref={ref} className="flex items-center justify-center" />;
}
