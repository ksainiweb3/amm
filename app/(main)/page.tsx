"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Settings, ChevronDown } from "lucide-react";
import { tokens, Token, formatNumber } from "../lib/mock-data";

function TokenSelector({
  selected,
  onSelect,
  exclude,
}: {
  selected: Token;
  onSelect: (t: Token) => void;
  exclude?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-sm font-medium transition"
      >
        <span className="text-base">{selected.icon}</span>
        {selected.symbol}
        <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-52 bg-neutral-950 border border-neutral-800 rounded-xl shadow-xl overflow-hidden z-50"
          >
            {tokens
              .filter((t) => t.symbol !== exclude)
              .map((t) => (
                <button
                  key={t.symbol}
                  onClick={() => {
                    onSelect(t);
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-900 transition text-left"
                >
                  <span className="text-base">{t.icon}</span>

                  <div>
                    <div className="font-medium text-white">{t.symbol}</div>
                    <div className="text-xs text-neutral-400">{t.name}</div>
                  </div>

                  <span className="ml-auto font-mono text-xs text-neutral-400">
                    {formatNumber(t.balance, 4)}
                  </span>
                </button>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SwapPage() {
  const [tokenFrom, setTokenFrom] = useState(tokens[0]);
  const [tokenTo, setTokenTo] = useState(tokens[2]);
  const [amountFrom, setAmountFrom] = useState("");
  const [slippage] = useState(0.5);

  const amountTo = amountFrom
    ? ((parseFloat(amountFrom) * tokenFrom.price) / tokenTo.price).toFixed(6)
    : "";

  const rate = tokenFrom.price / tokenTo.price;

  const handleFlip = () => {
    setTokenFrom(tokenTo);
    setTokenTo(tokenFrom);
    setAmountFrom("");
  };

  return (
    <div className="flex flex-col items-center pt-16">
      <div className="w-full max-w-md">
        {/* Header */}

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Swap
          </h1>

          <button className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 transition">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-1">
          {/* FROM */}

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-neutral-400">You pay</span>

              <span className="text-xs text-neutral-400 font-mono">
                Balance: {formatNumber(tokenFrom.balance, 4)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="text"
                value={amountFrom}
                onChange={(e) =>
                  setAmountFrom(e.target.value.replace(/[^0-9.]/g, ""))
                }
                placeholder="0.00"
                className="flex-1 bg-transparent text-3xl font-medium text-white outline-none placeholder:text-neutral-600 font-mono"
              />

              <TokenSelector
                selected={tokenFrom}
                onSelect={setTokenFrom}
                exclude={tokenTo.symbol}
              />
            </div>

            <div className="flex justify-end mt-1">
              <button
                onClick={() => setAmountFrom(tokenFrom.balance.toString())}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
              >
                MAX
              </button>
            </div>
          </div>

          {/* FLIP */}

          <div className="flex justify-center -my-3 relative z-10">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleFlip}
              className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
            >
              <ArrowDown className="w-4 h-4" />
            </motion.button>
          </div>

          {/* TO */}

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-neutral-400">You receive</span>

              <span className="text-xs text-neutral-400 font-mono">
                Balance: {formatNumber(tokenTo.balance, 4)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="text"
                value={amountTo}
                readOnly
                placeholder="0.00"
                className="flex-1 bg-transparent text-3xl font-medium text-white outline-none placeholder:text-neutral-600 font-mono"
              />

              <TokenSelector
                selected={tokenTo}
                onSelect={setTokenTo}
                exclude={tokenFrom.symbol}
              />
            </div>
          </div>
        </div>

        {/* RATE */}

        {amountFrom && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-2 text-sm"
          >
            <div className="flex justify-between text-neutral-400">
              <span>Rate</span>

              <span className="font-mono">
                1 {tokenFrom.symbol} = {formatNumber(rate, 4)} {tokenTo.symbol}
              </span>
            </div>

            <div className="flex justify-between text-neutral-400">
              <span>Slippage tolerance</span>
              <span className="font-mono">{slippage}%</span>
            </div>

            <div className="flex justify-between text-neutral-400">
              <span>Network fee</span>
              <span className="font-mono">~$0.42</span>
            </div>
          </motion.div>
        )}

        {/* BUTTON */}

        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-base hover:opacity-90 transition"
        >
          {amountFrom ? "Swap" : "Enter an amount"}
        </motion.button>
      </div>
    </div>
  );
}
