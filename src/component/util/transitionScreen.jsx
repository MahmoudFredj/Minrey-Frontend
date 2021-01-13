import React, { Component } from 'react'
import Minion1 from '../../assets/minion1'
import Minion2 from '../../assets/minion2'
import Minion3 from '../../assets/minion3'
import Minion4 from '../../assets/minion4'
const TransitionScreen = ({ classes }) => {
  return (
    <div className={`loading-screen ${classes}`}>
      <Minion1 />
      <Minion2 />
      <Minion3 />
      <Minion4 />
    </div>
  )
}

export default TransitionScreen
