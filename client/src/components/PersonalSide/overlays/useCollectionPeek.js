import { useEffect, useRef, useState } from "react";

export default function useCollectionPeek() {
  const [selectedId, setSelectedId] = useState(null);
  const [isPeekVisible, setIsPeekVisible] = useState(false);
  const triggerRef = useRef(null);
  const peekHeadingRef = useRef(null);
  useEffect(() => {
    if (!selectedId) return;
    peekHeadingRef.current?.focus({ preventScroll: true });
    let secondFrame;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setIsPeekVisible(true));
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, [selectedId]);
  const finishClosingPeek = () => {
    setSelectedId(null);
    setIsPeekVisible(false);
    requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
  };
  const closePeek = () => {
    if (!isPeekVisible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) finishClosingPeek();
    else setIsPeekVisible(false);
  };
  const openPeek = (id, trigger) => {
    triggerRef.current = trigger;
    if (selectedId) setIsPeekVisible(true);
    setSelectedId(id);
  };
  const onPeekKeyDown = event => {
    if (event.key === "Escape" && selectedId) {
      event.preventDefault();
      event.stopPropagation();
      closePeek();
    }
  };
  const onPeekTransitionEnd = event => {
    if (event.target === event.currentTarget && event.propertyName === "transform" && !isPeekVisible) finishClosingPeek();
  };
  return { selectedId, isPeekVisible, peekHeadingRef, openPeek, closePeek, onPeekKeyDown, onPeekTransitionEnd };
}
