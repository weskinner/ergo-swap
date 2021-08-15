export function decodeRegister(ergolib, str) {
  let byteArrayOut = ergolib.Constant.decode_from_base16(str).to_byte_array()
  return (new TextDecoder()).decode(byteArrayOut)
}

// param is response from https://api.ergoplatform.com/api/v1/docs/#operation/getApiV1MempoolTransactionsByaddressP1
export async function getAllNFTsFromTransactions(transactionsResponse, address) {
  const transactions = transactionsResponse.items
  const myUnspentOutputs = transactions.flatMap(txn => txn.outputs).filter(output => output.address === address && !output.spentTransactionId)
  const assetsWithTxns = myUnspentOutputs.flatMap(o => o.assets.map(a => ({ ...a, txn: o })))
  const nfts = assetsWithTxns.filter(asset => asset.amount === 1)
  const ergolib = await import('ergo-lib-wasm-browser')
  const decodedNfts = nfts.map(asset => ({
    ...asset,
    description: decodeRegister(ergolib, asset.txn.additionalRegisters['R5'].serializedValue),
    image: decodeRegister(ergolib, asset.txn.additionalRegisters['R9'].serializedValue)
  }))
  // assetsWithTxns.reduce((acc,next) => {
  //   if(acc[next.name]) {
  //     let asset = acc[next.name]
  //     asset.txn.push(next.)
  //   } else {
  //     acc[next.name] = next
  //     return acc
  //   }
  // },{})

  return decodedNfts
}