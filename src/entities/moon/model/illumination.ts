export const getMoonIllumination = (phase: number) => {
  // Освещенность = |sin(π × phase)| для упрощения
  const illumination = Math.abs(Math.sin(Math.PI * phase));
  return Math.round(illumination * 100);
}
