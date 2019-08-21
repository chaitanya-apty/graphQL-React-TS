import { createBrowserHistory } from 'history';

export const memHistory = createBrowserHistory({
    basename: '#',
    forceRefresh: false
});