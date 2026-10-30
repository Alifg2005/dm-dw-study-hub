import { useState } from 'react'

const DIMENSIONS = ['T', 'I', 'L', 'S']

const WIDTH = 480
const HEIGHT = 360
const LEVEL_Y = [36, 108, 180, 252, 324]

interface LatticeNode {
  id: string
  x: number
  y: number
}

function buildLattice() {
  const levels: string[][] = [[], [], [], [], []]
  for (let mask = 0; mask < 16; mask++) {
    const id = DIMENSIONS.filter((_, bit) => mask & (1 << bit)).join('')
    levels[id.length].push(id)
  }
  const nodes: LatticeNode[] = levels.flatMap((ids, level) =>
    ids.map((id, index) => ({
      id,
      x: (WIDTH * (index + 1)) / (ids.length + 1),
      y: LEVEL_Y[level],
    })),
  )
  const edges = nodes.flatMap((from) =>
    nodes
      .filter((to) => to.id.length === from.id.length + 1 && [...from.id].every((dim) => to.id.includes(dim)))
      .map((to) => ({ from, to })),
  )
  return { nodes, edges }
}

const { nodes, edges } = buildLattice()

function isRelated(a: string, b: string) {
  return [...a].every((dim) => b.includes(dim)) || [...b].every((dim) => a.includes(dim))
}

/** The 4-D lattice of cuboids, used as an interactive figure: hover a cuboid to see its roll-up and drill-down paths. */
export function CuboidLattice() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <figure>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-auto w-full"
        role="img"
        aria-label="Lattice of cuboids for four dimensions, from the 0-D apex cuboid at the top to the 4-D base cuboid at the bottom."
      >
        {edges.map(({ from, to }, index) => {
          const lit = active !== null && isRelated(from.id, active) && isRelated(to.id, active)
          return (
            <line
              key={`${from.id}-${to.id}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              pathLength={1}
              className="lattice-edge transition-[stroke,stroke-width] duration-200"
              style={{ '--i': index } as React.CSSProperties}
              stroke={lit ? 'var(--accent)' : 'var(--line-strong)'}
              strokeWidth={lit ? 2 : 1}
              opacity={active && !lit ? 0.35 : 1}
            />
          )
        })}
        {nodes.map((node) => {
          const lit = active !== null && isRelated(node.id, active)
          const selected = node.id === active
          const label = node.id || 'all'
          return (
            <g
              key={label}
              onPointerEnter={() => setActive(node.id)}
              onPointerLeave={() => setActive(null)}
              onPointerDown={() => setActive(node.id)}
            >
              <rect
                x={node.x - 23}
                y={node.y - 15}
                width={46}
                height={30}
                rx={8}
                fill={selected ? 'var(--accent)' : 'var(--surface)'}
                stroke={lit ? 'var(--accent)' : 'var(--line-strong)'}
                className="transition-colors duration-200"
              />
              <text
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                fontSize={12}
                fill={selected ? 'var(--accent-ink)' : 'var(--ink)'}
                className="pointer-events-none select-none font-mono"
              >
                {label}
              </text>
            </g>
          )
        })}
      </svg>
      <figcaption className="mt-3 text-sm text-ink-faint">
        A lattice of cuboids for time (T), item (I), location (L) and supplier (S). Point at a cuboid to trace its
        roll-up and drill-down paths.
      </figcaption>
    </figure>
  )
}
