import contract from 'truffle-contract'

export async function getTokenVesting(address) {
  const TokenVesting = contract(require('./contracts/TokenVestingNative.json'))
  TokenVesting.setProvider(window.ethereum)
  return TokenVesting.at(address)
}
