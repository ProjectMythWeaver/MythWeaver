import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export function useConnectWallet() {
  const { address } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  return { address, connect, disconnect };
  // if (address)
  //   return (
  //     <div>
  //       Connected to {address}
  //       <button onClick={() => disconnect()}>Disconnect</button>
  //     </div>
  //   );
  // return <button onClick={() => connect()}>Connect Wallet</button>;
}
