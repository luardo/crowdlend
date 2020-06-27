import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-project-thumbnail',
  templateUrl: './project-thumbnail.component.html',
  styleUrls: ['./project-thumbnail.component.css']
})
export class ProjectThumbnailComponent implements OnInit {

  @Input() id: number;
  @Input() thumbnail: string;
  @Input() name: string;
  @Input() amount: string;

  constructor() { }

  ngOnInit() {
  }

}
