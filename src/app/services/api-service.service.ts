import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig} from '../app.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  headers
  headers2
  constructor(
    private http:HttpClient
  ) { 
    this.headers=new HttpHeaders({ 'Accept': 'application/json' })
    this.headers2=new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' })
  
  } //,'Content-Type': 'application/json; charset=UTF-8'

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

  fetchCumulativeAllState(){
    // const httpOptions = {
    //   headers: this.headers,
    //   params: body
    // };
    return this.http.get(`${AppConfig.api}fetchCumulativeByState.php`,this.headers)
    .pipe(
      map((data) => {
        return data
      })
    )
  }

}
