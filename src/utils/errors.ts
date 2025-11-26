export class DuplicateSubscriptionError extends Error {
    constructor(message = 'User hat den Feed bereits abonniert') {
        super(message);
        this.name = 'DuplicateSubscriptionError';
    }
}


export class FeedNotFoundError extends Error {
    constructor(message = 'Feed nicht gefunden') {
        super(message);
        this.name = 'FeedNotFoundError';
    }
}
