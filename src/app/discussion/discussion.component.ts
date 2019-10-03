import { Component, OnInit } from '@angular/core';
import { ParseService } from '../parse.service';
import { ActivatedRoute } from '@angular/router';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.css']
})
export class DiscussionComponent implements OnInit {

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

  getTopicList = () => {
    const topicObject = this.parse.Object.extend("discussion_topics");
    const query = new this.parse.Query(topicObject);
    const tempList = [];
    const getTopics = () => {
      query.find().then(res => {
        res.forEach((item) => {
          tempList.push({
            id: item.id,
            title: item.get("topic"),
            category: item.get('category'),
          })
        })
      })
      return tempList;
    }
    this.topicList = getTopics();
  }

  ngOnInit() {
    this.getTopicList();
    console.log(this.topicList);
  }
}
