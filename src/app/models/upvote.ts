import {Post} from './post';

export class Upvote {
    percent: number;
    reputation: number;
    rshares: number;
    time: string;
    voter: string;
    weight: number;

    post?: Post;
}
