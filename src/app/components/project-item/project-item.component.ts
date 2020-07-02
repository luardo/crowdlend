import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {

  @Input() id: number;
  @Input() thumbnail: string;
  @Input() description: string;
  @Input() name: string;
  @Input() amount: number;
  @Input() goal: number;
  @Input() location: string;
  @Input() percentFunded: number;
  @Input() interestRate: number;



  constructor() { }

  ngOnInit() {
  }

}
