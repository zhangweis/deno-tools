import * as ethers from 'https://esm.sh/ethers@5.7.2'
const {providers} = ethers;
import {
  addDefaultLocalNetwork,
  L2TransactionReceipt,
  L2ToL1MessageStatus,
} from 'https://esm.sh/@arbitrum/sdk@3.1.13'
import json2json from "https://github.com/zhangweis/deno-tools/raw/main/json2json.ts";

export default async function getMessageStatus({txid: txnHash,l1rpc,l2rpc}) {
const l1Provider = new providers.JsonRpcProvider(l1rpc)
const l2Provider = new providers.JsonRpcProvider(l2rpc)
  /**
   / * We start with a txn hash; we assume this is transaction that triggered an L2 to L1 Message on L2 (i.e., ArbSys.sendTxToL1)
  */
  if (!txnHash)
    throw new Error(
      'Provide a transaction hash of an L2 transaction that sends an L2 to L1 message'
    )
  if (!txnHash.startsWith('0x') || txnHash.trim().length != 66)
    throw new Error(`Hmm, ${txnHash} doesn't look like a txn hash...`)

  const receipt = await l2Provider.getTransactionReceipt(txnHash)
  const l2Receipt = new L2TransactionReceipt(receipt)
  const messages = await l2Receipt.getL2ToL1Messages(l1Provider)
  const l2ToL1Msg = messages[0]
return {block:Number.parseInt(await l2ToL1Msg.getFirstExecutableBlock(l2Provider))};
}

if (import.meta.main) json2json(getMessageStatus);
