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

const ground = new Ground();
ground.onMenu(menuProvider)
scene.add(ground.getProvider())
renderer.registerUpdate(ground)
renderer.onBoot()
