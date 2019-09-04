import { createBrowserHistory } from 'history';

export const memHistory = createBrowserHistory({
    basename: '#',
    forceRefresh: false
});

export const Header = memHistory.location.pathname;