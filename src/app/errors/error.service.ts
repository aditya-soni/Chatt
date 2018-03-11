import { EventEmitter, Injectable } from "@angular/core";
import { Error } from "./error.model";

@Injectable()
export class ErrorService {
    constructor() {
    }
    errorOccured = new EventEmitter<Error>();

    errorHandle(error:any){
        const errorData = new Error(error.title,error.error.message);
        this.errorOccured.emit(errorData);
    }

}