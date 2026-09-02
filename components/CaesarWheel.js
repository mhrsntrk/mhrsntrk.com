import { useRef } from 'react';

import { ALPHABET } from '@/lib/ciphers';

const STEP = 360 / 26;
const mod = (n, m) => ((n % m) + m) % m;
const polar = (cx, cy, r, deg) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
};

/**
 * The outer ring is the plain alphabet and never moves. The inner ring is the
 * cipher alphabet and rotates by -shift, so the letter sitting under plain A is
 * always A+shift. Each inner glyph carries the opposite rotation about its own
 * anchor so it stays upright while the ring turns.
 */
export default function CaesarWheel({ shift, onShift }) {
  const svgRef = useRef(null);
  const drag = useRef(null);

  const angleAt = (event) => {
    const box = svgRef.current.getBoundingClientRect();
    const cx = box.left + box.width / 2;
    const cy = box.top + box.height / 2;
    return (Math.atan2(event.clientY - cy, event.clientX - cx) * 180) / Math.PI;
  };

  const onPointerDown = (event) => {
    drag.current = { from: angleAt(event), shift };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event) => {
    if (!drag.current) return;
    const delta = angleAt(event) - drag.current.from;
    onShift(mod(Math.round(drag.current.shift - delta / STEP), 26));
  };
  const onPointerUp = () => {
    drag.current = null;
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 240 240"
      role="img"
      aria-label={`Caesar wheel set to shift ${shift}`}
      className="w-full h-auto select-none cursor-move"
      style={{ touchAction: 'none' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <circle
        cx="120"
        cy="120"
        r="114"
        className="fill-current text-gray-100 dark:text-gray-900"
      />
      <circle
        cx="120"
        cy="120"
        r="88"
        className="fill-current text-white dark:text-black"
      />
      <circle
        cx="120"
        cy="120"
        r="46"
        className="fill-current text-gray-100 dark:text-gray-900"
      />

      {ALPHABET.split('').map((letter, i) => {
        const [x, y] = polar(120, 120, 101, i * STEP);
        return (
          <text
            key={`outer-${letter}`}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="11"
            className={`font-mono fill-current ${
              i === 0 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {letter}
          </text>
        );
      })}

      <g transform={`rotate(${-shift * STEP} 120 120)`}>
        {ALPHABET.split('').map((letter, i) => {
          const [x, y] = polar(120, 120, 67, i * STEP);
          return (
            <text
              key={`inner-${letter}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="12"
              transform={`rotate(${shift * STEP} ${x} ${y})`}
              className={`font-mono fill-current ${
                i === shift ? 'text-red-500' : 'text-gray-900 dark:text-gray-100'
              }`}
            >
              {letter}
            </text>
          );
        })}
      </g>

      <text
        x="120"
        y="114"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="26"
        className="font-mono fill-current text-gray-900 dark:text-gray-100"
      >
        {shift}
      </text>
      <text
        x="120"
        y="136"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="8"
        className="font-mono fill-current text-gray-500 dark:text-gray-400"
      >
        SHIFT
      </text>
    </svg>
  );
}
