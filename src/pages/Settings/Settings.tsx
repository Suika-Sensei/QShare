import { useState } from "react";
import { SocialNetworkEditor, AddNetworkFAB } from "@/components";
import {
  SideSheet,
  FilledButton,
  Icon,
  IconButton,
  OutlinedButton,
} from "material-react";
import { useSocialNetworks } from "@/context";
import { openUrl } from "@tauri-apps/plugin-opener";
import AppIcon from "/icon.svg";

export default function Settings() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const { resetToDefault } = useSocialNetworks();

  const handleClearData = async () => {
    localStorage.clear();
    await resetToDefault();
    setSheetOpen(false);
  };

  const handleOpenGitHub = async () => {
    await openUrl("https://github.com/suika-sensei/qshare");
  };

  return (
    <div className="settings-container" style={{ paddingBottom: "100px" }}>
      {/* App Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 4px 8px 16px",
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 8px)",
          backgroundColor: "var(--md-sys-color-surface)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "22px",
            fontWeight: 400,
            color: "var(--md-sys-color-on-surface)",
          }}
        >
          Settings
        </h1>
        <IconButton onClick={() => setSheetOpen(true)}>
          <Icon name="more_vert" />
        </IconButton>
      </div>

      <SocialNetworkEditor />
      <AddNetworkFAB />

      <SideSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        {/* App Bar в SideSheet */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 8px 16px 24px",
            borderBottom: "1px solid var(--md-sys-color-outline-variant)",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "22px",
              fontWeight: 400,
              color: "var(--md-sys-color-on-surface)",
            }}
          >
            Advanced Settings
          </h2>
          <IconButton onClick={() => setSheetOpen(false)}>
            <Icon name="close" />
          </IconButton>
        </div>

        {/* Информация о приложении */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              backgroundColor: "var(--md-sys-color-primary-container)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px",
            }}
          >
            <img
              src={AppIcon}
              alt="QShare Logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <h3
              style={{
                margin: "8px 0 4px 0",
                fontSize: "24px",
                fontWeight: 400,
                color: "var(--md-sys-color-on-surface)",
              }}
            >
              QShare
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                color: "var(--md-sys-color-on-surface-variant)",
              }}
            >
              Version 0.1.0
            </p>
          </div>
          <p
            style={{
              margin: "8px 0 0 0",
              fontSize: "14px",
              textAlign: "center",
              color: "var(--md-sys-color-on-surface-variant)",
              lineHeight: "1.5",
            }}
          >
            Share your social media contacts through QR codes. Generate and scan
            codes to connect with others easily.
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            backgroundColor: "var(--md-sys-color-outline-variant)",
            margin: "0 24px 24px 24px",
          }}
        />

        {/* Действия */}
        <div
          style={{
            padding: "0 24px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <OutlinedButton
            onClick={handleOpenGitHub}
            style={{ width: "100%" }}
            hasIcon
          >
            <Icon name="code" slot="icon" />
            View on GitHub
          </OutlinedButton>
          <FilledButton
            onClick={handleClearData}
            style={{ width: "100%" }}
            hasIcon
          >
            <Icon name="delete" slot="icon" />
            Clear Data
          </FilledButton>
        </div>
      </SideSheet>
    </div>
  );
}
