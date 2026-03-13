use anchor_lang::prelude::*;

#[error_code]
pub enum CustomError {
    #[msg("Math overflow")]
    Overflow,
    #[msg("Invalid token ratio — deposit both tokens at current pool ratio")]
    InvalidRatio,
    #[msg("Insufficient liquidity minted")]
    InsufficientLiquidity,
}
