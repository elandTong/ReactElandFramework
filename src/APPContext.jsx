import React from 'react'
import Config from './Config'

const APPContext = React.createContext({
    theme: Config.Theme,
    language: Config.LANGUAG_USE
})

export default APPContext
