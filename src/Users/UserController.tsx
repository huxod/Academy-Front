import { observable,  action, computed, runInAction } from 'mobx';

class UserController {
    // Set Default Array
    // @observable public users = [{
    //     userId: 0,
    //     name: 'string',
    //     email: 'string',
    //     password: 'string'
    // }]
    @observable public users = [{}]
    @observable public user = {}
    // Trigerr Load
    @observable public isLoad = true;
    @observable public usersLenght = 0;
    public URL =  window.location.protocol+'//'+window.location.hostname+':'+ window.location.port;


    // Update Array Function without server
    @action public addItem = (arr: any) => {
        this.users.push(arr)
    };

    // Delete data in Array
    @action public deleteItem = (id: any) => {
        console.log('Delete Item: ', id)
        this.users.splice(this.users.findIndex((i: any) => i.id === +id), 1)
    }
    // Get data from server
    @action public loadData = (urlNode: string) => {
        this.isLoad = true;
        (async () => {
            const response = await fetch(this.URL + urlNode, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                console.log('Response GetData OK')
                try {
                    await response.json();
                } catch (error) {
                    console.log(error)
                }
                const json = await response.json();
                runInAction(() => {                 
                    this.user = json;
                    this.isLoad = false;
                    this.usersLenght = Object.keys(this.user).length;
                    console.log('Test Users')
                    console.log(this.user['login'])
                })
            } else {
                console.log('Response GetData Failure');
                this.isLoad = false;
            }
        })()
    }

    // Send data to server
    @action public addNewItem = (data: any, urlNode: string) => {
        this.isLoad = true;
        (async () => {
            const rawResponse = await fetch(this.URL + urlNode, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (rawResponse.ok) {
                console.log('Response Update OK');
                console.log(rawResponse);
                this.isLoad = false;
                this.usersLenght = Object.keys(this.users).length;
            } else {
                console.log('Response Update Failure');
            }
        })();
    }

    // Delete row in server
    @action public deleteData = (data: any, urlNode: string) => {

        (async () => {
            const rawResponse = await fetch(this.URL + urlNode + data, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: JSON.stringify(data)
            }).then(json => json);
            if (rawResponse.ok) {
                console.log('Response Update OK');
                console.log(rawResponse);
                this.isLoad = false;
                this.usersLenght = Object.keys(this.users).length;
            } else {
                console.log('Response Update Failure');
            }
        })();
    }

    // Get array lenght
    @computed public get birdCount() {
        return this.usersLenght;
    }
}


const userLibary = new UserController;
export default userLibary;
