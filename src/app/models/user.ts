import {FollowCount} from './followers';

export class User {
    json_metadata: string;
    name: string;
    reputation: string;
    vesting_shares: string;

    // todo: UserProfile
    profile: {
        profile_image?: string
    };
}
