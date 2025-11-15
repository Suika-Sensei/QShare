import { useState } from "react";
import { Icon, FilledButton, OutlinedButton } from "material-react";
import { scan, Format, checkPermissions, requestPermissions } from "@tauri-apps/plugin-barcode-scanner";

export default function ScanScreen() {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    try {
      setError(null);
      setIsScanning(true);

      // Check and request permissions
      let permissions = await checkPermissions();
      if (permissions.camera !== "granted") {
        permissions = await requestPermissions();
        if (permissions.camera !== "granted") {
          setError("Camera permission denied");
          setIsScanning(false);
          return;
        }
      }

      // Start scanning
      const result = await scan({
        formats: [Format.QRCode],
        windowed: true,
      });

      setScanResult(result.content);
    } catch (err) {
      setError(err.message || "Scan failed");
    } finally {
      setIsScanning(false);
    }
  };

  const handleReset = () => {
    setScanResult(null);
    setError(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="flex flex-col items-center gap-4">
        <Icon
          name="qr_code_scanner"
          style={{
            fontSize: "96px",
            color: "var(--md-sys-color-primary)",
          }}
        />
        <h2
          style={{
            color: "var(--md-sys-color-on-background)",
            fontSize: "24px",
            fontWeight: "500",
          }}
        >
          Scan QR Code
        </h2>

        {!scanResult && !error && (
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

        {scanResult && (
          <div
            style={{
              backgroundColor: "var(--md-sys-color-surface-container)",
              padding: "16px",
              borderRadius: "12px",
              width: "100%",
              maxWidth: "300px",
            }}
          >
            <p
              style={{
                color: "var(--md-sys-color-on-surface)",
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "8px",
              }}
            >
              Result:
            </p>
            <p
              style={{
                color: "var(--md-sys-color-on-surface-variant)",
                fontSize: "14px",
                wordBreak: "break-all",
              }}
            >
              {scanResult}
            </p>
          </div>
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

        <div className="flex gap-2 mt-4">
          <FilledButton onClick={handleScan} disabled={isScanning}>
            {isScanning ? "Scanning..." : "Start Scan"}
          </FilledButton>
          {(scanResult || error) && (
            <OutlinedButton onClick={handleReset}>Reset</OutlinedButton>
          )}
        </div>
      </div>
    </div>
  );
}
