import * as THREE from 'three'

const PARTICLE_COUNT = 50000
const MOBILE_PARTICLE_COUNT = 15000
const GRID_SPACING = 0.18
const OVERSCAN = 2.0

/**
 * Generate a hex grid of particle positions with 2x viewport overscan.
 * Returns typed arrays for aGridPos, aOffset, aPhase, and line geometry.
 */
export function createParticleGrid(isMobile = false) {
  const count = isMobile ? MOBILE_PARTICLE_COUNT : PARTICLE_COUNT

  // Calculate grid extent: enough to cover 2x the max viewport diagonal
  // Assuming camera at Z=-5 to -12, FOV ~75, max aspect ~3.5 (ultrawide)
  const maxWorldWidth = 20.0 * OVERSCAN
  const maxWorldHeight = 12.0 * OVERSCAN

  // Generate hex grid positions
  const positions = []
  const halfW = maxWorldWidth / 2
  const halfH = maxWorldHeight / 2
  const rowHeight = GRID_SPACING * Math.sqrt(3) / 2

  let row = 0
  for (let y = -halfH; y <= halfH; y += rowHeight) {
    const xOffset = (row % 2) * (GRID_SPACING / 2)
    for (let x = -halfW + xOffset; x <= halfW; x += GRID_SPACING) {
      positions.push(x, y, 0)
      if (positions.length / 3 >= count) break
    }
    if (positions.length / 3 >= count) break
    row++
  }

  // Trim to exact count
  const actualCount = Math.min(positions.length / 3, count)
  const gridPos = new Float32Array(actualCount * 3)
  const offsets = new Float32Array(actualCount * 3)
  const phases = new Float32Array(actualCount)

  for (let i = 0; i < actualCount; i++) {
    gridPos[i * 3] = positions[i * 3]
    gridPos[i * 3 + 1] = positions[i * 3 + 1]
    gridPos[i * 3 + 2] = positions[i * 3 + 2]

    // Random offset seeds for Brownian noise (deterministic per particle)
    offsets[i * 3] = Math.random() * 100
    offsets[i * 3 + 1] = Math.random() * 100
    offsets[i * 3 + 2] = Math.random() * 100

    // Random phase offset for animation variety
    phases[i] = Math.random() * Math.PI * 2
  }

  return { gridPos, offsets, phases, count: actualCount }
}

/**
 * Generate LineSegments geometry connecting each particle to its hex neighbors.
 * Static geometry — never updated. GPU vertex shader animates positions.
 */
export function createLineGeometry(gridPos, offsets, phases, count) {
  // Build spatial index for neighbor lookup
  const cellSize = GRID_SPACING * 1.5
  const cells = new Map()

  for (let i = 0; i < count; i++) {
    const x = gridPos[i * 3]
    const y = gridPos[i * 3 + 1]
    const cx = Math.floor(x / cellSize)
    const cy = Math.floor(y / cellSize)
    const key = `${cx},${cy}`
    if (!cells.has(key)) cells.set(key, [])
    cells.get(key).push(i)
  }

  const MAX_NEIGHBORS = 3
  const linePositions = []
  const lineOffsets = []
  const linePhases = []

  for (let i = 0; i < count; i++) {
    const x = gridPos[i * 3]
    const y = gridPos[i * 3 + 1]
    const cx = Math.floor(x / cellSize)
    const cy = Math.floor(y / cellSize)

    let neighborCount = 0

    // Search nearby cells
    for (let dx = -1; dx <= 1 && neighborCount < MAX_NEIGHBORS; dx++) {
      for (let dy = -1; dy <= 1 && neighborCount < MAX_NEIGHBORS; dy++) {
        const key = `${cx + dx},${cy + dy}`
        const cell = cells.get(key)
        if (!cell) continue

        for (let k = 0; k < cell.length && neighborCount < MAX_NEIGHBORS; k++) {
          const j = cell[k]
          if (j <= i) continue // avoid duplicates

          const jx = gridPos[j * 3]
          const jy = gridPos[j * 3 + 1]
          const dist = Math.sqrt((x - jx) ** 2 + (y - jy) ** 2)

          if (dist < GRID_SPACING * 1.3) {
            // Line segment: two vertices with their respective particle attributes
            // Vertex A (particle i)
            linePositions.push(gridPos[i * 3], gridPos[i * 3 + 1], gridPos[i * 3 + 2])
            lineOffsets.push(offsets[i * 3], offsets[i * 3 + 1], offsets[i * 3 + 2])
            linePhases.push(phases[i])

            // Vertex B (particle j)
            linePositions.push(gridPos[j * 3], gridPos[j * 3 + 1], gridPos[j * 3 + 2])
            lineOffsets.push(offsets[j * 3], offsets[j * 3 + 1], offsets[j * 3 + 2])
            linePhases.push(phases[j])

            neighborCount++
          }
        }
      }
    }
  }

  return {
    positions: new Float32Array(linePositions),
    offsets: new Float32Array(lineOffsets),
    phases: new Float32Array(linePhases),
    count: linePositions.length / 3,
  }
}
