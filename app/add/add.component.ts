import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{HttpClient} from '@angular/common/http';
import{ContextService} from '../services/context.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddComponent implements OnInit {
  record:any={};
  isUpdateMode: boolean=false;

  constructor(private router:Router,private http:HttpClient, private contextService:ContextService ) { }
  public validate:boolean = false;
  public addForm:any;

  ngOnInit(): void {
    if(this.router.url.includes('update')){
      this.isUpdateMode = true;
      if(this.contextService.getSelectedRecords()?.length){
        this.record = this.contextService.getSelectedRecords()[0];
        this.addForm = new FormGroup(
          {
            Id: new FormControl({value:this.record.ID,disabled:true}),
            Name: new FormControl(this.record.Name,[Validators.required]),
            Class: new FormControl(this.record.Class),
            division: new FormControl(this.record.Division),
            Grade: new FormControl(this.record.Grade)
          }
        )
      }
    }
    else{
      this.addForm= new FormGroup(
        {
          Name: new FormControl(null,[Validators.required]),
          Class: new FormControl(),
          division: new FormControl(),
          Grade: new FormControl()
        }
      )
    }
  }
  onSubmit(){
    let payload:any ={
      Name: this.addForm.value.Name,
      Class: this.addForm.value.Class,
      Division: this.addForm.value.division,
      Grade: this.addForm.value.Grade
    };
    if(payload.Name){
      if(this.isUpdateMode){
        payload['ID'] = this.record.ID;
        this.http.put(environment.APIUrl + '/student/update', payload).subscribe(data => {
          this.router.navigateByUrl('/studentdetails');
        })
      }else{
        payload['ID'] = Math.floor(Math.random()*10000)+100;
        this.http.put(environment.APIUrl + '/student/add', payload).subscribe(data => {
        this.router.navigateByUrl('/studentdetails');
        })
    }
    }else{
      alert("Name cannot be empty")
    }
}
}
