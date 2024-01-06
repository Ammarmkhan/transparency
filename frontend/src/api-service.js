export class API {
    static loginUser(body) {
        return fetch(`http://localhost:8000/auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(resp => resp.json());
    }

    static registerUser(body) {
        return fetch(`http://localhost:8000/fitness_api/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(resp => resp.json());
    }
}

