import * as ethers from 'https://esm.sh/ethers@5.7.2'
const {providers} = ethers;
import {
  ChildTransactionReceipt,
} from 'https://esm.sh/@arbitrum/sdk@4.0.1'
import json2json from "../json2json.ts";

export default async function executableBlocks({txs,l1rpc,l2rpc}) {
const {l1Provider, l2Provider} = getProviders({l1rpc,l2rpc});
return await Promise.all(txs.map(tx=>executableBlock(tx,l1Provider,l2Provider)));
}
export function getProviders({l1rpc,l2rpc}) {
  const l1Provider = new providers.JsonRpcProvider(l1rpc)
  const l2Provider = new providers.JsonRpcProvider(l2rpc)
  return {l1Provider, l2Provider};
}
export async function getL2ToL1Message({l1Provider, l2Provider, txnHash}) {
  if (!txnHash)
    throw new Error(
      'Provide a transaction hash of an L2 transaction that sends an L2 to L1 message'
    )
  if (!txnHash.startsWith('0x') || txnHash.trim().length != 66)
    throw new Error(`Hmm, ${txnHash} doesn't look like a txn hash...`)

  const receipt = await l2Provider.getTransactionReceipt(txnHash)
  const l2Receipt = new ChildTransactionReceipt(receipt)
  const messages = await l2Receipt.getChildToParentMessages(l1Provider)
  const l2ToL1Msg = messages[0]
  return l2ToL1Msg;
}
async function executableBlock(txnHash,l1Provider,l2Provider) {
  const l2ToL1Msg = await getL2ToL1Message({txnHash,l1Provider,l2Provider});
  return {block:Number.parseInt(await l2ToL1Msg.getFirstExecutableBlock(l2Provider))};
}

if (import.meta.main) json2json(executableBlocks);
