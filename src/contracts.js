import contract from 'truffle-contract'
import Network from "./network"

export async function getTokenVesting(address) {
  const TokenVesting = contract(require('contracts/TokenVestingNative.json'))
  const provider = await Network.provider()
  TokenVesting.setProvider(provider)
  return TokenVesting.at(address)
}

export async function getSimpleToken(address) {
  // const SimpleToken = contract(require('contracts/SimpleToken.json'))
  // const provider = await Network.provider()
  // SimpleToken.setProvider(provider)
  // return SimpleToken.at(address)
}
