import {Component, OnInit} from '@angular/core';
import {ProjectsService} from '../../services/projects.service';
import {Project} from '../../models/project';
import {Options} from 'ng5-slider';
import {InvestmentService} from '../../services/investment.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {OrdersService} from '../../services/orders.service';
import {Investment} from '../../models/investment';
import {Order} from '../../models/order';

@Component({
  selector: 'app-invest',
  templateUrl: './invest.component.html',
  styleUrls: ['./invest.component.css']
})
export class InvestComponent implements OnInit {

  submitted = false;
  canInvest = false;
  transactionSuccess: boolean;
  order: Order;
  currentProject: Project;
  investmentForm: FormGroup;
  options: Options = {
    floor: 100,
    ceil: 10000,
    ticksArray: [500, 1000, 2500, 5000, 10000],
    animate: false
  };
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private projectsService: ProjectsService,
    private investmentService: InvestmentService,
    private orderService: OrdersService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.investmentForm = this.formBuilder.group({
      acceptTerms: [false, Validators.requiredTrue]
    });

    this.route.paramMap.pipe(
      switchMap( params => {
        const id = params.get('id');
        return this.orderService.getOrderById(id);
      }),
      tap( order => this.order = order),
      switchMap( order => {
        return  this.projectsService.getProjectById(order.projectId.toString());
      }),
      tap(response => {
        this.currentProject = new Project(response);
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

  public createInvestmentOrder() {
    this.submitted = true;

    if (this.investmentForm.invalid) {
      return false;
    }

    this.loading = true;
    this.investmentService.completeOrder(this.order.id)
      .subscribe((investment: Investment) => {
        this.loading = false;
        this.currentProject.increaseAmount(investment.amountInvested);
        this.transactionSuccess = !!investment.transactionId;
      });
  }
}
