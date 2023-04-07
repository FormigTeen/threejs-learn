import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Main from './Scenes/Main'
import Camera from './Cameras/Camera'
import Application from './Application'
import Menu from './Objects/Menu'
import Ground from './Objects/Ground/Ground'

const sceneProvider = new Main();
const scene = sceneProvider.getProvider()
const menuProvider = new Menu();


const renderer = new Application()
renderer.setCamera(new Camera()).setScene(sceneProvider)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})

const ground = new Ground();
scene.add(ground.getProvider())


function animate() {
    requestAnimationFrame(animate)
    renderer.onRender()
}

animate()
