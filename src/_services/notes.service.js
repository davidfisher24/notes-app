import config from 'config';
import { authHeader } from '../_helpers';

export const notesService = {
    getAll,
    getById,
    create,
    update,
    addShare,
    removeShare,
    delete: _delete
};


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/notes`, requestOptions).then(handleResponse);
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/notes/${id}`, requestOptions).then(handleResponse);
}

function create(note) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(note)
    };

    return fetch(`${config.apiUrl}/notes`, requestOptions).then(handleResponse);
}

function update(note) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(note)
    }

    return fetch(`${config.apiUrl}/notes/${note.id}`, requestOptions).then(handleResponse);
}

function addShare(note,user) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(note)
    };

    return fetch(`${config.apiUrl}/notes/${note.id}/share/${user.id}`, requestOptions).then(handleResponse);
}

function removeShare(note,user) {
    const requestOptions = {
        method: 'DELETE',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(note)
    };

    return fetch(`${config.apiUrl}/notes/${note.id}/share/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/notes/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}