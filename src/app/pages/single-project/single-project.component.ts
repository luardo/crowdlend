import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ProjectsService} from '../../services/projects.service';
import {Project} from '../../models/project';
import {switchMap, tap} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrdersService} from '../../services/orders.service';

@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.css']
})
export class SingleProjectComponent implements OnInit {

  public project: Project;

  public projectId: string;
  public canInvest = false;
  investmentForm: FormGroup;
  submitted: boolean;

  constructor(
    private projectsService: ProjectsService,
    private orderService: OrdersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.investmentForm = this.formBuilder.group({
      amount: ['', [Validators.required,  Validators.min(100), Validators.max(10000)]],
    });

    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        this.projectId = id;
        return this.projectsService.getProjectById(id);
      }),
      tap(response => {
        this.project = new Project(response);
      }),
      switchMap(response => {
        return this.projectsService.getProjectAvailability(response.id.toString());
      })
    ).subscribe(({canInvest}) => {
      this.canInvest = canInvest;
      }
    );
  }

  get investmentFormControl() {
    return this.investmentForm.controls;
  }


  createInvestmentOrder() {
    this.submitted = true;

    if (this.investmentForm.invalid) {
      return false;
    }

    this.orderService.createOrder(this.project.id.toString(), this.investmentFormControl.amount.value)
      .subscribe(orderId => {
        this.router.navigateByUrl(`/invest/${orderId}`);
      });
  }
}
