import React from 'react';
import APPContext from './APPContext';
import Config from './Config';
import Popup from './modal/Popup';
import Spiner from './modal/Spiner';
import Toast from './modal/Toast';
import Frame from './router/Frame';
import Login from './screen/Login';
import Main from './screen/Main';
import { RouterTool } from './utils/Tool';

class Application extends React.Component {
  static _APP = null

  _frame = null

  constructor(props) {
    super(props)

    this.onFrameCompRef = this.onFrameCompRef.bind(this)

    this.state = {
      param: {
        screens: [{
          component: Main,
          path: Main._path,
          options: {
            props: {
            }
          }
        }, {
          component: Login,
          path: Login._path,
          options: {
            props: {
            }
          }
        }],
        modals: [{
          component: Toast,
          path: Toast._path,
          options: {
            props: {
            }
          }
        }, {
          component: Spiner,
          path: Spiner._path,
          options: {
            props: {
            }
          }
        }, {
          component: Popup,
          path: Popup._path,
          options: {
            props: {
            }
          }
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
    Application._APP = this
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
        <Frame param={this.state.param}
          index={Main._path}
          classNameScreenAnimation={null}
          classNameModalAnimation={null}
          ref={this.onFrameCompRef} />
      </APPContext.Provider>
    )
  }
}

export default Application
