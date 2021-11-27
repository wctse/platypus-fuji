import { BigInt } from "@graphprotocol/graph-ts"
import {
  Platypus as platypusContract,
  Deposit as depositContract,
  Swap as swapContract,
  Withdraw as withdrawContract
} from "../generated/Platypus/Platypus"
import {
  Deposit,
  Swap,
  Withdraw,
} from "../generated/schema"

export function handleDeposit(event: depositContract): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let depositID = event.transaction.hash.toHexString().concat("-").concat(event.logIndex.toString())
  let entity = Deposit.load(depositID);

  if (!entity) {
    entity = new Deposit(depositID);
  }

  entity.sender = event.params.sender;
  entity.token = event.params.token;
  entity.amount = event.params.amount;
  entity.liquidity = event.params.liquidity;
  entity.to = event.params.to;
  entity.timestamp = event.block.timestamp;

  entity.save();
}


export function handleSwap(event: swapContract): void {
  let swapID = event.transaction.hash.toHexString().concat("-").concat(event.logIndex.toString())
  let entity = Swap.load(swapID);

  if (!entity) {
    entity = new Swap(swapID);
  }

  entity.sender = event.params.sender;
  entity.fromToken = event.params.fromToken;
  entity.toToken = event.params.toToken;
  entity.fromAmount = event.params.fromAmount;
  entity.toAmount = event.params.toAmount;
  entity.to = event.params.to;
  entity.timestamp = event.block.timestamp;

  entity.save();
}


export function handleWithdraw(event: withdrawContract): void {
  let withdrawID = event.transaction.hash.toHexString().concat("-").concat(event.logIndex.toString())
  let entity = Withdraw.load(withdrawID);

  if (!entity) {
    entity = new Withdraw(withdrawID);
  }

  entity.sender = event.params.sender;
  entity.token = event.params.token;
  entity.amount = event.params.amount;
  entity.liquidity = event.params.liquidity;
  entity.to = event.params.to;
  entity.timestamp = event.block.timestamp;
  
  entity.save();
}