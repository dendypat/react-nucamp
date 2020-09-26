import { CAMPSITES } from '../components/shared/campsites.js';
import { COMMENTS } from '../components/shared/comments.js';
import { PARTNERS } from '../components/shared/partners.js';
import { PROMOTIONS } from '../components/shared/promotions';

export const initialState = {
    campsites: CAMPSITES,
    comments: COMMENTS,
    partners: PARTNERS,
    promotions: PROMOTIONS
};

export const Reducer = (state = initialState, action) => {
    return state;
};
