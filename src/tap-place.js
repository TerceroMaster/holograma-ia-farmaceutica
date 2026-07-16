// Component that places cacti where the ground is clicked

export const tapPlaceComponent = {
  schema: {
    min: {default: 6},
    max: {default: 10},
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

      const randomScale = Math.floor(Math.random() * (Math.floor(this.data.max) - Math.ceil(this.data.min)) + Math.ceil(this.data.min))

      newElement.setAttribute('visible', 'false')
      newElement.setAttribute('scale', '0.0001 0.0001 0.0001')

      newElement.setAttribute('shadow', {
        receive: false,
      })

      // Holographic Avatar Plane
      const avatarPlane = document.createElement('a-plane')
      avatarPlane.setAttribute('width', '2')
      avatarPlane.setAttribute('height', '4') // Make it tall like a human
      avatarPlane.setAttribute('position', '0 2 0') // Lift it up
      // Floating animation
      avatarPlane.setAttribute('animation__pos', {
        property: 'position',
        to: '0 2.2 0',
        dir: 'alternate',
        loop: 'true',
        dur: 2000,
        easing: 'easeInOutSine'
      })

      // Holographic Additive Material
      avatarPlane.setAttribute('material', 'shader: flat; src: #avatarTex; transparent: true; blending: additive; depthWrite: false; side: double')
      
      newElement.appendChild(avatarPlane)
      
      this.el.sceneEl.appendChild(newElement)

      // Pop-in animation
      newElement.setAttribute('visible', 'true')
      newElement.setAttribute('animation', {
        property: 'scale',
        to: `${randomScale} ${randomScale} ${randomScale}`,
        easing: 'easeOutElastic',
        dur: 800,
      })
    })
  },
}
