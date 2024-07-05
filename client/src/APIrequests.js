
export class APIrequests {
    async postRequest(url, body) {
        try {
            const response = await fetch('http://localhost:8083' + url, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(body),
                headers: {
                    'Content-type': 'application/json',
                },
            });
            if(response.status!=200){
                throw new Error(response.statusText);
            }
            const data=response.json();
            return data;
        } catch (error) {
            throw error;
        };
    }

    async getRequest(url, params = {}) {
        try {
            console.log('http://localhost:8083' + url);

            const response = await fetch('http://localhost:8083' + url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.status!=200){
                throw new Error(response.statusText);
            }
            const data=response.json()
            return data;
        } catch (error) {
            throw error;
        };
    }

    async deleteRequest(url) {
        try {
            const response = await fetch('http://localhost:8083' + url, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.status!=200){
                throw new Error(response.error.message);
            }
            const data=response.json()
            return data;
        } catch (error) {
            throw error;
        }
    }

    async putRequest(url, body) {
        try {
            const response = await fetch('http://localhost:8083' + url, {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify(body),
                headers: {
                    'Content-type': 'application/json',
                },
            });
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

}