use anchor_lang::prelude::*;

declare_id!("2xQfWPVKFrNJE66ysxyS6QySRQCwLuZBMR4NGiSPDgRA");

#[program]
pub mod program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
