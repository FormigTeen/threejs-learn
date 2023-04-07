import Menu from '../Objects/Menu'

export default interface IHasMenu {
    onMenu(aMenu: Menu): Menu
}
