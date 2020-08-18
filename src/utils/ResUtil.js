/*
 * @Author: Eland.Tong
 * @Date: 2020-08-18 17:15:30
 * @LastEditTime: 2020-08-18 17:51:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * 
 * @FilePath: /ReactElandFramework/src/utils/ResUtil.js
 */

import Config from '../Config'

export default class ResUtil {
    static require(path, context) {
        let _paths = path.split('/')
        if (_paths instanceof Array) {
            context = context || Config.Theme

            let _newPath = _paths.filter((item) => {
                item = item.trim()
                return !(item === '' ||
                    item === '..' ||
                    item === '.' ||
                    item === 'assets' ||
                    item === 'res' ||
                    item === 'channel' ||
                    item.indexOf('use') >= 0 ||
                    item === 'icon' ||
                    item === 'pic')
            }).join('/')

            console.warn('resources require for new path = ', _newPath, ' old path = ', path)

            let _channelPath = null
            if (_paths.indexOf('channel') >= 0 && _paths.indexOf('icon') >= 0) {
                _channelPath = context.resources.channelIconPath
            } else if (_paths.indexOf('channel') >= 0 && _paths.indexOf('pic') >= 0) {
                _channelPath = context.resources.channelPicPath
            } else if (_paths.indexOf('icon') >= 0) {
                _channelPath = context.resources.iconPath
            } else if (_paths.indexOf('pic') >= 0) {
                _channelPath = context.resources.picPath
            }

            if (_channelPath) {
                return require(`../${_channelPath}/${_newPath}`)
            }
        }
        return null
    }

    static requireChannelIcon(name, context) {
        return this.require(`channel/icon/${name}`, context)
    }

    static requireChannelPic(name, context) {
        return this.require(`channel/pic/${name}`, context)
    }

    static requireIcon(name, context) {
        return this.require(`icon/${name}`, context)
    }

    static requirePic(name, context) {
        return this.require(`pic/${name}`, context)
    }
}
