// Component that places cacti where the ground is clicked

export const tapPlaceComponent = {
  schema: {
    min: {default: 6},
    max: {default: 10},
    imageId: {type: 'string', default: '#avatarTex'},
    assetWidth: {type: 'number', default: 2},
    assetHeight: {type: 'number', default: 4},
    baseScale: {type: 'number', default: 5},
    floating: {type: 'boolean', default: true},
  },
  init() {
    const ground = document.getElementById('ground')
    this.prompt = document.getElementById('promptText')
    
    ground.addEventListener('click', (event) => {
      // Dismiss the prompt text.
      this.prompt.style.display = 'none'
      
      // Create new entity for the new object
      const newElement = document.createElement('a-entity')

      // The raycaster gives a location of the touch in the scene
      const touchPoint = event.detail.intersection.point
      newElement.setAttribute('position', touchPoint)

      const randomYRotation = Math.random() * 360
      newElement.setAttribute('rotation', `0 ${randomYRotation} 0`)

      // Tamaño inicial realista tomado del schema
      const fixedScale = this.data.baseScale

      newElement.setAttribute('visible', 'false')
      newElement.setAttribute('scale', '0.0001 0.0001 0.0001')

      // Agregar interactividad con los dedos (Zoom / Escala y Rotación)
      newElement.classList.add('cantap')
      newElement.setAttribute('xrextras-hold-drag', '')
      newElement.setAttribute('xrextras-two-finger-rotate', '')
      newElement.setAttribute('xrextras-pinch-scale', {
        min: 0.5,
        max: 20
      })

      newElement.setAttribute('shadow', {
        receive: false,
      })

      // Holographic Avatar Plane
      const avatarPlane = document.createElement('a-plane')
      avatarPlane.setAttribute('width', this.data.assetWidth)
      avatarPlane.setAttribute('height', this.data.assetHeight) 
      avatarPlane.setAttribute('position', `0 ${this.data.assetHeight/2} 0`) // Lift it up
      
      if (this.data.floating) {
        // Floating animation
        avatarPlane.setAttribute('animation__pos', {
          property: 'position',
          to: `0 ${(this.data.assetHeight/2) + 0.2} 0`,
          dir: 'alternate',
          loop: 'true',
          dur: 2000,
          easing: 'easeInOutSine'
        })
      }

      // Holographic Additive Material
      avatarPlane.setAttribute('material', `shader: flat; src: ${this.data.imageId}; transparent: true; blending: additive; depthWrite: false; side: double`)

      
      newElement.appendChild(avatarPlane)
      
      this.el.sceneEl.appendChild(newElement)

      // Pop-in animation
      newElement.setAttribute('visible', 'true')
      newElement.setAttribute('animation', {
        property: 'scale',
        to: `${fixedScale} ${fixedScale} ${fixedScale}`,
        easing: 'easeOutElastic',
        dur: 800,
      })
    })
  },
}
