import contract from 'truffle-contract'
import Network from './network'

export async function getTokenVesting(address) {
  const TokenVesting = contract(require('./contracts/TokenVestingNative.json'))
  TokenVesting.setProvider(Network.provider())
  return TokenVesting.at(address)
}

export async function getTokenVestingW(address) {
  const TokenVesting = contract(require('./contracts/TokenVestingNative.json'))
  TokenVesting.setProvider(window.ethereum)
  return TokenVesting.at(address)
}
