import GroundScene from './Scenes/GroundScene/GroundScene'
import Camera from './Cameras/Camera'
import Application from './Application'
import Menu from './Objects/Menu'
import ScenesMenu from './Objects/ScenesMenu'
import TableScene from './Scenes/TableScene'

const mainMenu = new Menu();

const mainScene = (new GroundScene());
mainScene.onMenu(mainMenu);
const tableScene = new TableScene();

const scenesMenu =new ScenesMenu(mainMenu);

const app = new Application()
const camera = new Camera()
app.setCamera(camera).addScene(mainScene).addScene(tableScene)
app.onMenu(scenesMenu)

camera.onMenu(mainMenu)

app.registerUpdate(mainScene)

app.onBoot()
