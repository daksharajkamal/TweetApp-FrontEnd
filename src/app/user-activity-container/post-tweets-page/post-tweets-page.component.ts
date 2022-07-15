import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tweet } from 'src/app/model/tweet.model';
import { formatDate, LocationStrategy } from '@angular/common';
import { TweetsService } from 'src/app/services/tweets/tweets.service';

@Component({
  selector: 'app-post-tweets-page',
  templateUrl: './post-tweets-page.component.html',
  styleUrls: ['./post-tweets-page.component.css']
})
export class PostTweetsPageComponent implements OnInit {
  
  myFormGroup : FormGroup;
  remainingTweetLength : number;
  remainingTagLength : number;
  tweetLengthExceeded : boolean = false;
  tagLengthExceeded : boolean = false;
  showTweetLength : boolean = false;
  showTagLength : boolean = false;
  showTweetRed : boolean = false;
  showTagRed : boolean = false;
  tweetEmpty : boolean = false;
  showElement : boolean = false;

  tweet : Array<Tweet>;

  userName : string;
  firstName : string;
  lastName : string;
  today= new Date();
  todaysDataTime = '';

  constructor(public router : Router, formBuilder : FormBuilder , public postTweetService : TweetsService) { 
    this.todaysDataTime = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+0530')
    this.myFormGroup=formBuilder.group({
      "tweet" : new FormControl("",Validators.required),
      "tag" : new FormControl(""),
    })
  }

  postTweet(){

    let tweet = this.myFormGroup.controls['tweet'].value;
    
    if(tweet.length == 0){
      this.tweetEmpty = true;
    }
    else{
      
      // creating a tweet
      // sessionStorage.getItem need to be used for getting user name
      let newTweet = new Tweet(
                            sessionStorage.getItem('user'),
                            this.myFormGroup.controls['tweet'].value,
                            sessionStorage.getItem('firstName'),
                            sessionStorage.getItem('lastName'),
                            this.todaysDataTime
                            )
      
      // calling tweet service for uploading tweet 

      this.postTweetService.postTweet(newTweet).subscribe((response : Response)=>{
      });
      this.showElement = true;
        setTimeout(function() {
          this.showElement = false;
        }.bind(this), 3000);
      this.myFormGroup.controls['tweet'].reset();
      this.showTweetLength = false;
    }
    
  }

  tweetLengthValidationMethod(){
    
    let tweet = this.myFormGroup.controls['tweet'].value;
    if(tweet.length!=0){
      this.tweetEmpty = false;
      this.showTweetLength = true;
      this.remainingTweetLength = 145 - tweet.length ;
    }
    else{
      this.showTweetLength = false
    }

    if(tweet.length>=145 && tweet.length!=0){
      this.showTweetRed = true;
      this.tweetLengthExceeded = true;
      
    }else{
      
      this.tweetLengthExceeded = false;
      this.showTweetRed = false;
    }
  }



  ngOnInit(): void {
  }

}
