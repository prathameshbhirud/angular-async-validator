import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    url = "/api/users";
    urlblackListedMNums = "/api/blackListedMNums";
    
    constructor(private http: HttpClient) { }

    getUserByUsername(username: string): Observable<User[]> {
        username = '^'+username.trim()+'$'; //For exact match testing in Angular In-Memory Web API 

        return this.http.get<User[]>(this.url + '?username=' + username);
    }   
    getUserByEmail(userEmail: string): Promise<User[]> {
        userEmail = userEmail.trim().replace('@', '%40'); //Convert @ into Percent-encoding 
        userEmail = '^'+userEmail+'$'; //For exact match testing in Angular In-Memory Web API 

        return this.http.get<User[]>(this.url + '?email=' + userEmail).toPromise();
    }  	
    getUserByMobileNumber(mobileNumber: string): Observable<User[]> {
        mobileNumber = '^'+mobileNumber.trim()+'$'; //For exact match testing in Angular In-Memory Web API 

        return this.http.get<User[]>(this.url + '?mobileNumber=' + mobileNumber);
    } 
    getBlackListedMobNumMobileNumberDetail(mobileNumber: string): Observable<any> {
        mobileNumber = '^'+mobileNumber.trim()+'$'; //For exact match testing in Angular In-Memory Web API 
        
        return this.http.get(this.urlblackListedMNums + '?mobileNumber=' + mobileNumber);
    } 	 
    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.url);
    }
    createUser(user: User): Observable<User> {
        return this.http.post<User>(this.url, user);
    }
    getAllBlackListedMobileNumbers(): Observable<any> {
        return this.http.get(this.urlblackListedMNums);
    }    
}
 