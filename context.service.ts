import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  constructor() { }
  private selectedRecord : any =[]
  public setSelectedRecords(data:any){
    this.selectedRecord= data
  }
  public getSelectedRecords(){
    return this.selectedRecord;
  }
  public insertRecord(data: any){
    let index = this.selectedRecord.findIndex((record:any)=>record.ID);
    if(index < 0){
      this.selectedRecord.push(data);
    }
  }
  public removeRecord(data: any){
    let index = this.selectedRecord.findIndex((record: any) => record.ID === data.ID);
    if(index >= 0){
      this.selectedRecord.splice(index,1);
    }
  }
}
