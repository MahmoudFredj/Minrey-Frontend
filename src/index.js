import React from 'react'
import ReactDOM from 'react-dom'
import App from './component/app.jsx'
import './content/desktop/style.css'
import './content/desktop/grid.css'
import './content/tablet/style.css'
import './content/tablet/grid.css'
import './content/phone/style.css'
import './content/phone/grid.css'
import { Provider } from 'react-redux'
import storeConfiguration from './store/storeConfiguration'
const store = storeConfiguration()
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'),
)
