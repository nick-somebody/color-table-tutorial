export const newColorScore = () => {
  return Math.round(Math.random() * 255)
}

export const newRgb = () => {
  return {
    r: newColorScore(),
    g: newColorScore(),
    b: newColorScore(),
  }
}