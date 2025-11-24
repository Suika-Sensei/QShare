import { useState, useRef, useEffect, useMemo } from "react";
import {
  Icon,
  OutlinedButton,
  BottomSheet,
  FilledButton,
} from "material-react";
import {
  checkPermissions,
  requestPermissions,
} from "@tauri-apps/plugin-barcode-scanner";
import jsQR from "jsqr";
import LZString from "lz-string";
import { SocialNetworkCard } from "@/components/SocialNetworkCard";
import { SocialNetworkIcon, getNetworkById } from "@/components/SocialNetworkIcon";

export default function ScanScreen({ isActive = true }: { isActive?: boolean }) {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isActiveRef = useRef(isActive);

  // Parse scan result into social networks array
  const parsedNetworks = useMemo(() => {
    if (!scanResult) return null;
    try {
      const data = JSON.parse(scanResult);
      if (!Array.isArray(data)) return null;
      return data
        .map(([id, value]) => {
          const network = getNetworkById(id);
          if (!network) return null;
          return {
            id,
            value,
            name: network.name,
            urlPrefix: network.urlPrefix,
          };
        })
        .filter(Boolean);
    } catch {
      return null;
    }
  }, [scanResult]);

  const startCamera = async () => {
    // Don't start if already running
    if (streamRef.current) return;

    try {
      setError(null);

      // Check if still active before starting
      if (!isActiveRef.current) return;

      let permissionState = await checkPermissions();
      if (permissionState !== "granted") {
        permissionState = await requestPermissions();
        if (permissionState !== "granted") {
          setError(`Camera permission denied (status: ${permissionState})`);
          return;
        }
      }

      // Check again after async permission check
      if (!isActiveRef.current) return;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      // Check again after getting stream - stop it if no longer active
      if (!isActiveRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      streamRef.current = stream;
      setShowCamera(true);

      // Wait for React to render video element
      setTimeout(() => {
        if (videoRef.current && isActiveRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current
            .play()
            .then(startAutoScan)
            .catch(() => {});
        }
      }, 100);
    } catch (err) {
      setError(err.message || "Failed to start camera");
    }
  };

  // Scan video frames for QR codes at 200ms intervals
  const startAutoScan = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }

    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
    }

    scanIntervalRef.current = setInterval(() => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          const decompressedData = LZString.decompressFromBase64(code.data);
          setScanResult(decompressedData || code.data);
          stopAutoScan();
          stopCamera();
        }
      }
    }, 200);
  };

  const stopAutoScan = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
  };

  const stopCamera = () => {
    stopAutoScan();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const handleReset = () => {
    setScanResult(null);
    setError(null);
    stopCamera();
    setTimeout(() => {
      if (isActiveRef.current) {
        startCamera();
      }
    }, 100);
  };

  // Start/stop camera based on isActive prop
  useEffect(() => {
    isActiveRef.current = isActive;

    if (isActive && !scanResult) {
      startCamera();
    } else {
      // Stop camera when tab is not active
      stopAutoScan();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      setShowCamera(false);
    }

    return () => {
      stopAutoScan();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [isActive, scanResult]);

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="flex flex-col items-center gap-4">
        {!showCamera && (
          <Icon
            name="qr_code_scanner"
            style={{ fontSize: "96px", color: "var(--md-sys-color-primary)" }}
          />
        )}

        <h2
          style={{
            color: "var(--md-sys-color-on-background)",
            fontSize: "24px",
            fontWeight: "500",
          }}
        >
          Scan QR Code
        </h2>

        {showCamera && (
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "300px",
              aspectRatio: "1",
              borderRadius: "12px",
              overflow: "hidden",
              backgroundColor: "var(--md-sys-color-surface-container)",
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: "20%",
                border: "3px solid var(--md-sys-color-primary)",
                borderRadius: "8px",
                pointerEvents: "none",
              }}
            />
          </div>
        )}

        {!scanResult && !error && !showCamera && (
          <p
            style={{
              color: "var(--md-sys-color-on-surface-variant)",
              fontSize: "16px",
              textAlign: "center",
            }}
          >
            Point your camera at a QR code to scan it
          </p>
        )}

        {error && (
          <p
            style={{
              color: "var(--md-sys-color-error)",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}

        {error && (
          <div className="mt-4 font-normal">
            <OutlinedButton onClick={handleReset} className="px-4" hasIcon>
              <Icon name="refresh" filled slot="icon" />
              Scan Again
            </OutlinedButton>
          </div>
        )}
      </div>

      <BottomSheet open={!!scanResult} onClose={handleReset} height="half">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Icon
              name="qr_code_2"
              filled
              style={{ fontSize: "32px", color: "var(--md-sys-color-primary)" }}
            />
            <h3
              style={{
                color: "var(--md-sys-color-on-surface)",
                fontSize: "22px",
                fontWeight: "500",
                margin: 0,
              }}
            >
              {parsedNetworks ? "Contacts" : "Scan Result"}
            </h3>
          </div>

          {parsedNetworks ? (
            <div className="flex flex-col gap-3">
              {parsedNetworks.map((network) => (
                <SocialNetworkCard
                  key={network.id}
                  icon={<SocialNetworkIcon networkId={network.id} size={20} />}
                  title={network.name}
                  subtitle={network.value || "Not provided"}
                  urlPrefix={network.urlPrefix}
                  value={network.value}
                />
              ))}
            </div>
          ) : (
            <div
              style={{
                backgroundColor: "var(--md-sys-color-surface-container-high)",
                padding: "16px",
                borderRadius: "12px",
              }}
            >
              <p
                style={{
                  color: "var(--md-sys-color-on-surface)",
                  fontSize: "14px",
                  wordBreak: "break-all",
                  margin: 0,
                  lineHeight: "1.5",
                }}
              >
                {scanResult}
              </p>
            </div>
          )}

          <div className="flex gap-3 mt-2">
            <OutlinedButton onClick={handleReset} className="flex-1" hasIcon>
              <Icon name="refresh" slot="icon" />
              Scan Again
            </OutlinedButton>
            {!parsedNetworks && (
              <FilledButton
                onClick={() => navigator.clipboard.writeText(scanResult)}
                className="flex-1"
                hasIcon
              >
                <Icon name="content_copy" slot="icon" />
                Copy
              </FilledButton>
            )}
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
