import { useState, useEffect } from "react";
import {
  Icon,
  IconButton,
  OutlinedTextField,
  Dialog,
  FilledButton,
  TextButton,
  Switch,
} from "material-react";
import {
  SocialNetworkIcon,
  getNetworkById,
} from "@/components/SocialNetworkIcon";
import { useSocialNetworks } from "@/context";

export default function SocialNetworkEditor() {
  const {
    networks,
    updateNetwork,
    toggleNetwork,
    removeNetwork,
    pendingEditId,
    clearPendingEdit,
    canEnableNetwork,
  } = useSocialNetworks();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Автоматически открываем диалог при добавлении новой сети
  useEffect(() => {
    if (pendingEditId) {
      const networkConfig = getNetworkById(pendingEditId);
      const userNetwork = networks.find((n) => n.id === pendingEditId);
      const value = userNetwork?.value || networkConfig?.defaultValue || "";
      setEditingId(pendingEditId);
      setEditValue(value);
      clearPendingEdit();
    }
  }, [pendingEditId, networks, clearPendingEdit]);

  const handleEditClick = (id: string, currentValue: string) => {
    setEditingId(id);
    setEditValue(currentValue);
  };

  const handleSave = () => {
    if (editingId) {
      updateNetwork(editingId, editValue);
      setEditingId(null);
      setEditValue("");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirmId(id);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmId) {
      removeNetwork(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmId(null);
  };

  const editingNetwork = editingId ? getNetworkById(editingId) : null;
  const deleteNetwork = deleteConfirmId
    ? getNetworkById(deleteConfirmId)
    : null;

  if (networks.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
          textAlign: "center",
          color: "var(--md-sys-color-on-surface-variant)",
        }}
      >
        <Icon
          name="add_circle"
          style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.5 }}
        />
        <p style={{ margin: 0, fontSize: "16px" }}>
          Tap + to add a social network
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {networks.map((userNetwork) => {
        const networkConfig = getNetworkById(userNetwork.id);
        if (!networkConfig) return null;

        const value = userNetwork.value || networkConfig.defaultValue || "";
        const enabled = userNetwork.enabled;

        return (
          <div
            key={userNetwork.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "16px",
              backgroundColor: enabled
                ? "var(--md-sys-color-surface-container)"
                : "var(--md-sys-color-surface-container-low)",
              opacity: enabled ? 1 : 0.6,
              transition: "all 0.2s ease",
            }}
          >
            {/* Иконка */}
            <SocialNetworkIcon
              networkId={userNetwork.id}
              size={20}
              showBackground={true}
            />

            {/* Название и значение */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "var(--md-sys-color-on-surface)",
                }}
              >
                {networkConfig.name}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "var(--md-sys-color-on-surface-variant)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {value || "Not specified"}
              </div>
            </div>

            {/* Кнопка редактирования */}
            <IconButton
              onClick={() => handleEditClick(userNetwork.id, value)}
              style={{ flexShrink: 0 }}
            >
              <Icon
                name="edit"
                style={{ color: "var(--md-sys-color-primary)" }}
              />
            </IconButton>

            {/* Кнопка удаления */}
            <IconButton
              onClick={() => handleDeleteClick(userNetwork.id)}
              style={{ flexShrink: 0 }}
            >
              <Icon
                name="delete"
                style={{ color: "var(--md-sys-color-error)" }}
              />
            </IconButton>

            {/* Переключатель */}
            <Switch
              selected={enabled}
              disabled={!enabled && !canEnableNetwork()}
              onChange={() => toggleNetwork(userNetwork.id)}
            />
          </div>
        );
      })}

      {/* Диалог редактирования */}
      <Dialog
        open={!!editingId}
        onClosed={handleCancel}
        className="fixed inset-0 m-auto max-w-[min(400px,calc(100%-48px))]"
      >
        <span slot="headline" style={{ padding: "24px 24px 0" }}>
          {editingNetwork?.name || "Edit"}
        </span>
        <form
          slot="content"
          method="dialog"
          style={{ padding: "16px 24px 24px" }}
        >
          <OutlinedTextField
            label="Value"
            value={editValue}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditValue(e.target.value)
            }
            style={{ width: "100%" }}
          />
        </form>
        <div slot="actions" style={{ padding: "0 24px 24px" }}>
          <TextButton onClick={handleCancel}>Cancel</TextButton>
          <FilledButton onClick={handleSave} className="px-6">
            Save
          </FilledButton>
        </div>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog
        open={!!deleteConfirmId}
        onClosed={handleDeleteCancel}
        className="fixed inset-0 m-auto max-w-[min(400px,calc(100%-48px))]"
      >
        <span slot="headline" style={{ padding: "24px 24px 0" }}>
          Delete {deleteNetwork?.name}?
        </span>
        <div slot="content" style={{ padding: "16px 24px 24px" }}>
          <p
            style={{
              margin: 0,
              color: "var(--md-sys-color-on-surface-variant)",
            }}
          >
            This social network will be removed from your list. You can add it
            again later.
          </p>
        </div>
        <div slot="actions" style={{ padding: "0 24px 24px" }}>
          <TextButton className="px-4" onClick={handleDeleteCancel}>
            Cancel
          </TextButton>
          <FilledButton
            onClick={handleDeleteConfirm}
            className="px-6"
            style={{ backgroundColor: "var(--md-sys-color-error)" }}
          >
            Delete
          </FilledButton>
        </div>
      </Dialog>
    </div>
  );
}
