// useParticleData.js — Shared particle grid data for ParticleField + GridLines
// Must generate once and share so random seeds match between points and lines

import { useMemo } from 'react'
import { createParticleGrid, createLineGeometry } from './particleGrid'

export default function useParticleData(isMobile) {
  return useMemo(() => {
    const grid = createParticleGrid(isMobile)
    const lines = createLineGeometry(grid.gridPos, grid.offsets, grid.phases, grid.count)
    return { grid, lines }
  }, [isMobile])
}
