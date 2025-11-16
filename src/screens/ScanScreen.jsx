import { useState, useRef, useEffect } from "react";
import { Icon, OutlinedButton } from "material-react";
import {
  checkPermissions,
  requestPermissions,
} from "@tauri-apps/plugin-barcode-scanner";
import jsQR from "jsqr";

export default function ScanScreen() {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);
  const scanIntervalRef = useRef(null);
  const hasStartedRef = useRef(false);

  const startCamera = async () => {
    try {
      setError(null);

      // Check and request permissions via Tauri plugin
      let permissionState = await checkPermissions();
      console.log("Initial permission state:", permissionState);

      if (permissionState !== "granted") {
        console.log("Requesting permissions...");
        permissionState = await requestPermissions();
        console.log("After request:", permissionState);

        if (permissionState !== "granted") {
          setError(`Camera permission denied (status: ${permissionState})`);
          return;
        }
      }

      // Start camera preview using Web API
      console.log("Requesting getUserMedia...");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      console.log("Got stream:", stream);
      console.log("Stream tracks:", stream.getTracks());

      streamRef.current = stream;
      setShowCamera(true);

      // Даём React время отрисовать video элемент
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          console.log("Video element srcObject set");
          // Принудительно запускаем воспроизведение
          videoRef.current
            .play()
            .then(() => {
              console.log("Video play() succeeded");
              // Запускаем автосканирование после успешного запуска видео
              startAutoScan();
            })
            .catch((err) => {
              console.error("Video play() failed:", err);
            });
        } else {
          console.error("videoRef.current is null after timeout");
        }
      }, 100);
    } catch (err) {
      console.error("Camera error:", err);
      setError(err.message || "Failed to start camera");
    }
  };

  // Функция автоматического сканирования QR кода
  const startAutoScan = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }

    // Создаём canvas для захвата кадров
    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
    }

    setIsScanning(true);

    scanIntervalRef.current = setInterval(() => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Устанавливаем размер canvas равным размеру видео
      if (video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Захватываем кадр
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );

        // Сканируем QR код
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          console.log("QR Code found:", code.data);
          setScanResult(code.data);
          stopAutoScan();
          stopCamera();
        }
      }
    }, 200); // Сканируем каждые 200мс
  };

  const stopAutoScan = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    setIsScanning(false);
  };

  // Автозапуск камеры при монтировании компонента
  useEffect(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      startCamera();
    }

    // Останавливаем камеру при размонтировании
    return () => {
      stopAutoScan();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

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
    // Перезапускаем камеру
    setTimeout(() => {
      hasStartedRef.current = false;
      startCamera();
    }, 100);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="flex flex-col items-center gap-4">
        {!showCamera && (
          <Icon
            name="qr_code_scanner"
            style={{
              fontSize: "96px",
              color: "var(--md-sys-color-primary)",
            }}
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
              onLoadedMetadata={() => console.log("Video metadata loaded")}
              onPlay={() => console.log("Video started playing")}
              onError={(e) => console.error("Video error:", e)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
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

        <div className="mt-4 font-normal">
          {(scanResult || error) && (
            <OutlinedButton onClick={handleReset} className="px-4">
              <Icon name="refresh" filled className="pr-1" />
              Scan Again
            </OutlinedButton>
          )}
        </div>
      </div>
    </div>
  );
}
