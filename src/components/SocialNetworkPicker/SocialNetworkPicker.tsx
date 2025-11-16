import { useState, useEffect, useRef } from "react";
import { useSprings, animated } from "@react-spring/web";
import { ReactNode } from "react";

interface SocialNetwork {
  name: string;
  id: string;
  icon: ReactNode;
  value: string;
}

interface Props {
  socialNetworks: SocialNetwork[];
  onSelect: (unselected: SocialNetwork[], selected: SocialNetwork[]) => void;
}

export default function SocialNetworkPicker({
  socialNetworks,
  onSelect,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const socNetw = socialNetworks.map((network, index) => {
    return {
      ...network,
      index,
    };
  });
  // Состояние - группы квадратов
  const [group1, setGroup1] = useState(
    socNetw.slice(1).map((_, index) => index + 1)
  );
  const [group2, setGroup2] = useState([0]);

  // Адаптивный размер базового элемента
  const [baseSize, setBaseSize] = useState(16);

  useEffect(() => {
    const updateSize = () => {
      const screenWidth = window.innerWidth;
      // Масштабируем базовый размер в зависимости от ширины экрана
      if (screenWidth < 360) {
        setBaseSize(12); // Очень маленькие телефоны
      } else if (screenWidth < 400) {
        setBaseSize(14); // Маленькие телефоны
      } else if (screenWidth < 480) {
        setBaseSize(15); // Средние телефоны
      } else {
        setBaseSize(16); // Большие телефоны и планшеты
      }

      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Обновляем ширину контейнера при изменении групп
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, [group1, group2]);

  // Вызываем onSelect при изменении групп
  const prevGroup1Ref = useRef(group1);
  const prevGroup2Ref = useRef(group2);

  useEffect(() => {
    // Только вызываем onSelect если группы действительно изменились
    if (prevGroup1Ref.current !== group1 || prevGroup2Ref.current !== group2) {
      prevGroup1Ref.current = group1;
      prevGroup2Ref.current = group2;
      const unselectedNetworks = group1.map((index) => socialNetworks[index]);
      const selectedNetworks = group2.map((index) => socialNetworks[index]);
      onSelect(unselectedNetworks, selectedNetworks);
    }
  }, [group1, group2, socialNetworks, onSelect]);

  // Перемещение квадрата между группами
  const moveSquare = (id: number) => {
    if (group1.includes(id)) {
      // Проверяем, что в группе 1 больше одного квадрата
      if (group1.length <= 1) return;
      // Перемещаем из группы 1 в группу 2
      setGroup1((prev) => prev.filter((squareId) => squareId !== id));
      setGroup2((prev) => [...prev, id]);
    } else {
      // Проверяем, что в группе 2 больше одного квадрата
      if (group2.length <= 1) return;
      // Перемещаем из группы 2 в группу 1
      setGroup2((prev) => prev.filter((squareId) => squareId !== id));
      setGroup1((prev) => [...prev, id]);
    }
  };

  const squareSize = 3;
  const gap = 1;
  const groupGap = 1;
  const padding = 0.8;

  // Рассчитываем ширину каждой группы в em
  const group1Width =
    group1.length > 0
      ? group1.length * squareSize + (group1.length - 1) * gap + padding * 2
      : squareSize + padding * 2;
  const group2Width =
    group2.length > 0
      ? group2.length * squareSize + (group2.length - 1) * gap + padding * 2
      : squareSize + padding * 2;

  // Вычисляем общую ширину компонента в em
  const totalWidthEm = group1Width + groupGap + group2Width;

  // Рассчитываем процентные ширины для 100% заполнения
  const group1Percent = (group1Width / totalWidthEm) * 100;
  const group2Percent = (group2Width / totalWidthEm) * 100;
  const groupGapPercent = (groupGap / totalWidthEm) * 100;

  // Рассчитываем адаптивный размер иконок
  const iconSize = Math.round(baseSize * 1.5);

  // Конвертируем em в пиксели для анимации
  const emToPx = baseSize;
  const squareSizePx = squareSize * emToPx;
  const gapPx = gap * emToPx;
  const paddingPx = padding * emToPx;

  // Рассчитываем ширины групп в пикселях на основе контейнера
  const group1WidthPx = containerWidth * (group1Percent / 100);
  const group2WidthPx = containerWidth * (group2Percent / 100);

  // Создаем анимации для всех квадратов
  const [springs] = useSprings(
    socNetw.length,
    (index) => {
      const squareId = socNetw[index].index;
      const inGroup1 = group1.includes(squareId);
      const inGroup2 = group2.includes(squareId);

      let x = 0;

      if (inGroup1) {
        const posInGroup = group1.indexOf(squareId);
        // Позиция внутри группы 1
        const itemWidthRatio = squareSizePx / (group1WidthPx || 1);
        const gapRatio = gapPx / (group1WidthPx || 1);
        const paddingRatio = paddingPx / (group1WidthPx || 1);
        const xRatio = paddingRatio + posInGroup * (itemWidthRatio + gapRatio);
        x = xRatio * group1WidthPx - 0 * emToPx;
      } else if (inGroup2) {
        const posInGroup = group2.indexOf(squareId);
        // Группа 2 начинается после группы 1 и gap
        const group2StartPx =
          group1WidthPx + containerWidth * (groupGapPercent / 100);
        const itemWidthRatio = squareSizePx / (group2WidthPx || 1);
        const gapRatio = gapPx / (group2WidthPx || 1);
        const paddingRatio = paddingPx / (group2WidthPx || 1);
        const xRatio = paddingRatio + posInGroup * (itemWidthRatio + gapRatio);
        x = group2StartPx + xRatio * group2WidthPx - 0.87 * emToPx;
      }

      return {
        transform: `translateX(${x}px)`,
        config: { tension: 200, friction: 20 },
      };
    },
    [group1, group2, group1WidthPx, group2WidthPx, containerWidth]
  );

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: `${squareSize + padding * 2}em`,
        fontSize: `${baseSize}px`,
        gap: `${groupGapPercent}%`,
      }}
    >
      {/* Группа 1 - невыбранные */}
      <div
        style={{
          position: "relative",
          width: `${group1Percent}%`,
          height: "100%",
          borderRadius: "4em",
          transition: "width 0.3s ease",
          backgroundColor: "var(--md-sys-color-surface-container)",
          flexShrink: 0,
        }}
      />

      {/* Группа 2 - выбранные */}
      <div
        style={{
          position: "relative",
          width: `${group2Percent}%`,
          height: "100%",
          borderRadius: "4em",
          transition: "width 0.3s ease",
          backgroundColor: "var(--md-sys-color-secondary-container)",
          flexShrink: 0,
        }}
      />

      {/* Анимированные иконки поверх групп */}
      {springs.map((style, index) => {
        const square = socNetw[index];

        return (
          <animated.div
            key={square.id}
            onClick={() => {
              moveSquare(square.index);
              console.log(square.name);
            }}
            style={{
              ...style,
              position: "absolute",
              top: `${((padding - 0.7) / (squareSize + padding * 2)) * 100}%`,
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <div
              style={{
                width: `${squareSize}em`,
                height: `${squareSize}em`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: `${iconSize}px`,
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              {square.icon}
            </div>
          </animated.div>
        );
      })}
    </div>
  );
}
