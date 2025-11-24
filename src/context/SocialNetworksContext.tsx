import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { LazyStore } from "@tauri-apps/plugin-store";
import { getAllNetworks } from "@/components/SocialNetworkIcon";

interface NetworkValue {
  id: string;
  value: string;
  enabled: boolean;
}

const MAX_ENABLED_NETWORKS = 5;

interface SocialNetworksContextType {
  networks: NetworkValue[];
  loading: boolean;
  updateNetwork: (id: string, value: string) => void;
  toggleNetwork: (id: string) => void;
  getNetworkValue: (id: string) => string;
  isNetworkEnabled: (id: string) => boolean;
  addNetwork: (id: string) => void;
  removeNetwork: (id: string) => void;
  getAvailableNetworks: () => string[];
  resetToDefault: () => Promise<void>;
  pendingEditId: string | null;
  clearPendingEdit: () => void;
  canEnableNetwork: () => boolean;
  enabledCount: number;
  maxEnabledNetworks: number;
}

const STORAGE_KEY = "networks";

const SocialNetworksContext = createContext<SocialNetworksContextType | null>(
  null
);

function getDefaultNetworks(): NetworkValue[] {
  // По умолчанию только номер телефона
  const phoneNetwork = getAllNetworks().find((n) => n.id === "number");
  if (phoneNetwork) {
    return [
      {
        id: phoneNetwork.id,
        value: phoneNetwork.defaultValue || "",
        enabled: true,
      },
    ];
  }
  return [];
}

export function SocialNetworksProvider({ children }: { children: ReactNode }) {
  const [networks, setNetworks] = useState<NetworkValue[]>(getDefaultNetworks);
  const [loading, setLoading] = useState(true);
  const [pendingEditId, setPendingEditId] = useState<string | null>(null);
  const storeRef = useRef<LazyStore | null>(null);

  // Инициализация store и загрузка данных
  useEffect(() => {
    const initStore = async () => {
      storeRef.current = new LazyStore("social-networks.json");
      const saved = await storeRef.current.get<NetworkValue[]>(STORAGE_KEY);
      if (saved && Array.isArray(saved)) {
        setNetworks(saved);
      }
      setLoading(false);
    };
    initStore();
  }, []);

  // Сохранение при изменении networks
  useEffect(() => {
    if (!loading && storeRef.current) {
      storeRef.current.set(STORAGE_KEY, networks);
      storeRef.current.save();
    }
  }, [networks, loading]);

  const updateNetwork = (id: string, value: string) => {
    setNetworks((prev) =>
      prev.map((n) => (n.id === id ? { ...n, value } : n))
    );
  };

  const getEnabledCount = () => networks.filter((n) => n.enabled).length;

  const canEnableNetwork = () => {
    return getEnabledCount() < MAX_ENABLED_NETWORKS;
  };

  const toggleNetwork = (id: string) => {
    setNetworks((prev) => {
      const network = prev.find((n) => n.id === id);
      if (!network) return prev;

      // Если пытаемся включить и уже достигнут лимит - не разрешаем
      if (!network.enabled && getEnabledCount() >= MAX_ENABLED_NETWORKS) {
        return prev;
      }

      return prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n));
    });
  };

  const getNetworkValue = (id: string) => {
    return networks.find((n) => n.id === id)?.value || "";
  };

  const isNetworkEnabled = (id: string) => {
    return networks.find((n) => n.id === id)?.enabled || false;
  };

  const addNetwork = (id: string) => {
    // Проверяем, не добавлена ли уже эта сеть
    if (networks.some((n) => n.id === id)) return;

    const networkConfig = getAllNetworks().find((n) => n.id === id);
    if (networkConfig) {
      // Включаем только если лимит не достигнут
      const shouldEnable = getEnabledCount() < MAX_ENABLED_NETWORKS;
      setNetworks((prev) => [
        ...prev,
        {
          id: networkConfig.id,
          value: networkConfig.defaultValue || "",
          enabled: shouldEnable,
        },
      ]);
      // Устанавливаем id для автоматического открытия диалога редактирования
      setPendingEditId(id);
    }
  };

  const clearPendingEdit = () => {
    setPendingEditId(null);
  };

  const removeNetwork = (id: string) => {
    setNetworks((prev) => prev.filter((n) => n.id !== id));
  };

  const getAvailableNetworks = () => {
    const addedIds = networks.map((n) => n.id);
    return getAllNetworks()
      .filter((n) => !addedIds.includes(n.id))
      .map((n) => n.id);
  };

  const resetToDefault = async () => {
    const defaultNetworks = getDefaultNetworks();
    setNetworks(defaultNetworks);
    if (storeRef.current) {
      await storeRef.current.clear();
      await storeRef.current.save();
    }
  };

  return (
    <SocialNetworksContext.Provider
      value={{
        networks,
        loading,
        updateNetwork,
        toggleNetwork,
        getNetworkValue,
        isNetworkEnabled,
        addNetwork,
        removeNetwork,
        getAvailableNetworks,
        resetToDefault,
        pendingEditId,
        clearPendingEdit,
        canEnableNetwork,
        enabledCount: getEnabledCount(),
        maxEnabledNetworks: MAX_ENABLED_NETWORKS,
      }}
    >
      {children}
    </SocialNetworksContext.Provider>
  );
}

export function useSocialNetworks() {
  const context = useContext(SocialNetworksContext);
  if (!context) {
    throw new Error(
      "useSocialNetworks must be used within SocialNetworksProvider"
    );
  }
  return context;
}
