import { sequence } from "0xsequence";
import { ConnectDetails } from "0xsequence/dist/declarations/src/provider";
import { signIn } from "next-auth/react";

export function useSequenceProvider() {
  const sequenceProvider = sequence.initWallet(
    process.env.NEXT_PUBLIC_SEQUENCE_PROJECT_ACCESS_KEY,
    {
      defaultNetwork: "mumbai",
    }
  );

  async function connect() {
    await sequenceProvider
      .connect({
        app: process.env.NEXT_PUBLIC_SEQUENCE_PROJECT_NAME,
        askForEmail: true,
        authorize: true,
      })
      .then(async (data: ConnectDetails) => {
        if (data.connected) {
          const session = await signIn("credentials", {
            email: data.email,
            ethSignProof: data.proof?.proofString,
            walletId: data.session?.accountAddress,
            redirect: false,
          });
        } else {
          console.log("Failed to connect!");
        }
      });
  }

  async function disconnect() {
    await sequenceProvider.disconnect();
  }

  return {
    sequenceProvider,
    client: null,
    userInfo: null,
    connect,
    disconnect,
  };
}
