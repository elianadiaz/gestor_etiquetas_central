import { Injectable } from '@angular/core';

@Injectable()
export class AppSettingsService {

  //private serviceHostName:string = "http://localhost:8080/";
  private serviceHostName:string = "http://10.88.1.154:8090/";

  constructor() {}

  public getServiceHostName() {
  	return this.serviceHostName;
  }

}
