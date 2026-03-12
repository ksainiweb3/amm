"use client";

import { motion } from "framer-motion";
import { Plus, TrendingUp, Search } from "lucide-react";
import { pools, formatUsd } from "../../lib/mock-data";
import { useState } from "react";
import Link from "next/link";

export default function PoolsPage() {
  const [search, setSearch] = useState("");

  const filtered = pools.filter(
    (p) =>
      p.tokenA.symbol.toLowerCase().includes(search.toLowerCase()) ||
      p.tokenB.symbol.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      {/* Header */}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Liquidity Pools
        </h1>

        <Link href="/create-pool">
          <motion.button
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition"
          >
            <Plus className="w-4 h-4" />
            New Pool
          </motion.button>
        </Link>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          {
            label: "Total TVL",
            value: formatUsd(pools.reduce((s, p) => s + p.tvl, 0)),
          },
          {
            label: "24h Volume",
            value: formatUsd(pools.reduce((s, p) => s + p.volume24h, 0)),
          },
          { label: "Active Pools", value: pools.length.toString() },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5"
          >
            <div className="text-xs text-neutral-400 mb-1">{stat.label}</div>

            <div className="text-xl font-semibold font-mono text-white">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Search */}

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search pools..."
          className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white outline-none focus:border-indigo-500 placeholder:text-neutral-500 transition"
        />
      </div>

      {/* Table */}

      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          {/* Head */}

          <thead>
            <tr className="border-b border-neutral-800">
              <th className="text-left text-xs font-medium text-neutral-400 px-6 py-3">
                Pool
              </th>

              <th className="text-right text-xs font-medium text-neutral-400 px-6 py-3">
                TVL
              </th>

              <th className="text-right text-xs font-medium text-neutral-400 px-6 py-3">
                24h Volume
              </th>

              <th className="text-right text-xs font-medium text-neutral-400 px-6 py-3">
                APR
              </th>

              <th className="text-right text-xs font-medium text-neutral-400 px-6 py-3">
                Fee
              </th>

              <th className="text-right text-xs font-medium text-neutral-400 px-6 py-3"></th>
            </tr>
          </thead>

          {/* Body */}

          <tbody>
            {filtered.map((pool, i) => (
              <motion.tr
                key={pool.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
                className="border-b border-neutral-800 last:border-0 hover:bg-neutral-800/60 transition cursor-pointer"
              >
                {/* Pool */}

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <span className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center text-sm border border-neutral-700">
                        {pool.tokenA.icon}
                      </span>

                      <span className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center text-sm border border-neutral-700">
                        {pool.tokenB.icon}
                      </span>
                    </div>

                    <div>
                      <div className="font-medium text-sm text-white">
                        {pool.tokenA.symbol}/{pool.tokenB.symbol}
                      </div>

                      {pool.userLiquidity && (
                        <div className="text-xs text-indigo-400 font-mono">
                          Your LP: {formatUsd(pool.userLiquidity)}
                        </div>
                      )}
                    </div>
                  </div>
                </td>

                {/* TVL */}

                <td className="px-6 py-4 text-right font-mono text-sm text-white">
                  {formatUsd(pool.tvl)}
                </td>

                {/* Volume */}

                <td className="px-6 py-4 text-right font-mono text-sm text-white">
                  {formatUsd(pool.volume24h)}
                </td>

                {/* APR */}

                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center gap-1 text-indigo-400 font-mono text-sm font-medium">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {pool.apr}%
                  </span>
                </td>

                {/* Fee */}

                <td className="px-6 py-4 text-right font-mono text-sm text-neutral-400">
                  {pool.fee}%
                </td>

                {/* Manage */}

                <td className="px-6 py-4 text-right">
                  <Link href={`/pools/${pool.id}`}>
                    <button className="px-3 py-1.5 rounded-lg bg-neutral-800 text-white text-xs font-medium hover:bg-neutral-700 transition">
                      Manage
                    </button>
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
