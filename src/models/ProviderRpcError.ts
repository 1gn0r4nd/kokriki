//import { EthereumRpcError, EthereumProviderError } from "eth-rpc-errors";
export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

//  4001
//     The request was rejected by the user
// -32602
//     The parameters were invalid
// -32603
//     Internal error
//  4902
//     Chain doesnt exist yet?
//-32002 already pending