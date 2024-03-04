"use client";

import { useSequenceProvider } from "@/hooks/Sequence";

export default function Home() {
  const { client, userInfo, connect, disconnect } = useSequenceProvider();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        onClick={connect}
        className="text-sm font-semibold leading-6 text-yellow-300 border border-1"
      >
        Login (Connect With Sequence and Set Next Auth Session Key)
      </button>
    </main>
  );
}
