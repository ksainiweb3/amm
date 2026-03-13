use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token, TokenAccount};

use crate::state::Pool;



#[derive(Accounts)]
pub struct InitPool<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    pub token_a_mint: Account<'info, Mint>,
    pub token_b_mint: Account<'info, Mint>,

    #[account(
        init, 
        payer = user, 
        seeds = [b"pool", token_a_mint.key().as_ref(), token_a_mint.key().as_ref()], 
        space = 8 + Pool::INIT_SPACE, 
        bump
    )]
    pub pool: Account<'info, Pool>,
    #[account(
        init, 
        payer = user,
        token::mint = token_a_mint,
        token::authority = pool,
        seeds = [b"vault_a", pool.key().as_ref()],
        bump

    )]
    pub token_a_vault: Account<'info, TokenAccount>,
    #[account(
        init, 
        payer = user,
        token::mint = token_b_mint,
        token::authority = pool,
        seeds = [b"vault_b", pool.key().as_ref()],
        bump

    )]
    pub token_b_vault: Account<'info, TokenAccount>,

    #[account(
        init, 
        payer = user, 
        mint::decimals =6, 
        mint::authority = pool
    )]
    pub lp_mint: Account<'info, Mint>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,

}