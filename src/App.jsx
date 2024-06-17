import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Error from './views/Error'

import Network from './network'
import TokenVestingApp from './views/TokenVestingApp'

const App = () => (
  <Router>
    <Switch>
      <Route path="/:address" component={ Main }/>
      <Route component={ MissingAddress } />
    </Switch>
  </Router>
)

const Main = function({ match }) {
  let web3 = Network.web3()
  let { address } = match.params
  let token = "DIODE"

  // TODO validate TokenVesting address
  if (!web3.utils.isAddress(address)) return <MissingAddress />
  return <TokenVestingApp address={ address } token={ token } />
}

const MissingAddress = () => (
  <Error error="This is not an address :(" />
)

export default App