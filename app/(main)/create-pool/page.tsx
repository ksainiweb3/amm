"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreatePoolPage() {
  const router = useRouter();
  const [mintAddress, setMintAddress] = useState("");
  const [amountSOL, setAmountSOL] = useState("");
  const [amountToken, setAmountToken] = useState("");
  const [fee, setFee] = useState(0.3);
  const [isTokenValid, setIsTokenValid] = useState(false);

  return (
    <div className="flex flex-col items-center pt-16">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">
          Create SOL Pool
        </h1>
        <p className="text-sm text-neutral-400 mb-8">
          Provide liquidity for SOL and a token mint.
        </p>

        <div className="space-y-5">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-5">
            <div>
              <p className="text-sm text-neutral-400 mb-2">Token A</p>
              <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700">
                <span className="flex items-center gap-2 text-white font-medium">
                  ◎ SOL
                </span>
                <span className="text-xs text-neutral-500">Fixed</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-neutral-400 mb-2">
                Token B (Mint Address)
              </p>
              <div className="flex items-center gap-4">
                <input
                  value={mintAddress}
                  onChange={(e) => setMintAddress(e.target.value)}
                  placeholder="Paste token mint address"
                  className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white outline-none focus:border-indigo-500 placeholder:text-neutral-500"
                />
                <button
                  className="px-6 py-3 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 text-white font-semibold text-base transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                  disabled={mintAddress.length < 32}
                >
                  Check
                </button>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <label className="text-sm font-medium text-white mb-3 block">
              Fee Tier
            </label>

            <div className="grid grid-cols-3 gap-2">
              {[0.05, 0.3, 1.0].map((f) => (
                <button
                  key={f}
                  onClick={() => setFee(f)}
                  className={`py-2.5 rounded-xl text-sm font-medium transition ${
                    fee === f
                      ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/30"
                      : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white"
                  }`}
                >
                  {f}%
                </button>
              ))}
            </div>

            <p className="text-xs text-neutral-400 mt-2">
              {fee === 0.05 && "Best for stable pairs."}
              {fee === 0.3 && "Best for most pairs."}
              {fee === 1.0 && "Best for exotic pairs."}
            </p>
          </div>

          {isTokenValid && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4"
            >
              <label className="text-sm font-medium text-white block">
                Initial Liquidity
              </label>

              <div>
                <div className="flex justify-between text-xs text-neutral-400 mb-1">
                  <span>SOL amount</span>
                  <span className="font-mono">Balance</span>
                </div>

                <input
                  type="text"
                  value={amountSOL}
                  onChange={(e) =>
                    setAmountSOL(e.target.value.replace(/[^0-9.]/g, ""))
                  }
                  placeholder="0.00"
                  className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white font-mono outline-none focus:border-indigo-500 placeholder:text-neutral-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-neutral-400 mb-1">
                  <span>Token amount</span>
                  <span className="font-mono">Balance</span>
                </div>

                <input
                  type="text"
                  value={amountToken}
                  onChange={(e) =>
                    setAmountToken(e.target.value.replace(/[^0-9.]/g, ""))
                  }
                  placeholder="0.00"
                  className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white font-mono outline-none focus:border-indigo-500 placeholder:text-neutral-600"
                />
              </div>
            </motion.div>
          )}

          <motion.button
            whileTap={{ scale: 0.98 }}
            disabled={!isTokenValid}
            className="w-full py-4 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 text-white font-semibold text-base transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Pool
          </motion.button>
        </div>
      </div>
    </div>
  );
}
