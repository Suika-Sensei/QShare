import { useState } from "react";
import { useSprings, animated } from "@react-spring/web";
import { ReactNode } from "react";

interface SocialNetwork {
  name: string;
  id: string;
  icon: ReactNode;
}

interface Props {
  socialNetworks: SocialNetwork[];
}

export default function SocialNetworkPicker({ socialNetworks }: Props) {
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
  const padding = 1;

  // Рассчитываем ширину каждой группы
  const group1Width =
    group1.length > 0
      ? group1.length * squareSize + (group1.length - 1) * gap + padding * 2
      : squareSize + padding * 2;
  const group2Width =
    group2.length > 0
      ? group2.length * squareSize + (group2.length - 1) * gap + padding * 2
      : squareSize + padding * 2;

  // Вычисляем общую ширину компонента
  const totalWidth = group1Width + groupGap + group2Width + 1;

  // Создаем анимации для всех квадратов
  const [springs] = useSprings(
    socNetw.length,
    (index) => {
      const squareId = socNetw[index].index;
      const inGroup1 = group1.includes(squareId);
      const inGroup2 = group2.includes(squareId);

      let x = 0;
      let y = 0;

      if (inGroup1) {
        const posInGroup = group1.indexOf(squareId);
        x = padding + posInGroup * (squareSize + gap);
        y = padding;
      } else if (inGroup2) {
        const posInGroup = group2.indexOf(squareId);
        x = group1Width + groupGap + padding + posInGroup * (squareSize + gap);
        y = padding;
      }

      return {
        transform: `translate(${x}em, ${y}em)`,
        config: { tension: 200, friction: 20 },
      };
    },
    [group1, group2, group1Width]
  );

  return (
    <div
      style={{
        display: "inline-flex",
        marginLeft: `calc(50vw - ${totalWidth / 2}em)`,
      }}
    >
      <div
        style={{
          position: "relative",
          height: `${squareSize + padding * 3}em`,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: `${group1Width}em`,
            left: `${padding / 1.2}em`,
            height: `${squareSize + padding + 2}em`,
            top: `${padding / 3}em`,
            borderRadius: "4em",
            transition: "width 0.3s ease",
            backgroundColor: "var(--md-sys-color-surface-container)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: `${group1Width + groupGap + 0.8}em`,
            width: `${group2Width}em`,
            height: `${squareSize + padding + 2}em`,
            top: `${padding / 3}em`,
            borderRadius: "4em",
            transition: "width 0.3s ease, left 0.3s ease",
            backgroundColor: "var(--md-sys-color-secondary-container)",
          }}
        />
        {springs.map((style, index) => {
          const square = socNetw[index];

          return (
            <animated.div
              key={square.id}
              onClick={() => moveSquare(square.index)}
              style={{
                ...style,
                position: "absolute",
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

                  fontSize: "24px",
                }}
              >
                {square.icon}
              </div>
            </animated.div>
          );
        })}
      </div>
    </div>
  );
}
