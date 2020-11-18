import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryLibrary implements InMemoryDbService{
    
    createDb(){
        const books = [

        ];
        return {books};
    }
    
}