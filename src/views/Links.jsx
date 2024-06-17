import React from 'react'

function ContractLink({ address }) {
  const href = `https://diode.io/prenet/#/address/${address}`
  return <a href={ href } target="_blank">{ address }</a>
}

function TokenLink({ address, name }) {
  const href = `https://diode.io/prenet/`
  return <a href={ href } target="_blank">{ name }</a>
}


export { ContractLink, TokenLink }