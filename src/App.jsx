import React from 'react';
import APPContext from './APPContext';
import Config from './Config';
import Popup from './modal/Popup';
import Spiner from './modal/Spiner';
import Toast from './modal/Toast';
import DialogBox from './modal/DialogBox';
import Frame from './router/Frame';
import Login from './screen/Login';
import Main from './screen/Main';
import { RouterTool } from './utils/Tool';

class Application extends React.Component {
  static _Self = null

  _frame = null

  constructor(props) {
    super(props)

    this.onFrameCompRef = this.onFrameCompRef.bind(this)

    this.state = {
      frame: {
        index: Main._path,
        screens: [{
          component: Main,
          path: Main._path,
          props: {}
        }, {
          component: Login,
          path: Login._path,
          props: {}
        }],
        modals: [{
          component: Toast,
          path: Toast._path,
          props: {}
        }, {
          component: Spiner,
          path: Spiner._path,
          props: {}
        }, {
          component: Popup,
          path: Popup._path,
          props: {}
        }, {
          component: DialogBox,
          path: DialogBox._path,
          props: {}
        }]
      },
      appcontext: {
        theme: Config.Theme,
        language: Config.LANGUAG,
        getapp: () => {
          return this
        }
      }
    }
  }

  componentDidMount() {
    Application._Self = this
  }

  componentWillUnmount() {
  }

  updateContextForTheme(data) {
    let _appcontext = this.state.appcontext

    _appcontext.theme = data || _appcontext.theme

    this.setState({
      appcontext: _appcontext
    })
  }

  updateContextForLanguage(data) {
    let _appcontext = this.state.appcontext

    _appcontext.language = data || _appcontext.language

    this.setState({
      appcontext: _appcontext
    })
  }

  onFrameCompRef(comp) {
    this._frame = comp

    RouterTool.MountFrame(comp)

    console.error('app routing frame on ref...')
  }

  render() {
    return (
      <APPContext.Provider value={this.state.appcontext}>
        <Frame {...this.state.frame} ref={this.onFrameCompRef} />
      </APPContext.Provider>
    )
  }
}

export default Application
