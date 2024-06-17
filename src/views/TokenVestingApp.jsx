import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

import Header from './Header'
import VestingDetails from './VestingDetails'
import VestingSchedule from './VestingSchedule'
import Error from './Error'
import Spinner from './Spinner'
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

        <Header address={address} token={token} />

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
      const { address, token } = this.props

      const tokenVesting = await token.getTokenVesting(address)

      const start = await tokenVesting.start.call()
      const duration = await tokenVesting.duration.call()
      const end = start.add(duration)

      const balance = token.network.web3().utils.toBN(await token.getBalance(address))
      const released = await token.getReleased(address)
      const total = released.add(balance)

      this.setState({
        start,
        end,
        cliff: await tokenVesting.cliff.call(),
        total,
        released,
        vested: await token.getVestedAmount(address),
        decimals: 18,
        beneficiary: await tokenVesting.beneficiary.call(),
        owner: await tokenVesting.owner.call(),
        revocable: await tokenVesting.revocable.call(),
        revoked: await token.getRevoked(address),
        name: "Diode",
        symbol: "DIODE",
        loading: false
      })
    } catch (e) {
      this.setState({ loading: true, error: e })
      console.log(e)
    }
  }
}


export default TokenVestingApp
