export const getColors = () => {
  const unParsed = localStorage.getItem('colors')
  const colors = JSON.parse(unParsed)
  return colors
}
export const setColorSection = (section, color) => {
  document.documentElement.style.setProperty(`--${section}`, color)
  const unParsed = localStorage.getItem('colors')
  let colors = JSON.parse(unParsed)
  colors[section] = color
  localStorage.setItem('colors', JSON.stringify(colors))
}

export const load = () => {
  const unParsed = localStorage.getItem('colors')
  console.log(unParsed)
  let colors = null
  try {
    colors = JSON.parse(unParsed)
  } catch (e) {}
  if (!colors)
    colors = {
      primary: '#1e272e',
      secondary: '#485460',
      text: '#cad3c8',
      suffix: '#00ff99',
      prefix: '#ff0055',
      exotic: '#82589f',
      rey: '#fff200',
    }
  document.documentElement.style.setProperty(`--primary`, colors.primary)
  document.documentElement.style.setProperty(`--secondary`, colors.secondary)
  document.documentElement.style.setProperty(`--text`, colors.text)
  document.documentElement.style.setProperty(`--prefix`, colors.prefix)
  document.documentElement.style.setProperty(`--suffix`, colors.suffix)
  document.documentElement.style.setProperty(`--exotic`, colors.exotic)
  console.log(colors)
  document.documentElement.style.setProperty(`--rey`, colors.rey)
  localStorage.setItem('colors', JSON.stringify(colors))
}
