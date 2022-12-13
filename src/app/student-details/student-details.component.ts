import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ContextService } from '../services/context.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  idsToDelete: any='';
  searchText: any=''
  studentDatailsCopy: any;

  constructor(private router: Router,private http: HttpClient,private contextService:ContextService) { }
  public studentDatails:any;
  isDeleteClicked:boolean = false;
  ngOnInit(): void {
    this.http.get(environment.APIUrl + "/student/list").subscribe(
      (data:any) => {
        this.studentDatails = data.data
        this.studentDatailsCopy = [... this.studentDatails]
      }
    )
  }
  onSearchClicked(){
    let text = (document.getElementById("searchField")as any)['value'];
    this.studentDatails = this.studentDatailsCopy.filter((data:any)=>{
      if(data.ID?.includes(text)
      || data.Name?.includes(text)
      || data.Class?.includes(text)
      || data.Division?.includes(text)
      || data.Grade?.includes(text)
      || data.Description?.includes(text)){
      return true;
      }
      return false;
    })
  }
  onRecordChecked(event: any,data:any){
    if(event.currentTarget.checked){
      this.contextService.insertRecord(data)
    } else {
      this.contextService.removeRecord(data)
    }
  }
  onAddClick() {
    this.router.navigateByUrl('/add');
  }
  onUpdateClick(){
    let records = this.idsToDelete = this.contextService.getSelectedRecords();
    if(records.length){
      this.router.navigateByUrl('/update');
    }else {
      alert("You haven't selected any record")
    }
  }
  onDeleteClick(){
    let records = this.idsToDelete = this.contextService.getSelectedRecords();
    if(records.length){
      this.idsToDelete = "";
      this.idsToDelete = records.reduce((current: any, record: any)=>{
        if(current){
          current = current + "," + record.ID
        }else {
          current =current + record.ID
        }
        return current;
      },this.idsToDelete)
      this.isDeleteClicked = true;
    }else{
      alert("You haven't selected any record")
    }
  }
  onConfirmClicked(){
    if(this.contextService.getSelectedRecords()?.length) {
      let Promices: any = [];
      this.contextService.getSelectedRecords().forEach((record:any)=>{
        let promice = new Promise((resolve: Function, reject: Function)=>{
          this.http.delete(environment.APIUrl + '/student/delete',{body:record}).subscribe(data =>{
            resolve();
            this.removeFromList(record)
          },error => {
            this.removeFromList(record)
            resolve();
          })
        })
        Promices.push(promice);
      });
      Promise.all(Promices).then(data =>{
        this.isDeleteClicked = false
        this.contextService.setSelectedRecords([]);
      })
    
    }
  }
  trackByFn(id: any){
    return id
  }
  removeFromList(record:any){
    let index = this.studentDatails.findIndex((data:any)=>data.Id === record.ID)
    if(index >= 0){
      this.studentDatails.splice(index,1);
    }
  }
  onCancelClicked(){
    this.isDeleteClicked = false
  }
}
