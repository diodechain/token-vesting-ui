import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { getTokenVesting } from '../contracts'

import Header from './Header'
import VestingDetails from './VestingDetails'
import VestingSchedule from './VestingSchedule'
import Error from './Error'
import Spinner from './Spinner'
import Network from "./../network"
import '../stylesheets/TokenVestingApp.css'

class TokenVestingApp extends Component {
  constructor() {
    super()
    this.state = { name: 'Token', loading: true, error: null }
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { address, token } = this.props
    return (
      <div className="TokenVestingApp">

        {this.state.loading ? <Spinner /> : null}
        {this.state.error ? <Error error={this.state.error.message} /> : null}

        <Header address={address} token={token} tokenName={this.state.name} />

        <Grid>
          <Row>
            <Col xs={12} md={6}>
              <VestingDetails
                address={address}
                token={token}
                details={this.state}
                getData={() => this.getData()}
                setLoader={x => this.setLoader(x)}
              />
            </Col>

            <Col xs={12} md={6}>
              <VestingSchedule details={this.state} />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }

  setLoader(loading) {
    this.setState({ loading })
  }

  async getData() {
    try {
      const { address, } = this.props

      const tokenVesting = await getTokenVesting(address)

      const start = await tokenVesting.start.call()
      const duration = await tokenVesting.duration.call()
      const end = start.add(duration)

      const balance = Network.web3().utils.toBN(await Network.eth().getBalance(address))
      const released = await tokenVesting.released.call()
      const total = released.add(balance)

      this.setState({
        start,
        end,
        cliff: await tokenVesting.cliff.call(),
        total,
        released,
        vested: await tokenVesting.vestedAmount.call(),
        decimals: 18,
        beneficiary: await tokenVesting.beneficiary.call(),
        owner: await tokenVesting.owner.call(),
        revocable: await tokenVesting.revocable.call(),
        revoked: await tokenVesting.revoked.call(),
        name: "Diode",
        symbol: "DIO",
        loading: false
      })
    } catch (e) {
      this.setState({ loading: true, error: e })
    }
  }
}


export default TokenVestingApp
