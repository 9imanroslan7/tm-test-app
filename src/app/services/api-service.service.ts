import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig} from '../app.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  headers
  constructor(
    private http:HttpClient
  ) { this.headers=new HttpHeaders({ 'Accept': 'application/json' })} //,'Content-Type': 'application/json; charset=UTF-8'

  fetchAllData(){
    return this.http.get(`${AppConfig.api}fetchAllData.php`,this.headers)
    .pipe(
      map((data) => {
        return data
      })
    )
  }

  fetchDateOnly(){
    return this.http.get(`${AppConfig.api}fetchDateOnly.php`,this.headers)
    .pipe(
      map((data) => {
        return data
      })
    )
  }

  fetchDataByDate(body){
    const httpOptions = {
      headers: this.headers,
      params: body
    };
    return this.http.post(`${AppConfig.api}fetchDataByDate.php`,null,httpOptions)
    .pipe(
      map((data) => {
        return data
      })
    )
  }

}
