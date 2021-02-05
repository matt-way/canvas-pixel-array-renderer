if(!state.canvases){
  state.canvases = []
}

const dataArrays = Array.isArray(state.pixelArrays[0]) ? state.pixelArrays : [state.pixelArrays]

if(dataArrays.length !== state.canvases.length) {
  element.innerHTML = ''
  state.canvases = dataArrays.map(() => {
    const canvas = document.createElement('canvas')
    canvas.style.margin = '2px'
    canvas.style.display = 'block'    
    element.appendChild(canvas)
    return canvas
  })
}

//onChange(() => {
if(state.canvases.length > 0 && (state.canvases[0].width !== state.width || state.canvases[0].height !== state.height)){
  state.canvases.forEach(c => {
    c.width = state.width * state.zoom
    c.height = state.height * state.zoom
  })
}
//}, [state.width, state.height])

dataArrays.forEach((pixelData, i) => {
  const canvas = state.canvases[i]
  const ctx = canvas.getContext('2d')
  const imageData = ctx.getImageData(0, 0, state.width, state.height)
  const idata = imageData.data
  for(var i=0; i<pixelData.length; i++){
    const val = Math.floor(pixelData[i] * 255)
    const pos = i * 4
    idata[pos] = idata[pos+1] = idata[pos+2] = val
    idata[pos+3] = 255
  }
  ctx.putImageData(imageData, 0, 0, 0, 0, state.width, state.height)
  ctx.imageSmoothingEnabled = false
  ctx.drawImage(canvas, 0, 0, state.width, state.height, 0, 0, canvas.width, canvas.height)
})