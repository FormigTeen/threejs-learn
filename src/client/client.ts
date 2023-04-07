import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Main from './Scenes/Main'
import Camera from './Cameras/Camera'
import Application from './Application'
import Menu from './Objects/Menu'
import Ground from './Objects/Ground/Ground'
import { cameraNormalMatrix } from 'three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements'

const sceneProvider = new Main();
const scene = sceneProvider.getProvider()
const menuProvider = new Menu();


const renderer = new Application()
const camera = new Camera()
renderer.setCamera(camera).setScene(sceneProvider)

const ground = new Ground();
ground.onMenu(menuProvider)
camera.onMenu(menuProvider)
scene.add(ground.getProvider())
renderer.registerUpdate(ground)
renderer.onBoot()
