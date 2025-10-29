export const loadSession = () => {
    try {
        const raw = localStorage.getItem('ticketapp_session');
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        localStorage.removeItem('ticketapp_session');
        return null;
    }
};


export const saveSession = (user) => {
    localStorage.setItem('ticketapp_session', JSON.stringify(user));
};


export const clearSession = () => {
    localStorage.removeItem('ticketapp_session');
};


export const loadTickets = () => {
    try {
        const raw = localStorage.getItem('ticketapp_tickets');
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        localStorage.removeItem('ticketapp_tickets');
        return [];
    }
};


export const saveTickets = (tickets) => {
    localStorage.setItem('ticketapp_tickets', JSON.stringify(tickets));
};