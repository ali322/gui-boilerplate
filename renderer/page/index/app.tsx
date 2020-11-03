import React from 'react'
import { ipcRenderer } from 'electron'
import { resolve } from 'path'

export default class App extends React.Component{
  componentDidMount() {
    ipcRenderer.send('ok')
    console.log(resolve())
  }
  render() {
    return (
      <div>App</div>
    )
  }
}