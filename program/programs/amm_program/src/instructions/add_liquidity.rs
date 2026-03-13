use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token, TokenAccount};

use crate::state::Pool;

#[derive(Accounts)]
pub struct AddLiquidty<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        mut, 
        seeds = [b"pool", pool.token_a_mint.as_ref(), pool.token_b_mint.as_ref()], 
        bump = pool.bump, 
        has_one = token_a_vault,
        has_one = token_b_vault,
        has_one = lp_mint,
    )]
    pub pool : Account<'info, Pool>,

    #[account(
        mut, 
        seeds = [b"vault_a", pool.key().as_ref()], 
        bump
    )]
    pub token_a_vault:Account<'info, TokenAccount>,    #[account(
        mut, 
        seeds = [b"vault_b", pool.key().as_ref()], 
        bump
    )]
    pub token_b_vault:Account<'info, TokenAccount>, 

    #[account(
        mut, 
        seeds = [b"lp_mint", pool.key().as_ref()], 
        bump
    )]
    pub lp_mint : Account<'info, Mint>,

    #[account(
        mut, 
        token::mint = pool.token_a_mint,
        token::authority = user
    )]
    pub user_token_a_account : Account<'info, TokenAccount>,

    #[account(
        mut, 
        token::mint = pool.token_b_mint,
        token::authority = user
    )]
    pub user_token_b_account : Account<'info, TokenAccount>,

    #[account(
        init_if_needed, 
        payer = user, 
        token::mint = lp_mint, 
        token::authority = user
    )]
    pub user_lp_token_account : Account<'info,TokenAccount>, 


    pub system_program:Program<'info, System>, 
    pub token_program: Program<'info, Token>

}
