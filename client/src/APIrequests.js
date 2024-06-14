
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

    async getRequest(url) {
        try {
            console.log('http://localhost:8080' + url);
            const response = await fetch('http://localhost:8080' + url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response;
        } catch(error) {
            throw error;
        };      
    }
}