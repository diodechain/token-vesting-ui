import React from 'react'

function ContractLink({ token, address }) {
  const href = `${token.contractLink}${address}`
  return <a href={ href } rel="noopener noreferrer" target="_blank">{ address }</a>
}

function TokenLink({ token }) {
  const href = token.href
  return <a href={ href } rel="noopener noreferrer" target="_blank">{ token.name }</a>
}


export { ContractLink, TokenLink }