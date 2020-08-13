// Diode Contracts
// Copyright 2019 IoT Blockchain Technology Corporation LLC (IBTC)
// Licensed under the Diode License, Version 1.0
module.exports = {
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.6.5",
      settings: {
       optimizer: {
         enabled: true,
         runs: 200
       },
       // Current diode evm version is constantinople
      evmVersion: "constantinople"
      }
    }
  }
}
