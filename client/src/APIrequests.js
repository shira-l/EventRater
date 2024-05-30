
export class APIrequests {
    async postRequest(url, body) {
        try {
            const response = await fetch('http://localhost:8080' + url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            return response;
        } catch(error) {
            throw error;
        };      
    }
}