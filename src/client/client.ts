import GroundScene from './Scenes/GroundScene/GroundScene'
import BezierScene from './Scenes/BezierScene/BezierScene'
import Application from './Application'
import ScenesMenu from './Objects/ScenesMenu'
import TableScene from './Scenes/TableScene/TableScene'



(new Application())
    .useMenu()
    .addScene(new BezierScene())
    //.addScene(new TableScene())
    //.addScene(new GroundScene())
    .onFuncMenu((_, anApp) => anApp.onMenu(new ScenesMenu(_)))
    .onBoot()
