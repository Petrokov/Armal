export const getWaterMixerLabel = (t, collectionKey, key) => {
  const overrideKey = `faucetsPage.sections.waterMixersOverrides.${collectionKey}.${key}`
  const overrideLabel = t(overrideKey)
  if (overrideLabel !== overrideKey) return overrideLabel
  return t(`faucetsPage.sections.waterMixers.${key}`)
}
