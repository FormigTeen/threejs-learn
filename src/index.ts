import GroundScene from './Scenes/GroundScene/GroundScene';
import BezierScene from './Scenes/BezierScene/BezierScene';
import Application from './Application';
import ScenesMenu from './Objects/ScenesMenu';
import SolarScene from './Scenes/SolarScene/SolarScene';
import TravelScene from './Scenes/TravelScene/TravelScene';
import TableScene from '@/Scenes/TableScene/TableScene';

new Application()
  .useMenu()
  .addScene(new BezierScene())
  .addScene(new TableScene())
  .addScene(new GroundScene())
  .addScene(new TravelScene())
  .addScene(new SolarScene())
  .onFuncMenu((_, anApp) => anApp.onMenu(new ScenesMenu(_)))
  .onBoot();
