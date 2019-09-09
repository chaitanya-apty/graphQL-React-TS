import { createBrowserHistory } from 'history';

export const memHistory = createBrowserHistory({
    basename: '#',
    forceRefresh: false
});

export const CURRENT_PATH = memHistory.location.pathname;