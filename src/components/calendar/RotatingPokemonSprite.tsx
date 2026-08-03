import { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import type { CalendarSprite } from '../../utils/calendarSpriteUtils';

const ROTATION_INTERVAL_MS = 3000;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

interface RotatingPokemonSpriteProps {
  eventId: string;
  rotate: boolean;
  sprites: CalendarSprite[];
}

function getStableOffset(value: string, length: number): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash % length;
}

export function RotatingPokemonSprite({ eventId, rotate, sprites }: RotatingPokemonSpriteProps) {
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const [failedUrls, setFailedUrls] = useState<Set<string>>(() => new Set());
  const availableSprites = useMemo(
    () => sprites.filter((sprite) => !failedUrls.has(sprite.asset_url)),
    [failedUrls, sprites]
  );
  const [rotationIndex, setRotationIndex] = useState(() =>
    getStableOffset(eventId, Math.max(sprites.length, 1))
  );

  useEffect(() => {
    if (!rotate || prefersReducedMotion || availableSprites.length < 2) return;

    const timer = window.setInterval(() => {
      setRotationIndex((current) => current + 1);
    }, ROTATION_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [availableSprites.length, prefersReducedMotion, rotate]);

  if (availableSprites.length === 0) return null;

  const sprite = availableSprites[rotationIndex % availableSprites.length];

  return (
    <img
      key={sprite.asset_url}
      src={sprite.asset_url}
      alt=""
      aria-hidden="true"
      draggable={false}
      className="h-5 w-5 shrink-0 animate-in object-contain duration-200 fade-in"
      onError={() => {
        setFailedUrls((current) => new Set(current).add(sprite.asset_url));
      }}
    />
  );
}
