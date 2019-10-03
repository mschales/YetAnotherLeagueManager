import { Component, OnInit } from '@angular/core';
import { ParseService } from '../../parse.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newtopic',
  templateUrl: './newtopic.component.html',
  styleUrls: ['../discussion.css']
})
export class NewTopicComponent implements OnInit {

  topicList: any;
  topicTitle: any;
  type: any;
  category: any;
  message: any;
  parse: any;
  public: number;

  constructor(private route: ActivatedRoute, parseService: ParseService) {
    this.parse = parseService.getParse();
  }

  updateTopicPermission = (data) => {
    this.public = data.value;
  }

  updateTopicType = (data) => {
    this.category = data.value;
  }

  updateTopicTitle = (event: KeyboardEvent) => {
    this.topicTitle = (<HTMLInputElement>event.target).value;
 }

  submitNewTopicForm = () => {
    console.log('moro');
    const topicObject = this.parse.Object.extend("discussion_topics");
    const createtopic = new topicObject();
    createtopic.set('topic', this.topicTitle);
    createtopic.set('public', this.public);
    createtopic.set('category', this.category);
    createtopic.save().then( (item) => { alert('created new team') },  (error) => { console.log(error.message) } )
  }

  ngOnInit() {
  }
}
