import { observable, autorun, action, runInAction, computed } from 'mobx';

class BirdStore {
    // Set Default Array
    @observable public users = [{
        id: 0,
        name: 'string',
        email: 'string',
        password: 'string'
    }]

    // Trigerr Load
    @observable public isLoad = true;
    @observable public usersLenght = 0;
    public URL = 'http://localhost:8080';


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

                const json = await response.json();
                runInAction(() => {
                    console.log('True data')
                    this.users = json;
                    this.isLoad = false;
                    this.usersLenght = Object.keys(this.users).length;
                })
            } else {
                console.log('Response GetData Failure');
            }
        })()
    }

    // Send data to server
    @action public addNewItem = (data: any, urlNode: string) => {
        this.isLoad = true;
        (async () => {
            const rawResponse = await fetch(this.URL + urlNode, {
                method: 'POST',
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

const store = new BirdStore;
export default store;

autorun(() => {
    console.log('MESSAGE from BirdStory array Birds');
    console.log("This Student Lenght ", store.usersLenght);
    console.log("This Student from server ", store.users);
})