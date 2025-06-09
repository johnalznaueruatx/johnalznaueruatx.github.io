// -----------------------------------------------------------------------------
// Address of the deployed ERC-20 “MINT” contract.
// Update this if you redeploy to a different network.
// -----------------------------------------------------------------------------
const mintContractAddress = '0x85cD9A928528C5a6258Fc4CD63d1c4F68151Eb58'; 

// -----------------------------------------------------------------------------
// Application Binary Interface (ABI)
// -----------------------------------------------------------------------------
// The ABI tells your JavaScript library how to encode function calls and decode
// responses/events.  It is grouped below for easier reading:
//
//   0. Constructor                    – runs once when the contract is deployed
//   1. Custom Solidity errors         – cheaper reverts than strings
//   2. Events                         – on-chain logs you can subscribe to
//   3. Read-only view functions       – no gas, just state queries
//   4. State-changing write functions – cost gas, alter blockchain state
// -----------------------------------------------------------------------------
const mintABI = [
  // ───────────────────────────── 0. Constructor ─────────────────────────────
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },

  // ───────────── 1. Custom errors (Solidity ≥0.8.4 – gas-efficient reverts) ─────────────
  /* Revert when allowance[owner][spender] < amount */
  {
    "inputs": [
      { "internalType": "address", "name": "spender",   "type": "address" },
      { "internalType": "uint256", "name": "allowance", "type": "uint256" },
      { "internalType": "uint256", "name": "needed",    "type": "uint256" }
    ],
    "name": "ERC20InsufficientAllowance",
    "type": "error"
  },
  /* Revert when balanceOf(sender) < amount */
  {
    "inputs": [
      { "internalType": "address", "name": "sender",  "type": "address" },
      { "internalType": "uint256", "name": "balance", "type": "uint256" },
      { "internalType": "uint256", "name": "needed",  "type": "uint256" }
    ],
    "name": "ERC20InsufficientBalance",
    "type": "error"
  },
  /* Reverts for zero-address or other invalid parameters on approve/transfer */
  { "inputs":[{ "internalType":"address","name":"approver","type":"address"}],
    "name":"ERC20InvalidApprover","type":"error"
  },
  { "inputs":[{ "internalType":"address","name":"receiver","type":"address"}],
    "name":"ERC20InvalidReceiver","type":"error"
  },
  { "inputs":[{ "internalType":"address","name":"sender","type":"address"}],
    "name":"ERC20InvalidSender","type":"error"
  },
  { "inputs":[{ "internalType":"address","name":"spender","type":"address"}],
    "name":"ERC20InvalidSpender","type":"error"
  },

  // ──────────────────────────────── 2. Events ───────────────────────────────
  /* Emitted on successful calls to approve() */
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true,  "internalType": "address", "name": "owner",   "type": "address" },
      { "indexed": true,  "internalType": "address", "name": "spender", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "value",   "type": "uint256" }
    ],
    "name": "Approval",
    "type": "event"
  },
  /* Emitted on transfer() and transferFrom() */
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true,  "internalType": "address", "name": "from",  "type": "address" },
      { "indexed": true,  "internalType": "address", "name": "to",    "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "Transfer",
    "type": "event"
  },

  // ───────────────────────── 3. Read-only view functions ────────────────────
  /* allowance(owner, spender) → remaining authorised amount */
  {
    "inputs": [
      { "internalType": "address", "name": "owner",   "type": "address" },
      { "internalType": "address", "name": "spender", "type": "address" }
    ],
    "name": "allowance",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  /* balanceOf(account) → token balance */
  {
    "inputs": [
      { "internalType": "address", "name": "account", "type": "address" }
    ],
    "name": "balanceOf",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  /* decimals() → ERC-20 decimal precision (usually 18) */
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      { "internalType": "uint8", "name": "", "type": "uint8" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  /* name() → “My minting smart contract.” */
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  /* symbol() → “MINT” */
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  /* totalSupply() → current circulating supply */
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },

  // ───────────── 4. State-changing write functions (cost gas) ───────────────
  /* approve(spender, value) → bool – authorises `spender` to spend tokens */
  {
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "value",   "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  /* mintFunction(amountToMint) – contract-specific helper to mint tokens */
  {
    "inputs": [
      { "internalType": "uint256", "name": "amountToMint", "type": "uint256" }
    ],
    "name": "mintFunction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  /* transfer(to, value) → bool – moves tokens from msg.sender to `to` */
  {
    "inputs": [
      { "internalType": "address", "name": "to",    "type": "address" },
      { "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "transfer",
    "outputs": [
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  /* transferFrom(from, to, value) → bool – moves tokens via allowance */
  {
    "inputs": [
      { "internalType": "address", "name": "from",  "type": "address" },
      { "internalType": "address", "name": "to",    "type": "address" },
      { "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "transferFrom",
    "outputs": [
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
// -----------------------------------------------------------------------------
// End of ABI
// -----------------------------------------------------------------------------
