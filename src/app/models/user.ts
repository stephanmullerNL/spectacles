export class User {
    delegated_vesting_shares: string;
    json_metadata: string;
    last_post: string;
    last_vote_time: string;
    name: string;
    received_vesting_shares: string;
    reputation: string;
    vesting_shares: string;

    // todo: UserProfile
    profile: UserProfile;
    stats: UserStats;
}

export class UserProfile {
    profile_image?: string
}

export class UserStats {
    avgReward: number;
    comments: number;
    frequency: number;
    lastActive: number;
    reward: number;
    totalShares: number;
    upvotes: number;
}
