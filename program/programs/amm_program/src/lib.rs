use crate::error::CustomError;
use crate::helper::integer_sqrt;
use anchor_lang::prelude::*;
use anchor_spl::token::{mint_to, transfer, Mint, MintTo, Token, TokenAccount, Transfer};

pub mod error;
pub mod helper;
pub mod instructions;
pub mod state;

declare_id!("GBk41mqzLzwdvZfuFx1sZiG923rzZdCSfTAhMD4Dp2Hm");
pub use instructions::*;

#[program]
pub mod amm_program {

    use super::*;

    pub fn init_pool(ctx: Context<InitPool>) -> Result<()> {
        let pool = &mut ctx.accounts.pool;

        pool.token_a_vault = ctx.accounts.token_a_vault.key();
        pool.token_a_mint = ctx.accounts.token_a_mint.key();
        pool.token_a_reserves = 0;

        pool.token_b_mint = ctx.accounts.token_b_mint.key();
        pool.token_b_vault = ctx.accounts.token_b_vault.key();
        pool.token_b_reserves = 0;

        pool.lp_mint = ctx.accounts.lp_mint.key();
        pool.lp_supply = 0;

        pool.bump = ctx.bumps.pool;

        Ok(())
    }
    pub fn add_liquidity(ctx: Context<AddLiquidty>, amount_a: u64, amount_b: u64) -> Result<()> {
        let pool = &mut ctx.accounts.pool;
        let mut lp_to_mint = 0;
        if pool.lp_supply == 0 {
            let product = (amount_a as u128)
                .checked_mul(amount_b as u128)
                .ok_or(CustomError::Overflow)?;
            lp_to_mint = integer_sqrt(product) as u64;
            require!(lp_to_mint > 0, CustomError::InsufficientLiquidity)
        }
        transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.user_token_a_account.to_account_info(),
                    to: ctx.accounts.token_a_vault.to_account_info(),
                    authority: ctx.accounts.user.to_account_info(),
                },
            ),
            amount_a,
        )?;

        transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.user_token_b_account.to_account_info(),
                    to: ctx.accounts.token_b_vault.to_account_info(),
                    authority: ctx.accounts.user.to_account_info(),
                },
            ),
            amount_b,
        )?;

        let token_a_mint_key = pool.token_a_mint;
        let token_b_mint_key = pool.token_b_mint;
        let bump = pool.bump;

        let signer_seeds: &[&[&[u8]]] = &[&[
            b"pool",
            token_a_mint_key.as_ref(),
            token_b_mint_key.as_ref(),
            &[bump],
        ]];

        mint_to(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                MintTo {
                    mint: ctx.accounts.lp_mint.to_account_info(),
                    to: ctx.accounts.user_lp_token_account.to_account_info(),
                    authority: ctx.accounts.pool.to_account_info(),
                },
                signer_seeds,
            ),
            lp_to_mint,
        )?;

        let pool = &mut ctx.accounts.pool;
        pool.token_a_reserves = pool
            .token_a_reserves
            .checked_add(amount_a)
            .ok_or(CustomError::Overflow)?;
        pool.token_b_reserves = pool
            .token_b_reserves
            .checked_add(amount_b)
            .ok_or(CustomError::Overflow)?;
        pool.lp_supply = pool
            .lp_supply
            .checked_add(lp_to_mint)
            .ok_or(CustomError::Overflow)?;

        msg!(
            "Liquidity added: {} Token A, {} Token B, {} LP minted",
            amount_a,
            amount_b,
            lp_to_mint
        );
        Ok(())
    }
}
