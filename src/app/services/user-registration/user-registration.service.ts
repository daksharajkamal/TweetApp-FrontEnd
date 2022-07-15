import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/model/UserModel.model';
import {map} from 'rxjs/operators';

export const API_URL="http://tweetappbackend-env-1.eba-vptyavtf.ap-south-1.elasticbeanstalk.com/api/v1.0/tweets/register";
export const Users_URL ="http://tweetappbackend-env-1.eba-vptyavtf.ap-south-1.elasticbeanstalk.com/api/v1.0/tweets/users/all";
export const Search_URL = "http://tweetappbackend-env-1.eba-vptyavtf.ap-south-1.elasticbeanstalk.com/api/v1.0/tweets/user/search/";
export const Forgot_URL="http://tweetappbackend-env-1.eba-vptyavtf.ap-south-1.elasticbeanstalk.com/api/v1.0/tweets";
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(public http : HttpClient) {}

  addNewUser(user : UserModel){
    return this.http.post(API_URL,user).pipe(
      map((successData : Response)=>{
        // console.log(successData)
        return successData;
      }),
      map(failureData=>{
        // console.log(failureData.status);
        return failureData;
      }));
    }
  
  getAllUsers() : any{
    return this.http.get(Users_URL);
  }

  searchUser(name : string) : any{
    return this.http.get(Search_URL+name);
  }
 
  forgotPassword(username : string, password : string):any{
    let headers = new HttpHeaders({newPassword : password})
    return this.http.put(Forgot_URL+"/"+username+"/forgot",{headers});
  }
}
