import { useState, useEffect, useRef, useMemo } from "react";

interface GridPosition {
  top: number;
  left: number;
  width: number;
  height: number;
  colIndex: number;
  totalCols: number;
}

interface UseGridLayoutResult {
  containerRef: React.RefObject<HTMLDivElement>;
  positions: GridPosition[];
  totalHeight: number;
}

export const useGridLayout = (itemCount: number): UseGridLayoutResult => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(typeof window !== 'undefined' ? Math.min(window.innerWidth, 1200) : 1200);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(Math.min(containerRef.current.offsetWidth, 1200));
      }
    };
    updateWidth();

    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const layout = useMemo(() => {
    // Ensure we never exceed 1200 for calculation even if something slips through
    const safeWidth = Math.min(containerWidth, 1200);

    if (safeWidth === 0 || itemCount === 0) {
      return { positions: [], totalHeight: 0 };
    }

    const isMobile = window.innerWidth < 768;
    const minCardWidth = isMobile ? 160 : 220;
    const columns = Math.max(1, Math.floor(safeWidth / minCardWidth));
    const cardWidth = safeWidth / columns;
    const cardHeight = cardWidth * 1.5;

    const positions: GridPosition[] = Array.from({ length: itemCount }, (_, index) => {
      const row = Math.floor(index / columns);
      const col = index % columns;
      return {
        top: row * cardHeight,
        left: col * cardWidth,
        width: cardWidth,
        height: cardHeight,
        colIndex: col,
        totalCols: columns,
      };
    });

    const totalRows = Math.ceil(itemCount / columns);
    return { positions, totalHeight: totalRows * cardHeight };
  }, [containerWidth, itemCount]);

  return {
    containerRef,
    positions: layout.positions,
    totalHeight: layout.totalHeight,
  };
};
