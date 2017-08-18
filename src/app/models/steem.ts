export class SteemGlobals {
    total_vesting_fund_steem: string;
    total_vesting_shares: string;
}


export class SteemFeed {
    current_median_history: {
        base: string;
        quote: string;
    };
}

export class SteemRewardFund {
    recent_claims: number;
    reward_balance: string;
}