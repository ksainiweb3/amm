export interface Token {
  symbol: string;
  name: string;
  icon: string;
  balance: number;
  price: number;
}

export interface Pool {
  id: string;
  tokenA: Token;
  tokenB: Token;
  tvl: number;
  volume24h: number;
  apr: number;
  fee: number;
  userLiquidity?: number;
}

export const tokens: Token[] = [
  { symbol: "SOL", name: "Solana", icon: "◎", balance: 42.58, price: 185.4 },
  { symbol: "ETH", name: "Ethereum", icon: "Ξ", balance: 3.214, price: 3842.1 },
  { symbol: "USDC", name: "USD Coin", icon: "$", balance: 12480.0, price: 1.0 },
  { symbol: "USDT", name: "Tether", icon: "₮", balance: 5200.0, price: 1.0 },
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    icon: "₿",
    balance: 0.182,
    price: 98420.0,
  },
  { symbol: "ARB", name: "Arbitrum", icon: "⬡", balance: 2840.0, price: 1.82 },
  {
    symbol: "LINK",
    name: "Chainlink",
    icon: "⬢",
    balance: 320.0,
    price: 18.45,
  },
];

export const pools: Pool[] = [
  {
    id: "1",
    tokenA: tokens[0],
    tokenB: tokens[2],
    tvl: 48_200_000,
    volume24h: 12_400_000,
    apr: 24.8,
    fee: 0.3,
    userLiquidity: 4200,
  },
  {
    id: "2",
    tokenA: tokens[1],
    tokenB: tokens[2],
    tvl: 128_500_000,
    volume24h: 34_800_000,
    apr: 18.2,
    fee: 0.05,
  },
  {
    id: "3",
    tokenA: tokens[4],
    tokenB: tokens[1],
    tvl: 86_300_000,
    volume24h: 8_900_000,
    apr: 12.4,
    fee: 0.3,
    userLiquidity: 12800,
  },
  {
    id: "4",
    tokenA: tokens[5],
    tokenB: tokens[1],
    tvl: 15_600_000,
    volume24h: 3_200_000,
    apr: 42.1,
    fee: 0.3,
  },
  {
    id: "5",
    tokenA: tokens[0],
    tokenB: tokens[1],
    tvl: 32_100_000,
    volume24h: 9_100_000,
    apr: 28.6,
    fee: 0.3,
  },
  {
    id: "6",
    tokenA: tokens[6],
    tokenB: tokens[2],
    tvl: 9_800_000,
    volume24h: 1_400_000,
    apr: 15.3,
    fee: 0.3,
  },
];

export function formatUsd(n: number) {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}

export function formatNumber(n: number, decimals = 2) {
  return n.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatAddress(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}
