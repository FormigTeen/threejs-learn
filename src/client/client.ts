import GroundScene from './Scenes/GroundScene/GroundScene'
import Camera from './Scenes/GroundScene/Objects/Camera'
import Application from './Application'
import Menu from './Objects/Menu'
import ScenesMenu from './Objects/ScenesMenu'
import TableScene from './Scenes/TableScene/TableScene'

const mainMenu = new Menu();

const mainScene = (new GroundScene());
const tableScene = new TableScene();

mainScene.onMenu(mainMenu);
tableScene.onMenu(mainMenu);


const scenesMenu =new ScenesMenu(mainMenu);

const app = new Application()
app.addScene(tableScene)
app.addScene(mainScene)
app.onMenu(scenesMenu)

app.registerUpdate(mainScene)

app.onBoot()