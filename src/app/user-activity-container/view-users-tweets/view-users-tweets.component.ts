import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TweetResponse } from 'src/app/model/tweetResponse.model';
import { TweetsService } from 'src/app/services/tweets/tweets.service';

@Component({
  selector: 'app-view-users-tweets',
  templateUrl: './view-users-tweets.component.html',
  styleUrls: ['./view-users-tweets.component.css']
})
export class ViewUsersTweetsComponent implements OnInit {
  
  myFormGroup : FormGroup;
  today= new Date();
  todaysDataTime = '';
  clickedReplyButton : {[key: number] : boolean} ={};
  enablePostButton : boolean = false;
  showElement : boolean = false;
  searchedUserTweets : string;
  tweets : TweetResponse[];
  noTweets : boolean = false;
  likedTweetPopup : boolean = false;
  disLikedTweetPopup : boolean = false;

  constructor(formBuilder : FormBuilder, public activeRoute : ActivatedRoute , public tweetService : TweetsService) {
    this.todaysDataTime = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+0530');
    this.myFormGroup=formBuilder.group({
      "reply" : new FormControl("",Validators.required),
    })

  }

  likeTweet(id : string){
   
    this.tweetService.likeTweet(id).subscribe((response)=>{
    
      if(response == "success"){
        this.getAllTweets();
        this.likedTweetPopup = true;
        setTimeout(function() {
          
          this.likedTweetPopup = false;
        }.bind(this), 3000);
      }
    },
    // failure function
    failureData => {
   
    });
  }
  
  disLikeTweet(id : string){
 
    this.tweetService.disLikeTweet(id).subscribe((response)=>{
  
      if(response == "success"){
        this.getAllTweets();
        this.disLikedTweetPopup = true;
        setTimeout(function() {
      
          this.disLikedTweetPopup = false;
        }.bind(this), 3000);
      }
    },
    // failure function
    failureData => {
   
    });
  }


  isReplyClicked(index : number){
   
    if(this.clickedReplyButton[index]==false){
    this.clickedReplyButton[index] = true;
  }
    else
    this.clickedReplyButton[index] = false;
  }


  replyTweet(id : string){
    let reply = this.myFormGroup.controls['reply'].value;
    if(reply.length==0){
      alert("Reply can't be empty");
    }
    else{
  
        this.tweetService.replyTweet(reply,id).subscribe((response=>{
        
          if(response=="success"){
            this.myFormGroup.controls['reply'].reset();
            this.showElement = true;
            this.getAllTweets();
            setTimeout(function() {
            
              this.showElement = false;
            }.bind(this), 3000);
          }
          
        }),
        // failure function
        failureData => {
  
        });
        
      }
    }
  
  getAllTweets(){
    this.activeRoute.params.subscribe((parameter => this.searchedUserTweets = parameter["username"]));

    this.tweetService.getAllTweetsOfUser(this.searchedUserTweets).subscribe(response =>{
      this.tweets = response;
    
        if(this.tweets.length!=0){
          this.noTweets = false;
        }else{
          this.noTweets = true;
        }        
      });  
  }
  
  showButton(){
    let reply = this.myFormGroup.controls['reply'].value;

    if(reply.length==0){
      this.enablePostButton = false;
    }else{
      this.enablePostButton = true;
    }
  }


  ngOnInit(): void {
      this.getAllTweets();
      
    }    
  }
