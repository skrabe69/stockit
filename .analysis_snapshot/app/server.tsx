import { createStartHandler } from '@tanstack/start/server'
import { getRouterManifest } from '@tanstack/start/router-manifest'

export default createStartHandler({
  getRouterManifest,
})
