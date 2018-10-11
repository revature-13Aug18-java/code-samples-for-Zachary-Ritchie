import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; //../../../node_modules/
import { tap } from 'rxjs/operators'; //../../../node_modules/
import { Reim } from '../reim';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})

export class AuthService 
{
  public servletData: User;
  public reimSingle: Reim;
  public reimData : Reim[] = [];
  public temp: User;
  public tempTypeString: string;
  public tempStatusString: string;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<User> 
  {    
    return this.http.post<User>("http://localhost:8085/Rsystem/login", [username, password]).pipe(tap( data => {this.servletData = data}));
  }

  createAccount(username: string, password: string, firstname: string, lastname: string, email: string, role: number): Observable<User> 
  {
    return this.http.post<User>("http://localhost:8085/Rsystem/createAccount", [username, password, firstname, lastname, email, role]).pipe(tap(data => {this.temp = data}));
  }

  createReim(amount: number, description: string, author: number, typeId: number)
  {
    return this.http.put<Reim>("http://localhost:8085/Rsystem/employeeCreateReim", [amount, description, author, typeId])
  }

  employeeGetReim(id: number): Observable<Reim[]> 
  {
    return this.http.post<Reim[]>("http://localhost:8085/Rsystem/employeeGetReim", [id]).pipe(tap( data => {this.reimData = data}))
  }

  getEmployee(id: number): Observable<User> 
  {
    return this.http.post<User>("http://localhost:8085/Rsystem/getEmployee", [id]).pipe(tap( data => {this.temp = data;}))
  }

  managerGetReim() : Observable<Reim[]> 
  {
    return this.http.get<Reim[]>("http://localhost:8085/Rsystem/managerGetReim")//.pipe(tap( data => {this.reimData = data}))
  }

  managerUpdateReim(id: number, resolver: number, status: number)
  {
    return this.http.put<User>("http://localhost:8085/Rsystem/managerUpdateReim", [id, resolver, status])
  }

  status(id: number): string
  {
    switch(id)
    {
      case 2:
        this.tempStatusString = "Pending";
        return this.tempStatusString;
      case 4:
        this.tempStatusString = "Approved";
        return this.tempStatusString;
      case 6:
        this.tempStatusString = "Denied";
        return this.tempStatusString;
    }    
  }

  typeReim(id: number): string
  {
    switch(id)
    {
      case 1:
        this.tempTypeString = "Lodging";
        return this.tempTypeString;
      case 2:
        this.tempTypeString = "Travel";
        return this.tempTypeString;
      case 3:
        this.tempTypeString = "Food";
        return this.tempTypeString;
      case 4:
        this.tempTypeString = "Other";
        return this.tempTypeString;
    }    
  }
}
