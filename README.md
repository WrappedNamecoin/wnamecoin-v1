[![License][license-badge]][license-link]


# Wrapped Namecoin

This repository has the contracts that implement the wrapped token for
Namecoin on the Ethereum Network.

## Table of Contents

- [Wrapped Namecoin](#wrapped-namecoin)
  - [Table of Contents](#table-of-contents)
  - [Background](#background)
  - [Deployments](#deployments)
  - [Install](#install)
  - [Usage](#usage)
    - [Foundry Tests](#foundry-tests)
    - [Linting](#linting)
  - [Audits](#audits)
  - [Contributing](#contributing)
  - [License](#license)

## Background

WrappedNamecoin is an ERC-20 Token that wraps Namecoin.

## Deployments

### Deployments By EVM Chain

<table>
<tr>
<th>Network</th>
<th>Official Release</th>
</tr>
<tr>
<td>Ethereum</td>
<td>Not Deployed</td>
</tr>
<tr>
<td>Sepolia</td>
<td>
  
  [0xA50a0B38944Db3dBd7182C3757E8cc13C5Ee1343](https://sepolia.etherscan.io/address/0xA50a0B38944Db3dBd7182C3757E8cc13C5Ee1343)
  
</td>
</tr>
<tr>
<td>Goerli</td>
<td>
  
  [0x42086f8773d557097c4Dd6A7d0d7b2c828e5EA12](https://goerli.etherscan.io/address/0x42086f8773d557097c4dd6a7d0d7b2c828e5ea12)
  
</td>
</tr>
</table>

## Install

To install dependencies and compile contracts:

```bash
git clone https://github.com/WrappedNamecoin/wnamecoin-v1.git && cd wnamecoin-v1
yarn install
yarn build
```

## Usage

To run hardhat tests written in javascript:

```bash
yarn test
yarn coverage
```

> Note: artifacts and cache folders may occasionally need to be removed between standard and coverage test runs.

To profile gas usage:

```bash
yarn profile
```

### Foundry Tests

/TBI

### Linting

To run lint checks:

```bash
yarn lint:check
```

Lint checks utilize prettier, prettier-plugin-solidity, and solhint.

```javascript
"prettier": "^2.5.1",
"prettier-plugin-solidity": "^1.0.0-beta.19",
```

## Audits

WrappedNamecoin is yet to be audited.

## Contributing

Contributions to WrappedNamecoin are welcome by anyone interested in writing more tests, improving readability, optimizing for gas efficiency, or extending the protocol via new zone contracts or other features.

When making a pull request, ensure that:

- All tests pass.
- Code coverage remains at 100% (coverage tests must currently be written in hardhat).
- All new code adheres to the style guide:
  - All lint checks pass.
  - Code is thoroughly commented with natspec where relevant.
- If making a change to the contracts:
  - Gas snapshots are provided and demonstrate an improvement (or an acceptable deficit given other improvements).
  - Reference contracts are modified correspondingly if relevant.
  - New tests (ideally via foundry) are included for all new features or code paths.
- If making a modification to third-party dependencies, `yarn audit` passes.
- A descriptive summary of the PR has been provided.

## License

[MIT](LICENSE) Copyright 2023.

[license-badge]: https://img.shields.io/github/license/WrappedNamecoin/wnamecoin-v1
[license-link]: https://github.com/WrappedNamecoin/wnamecoin-v1/blob/main/LICENSE
