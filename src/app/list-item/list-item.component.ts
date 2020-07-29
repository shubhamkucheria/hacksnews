import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-list-item",
  templateUrl: "./list-item.component.html",
  styleUrls: ["./list-item.component.scss"]
})
export class ListItemComponent implements OnInit {
  @Input() item : any;
  @Input() index : any;
  @Output() upvote = new EventEmitter<string>();
  @Output() downvote = new EventEmitter<string>();

  upvotes(id: any) {
    this.upvote.emit(id);
  }
  downvotes(id: any) {
    this.downvote.emit(id);
  }

  constructor() {}

  ngOnInit() {}

  goToStory(link) {
    link ? window.open(link, "blank") : false;
  }
}
