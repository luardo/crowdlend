import {Component, OnInit} from '@angular/core';
import {ProjectsService} from '../../services/projects.service';
import {Project} from '../../models/project';
import {Options} from 'ng5-slider';
import {InvestmentService} from '../../services/investment.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-invest',
  templateUrl: './invest.component.html',
  styleUrls: ['./invest.component.css']
})
export class InvestComponent implements OnInit {

  submitted = false;
  canInvest = false;
  transactionSuccess: boolean;
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
    private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.investmentForm = this.formBuilder.group({
      amount: [100, Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });

    this.route.paramMap.pipe(
      switchMap( params => {
        const id = params.get('id');
        return this.projectsService.getProjectById(id);
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
    this.investmentService.createOrder(this.currentProject.id.toString(), this.investmentFormControl.amount.value)
      .subscribe(transactionId => {
        this.loading = false;
        this.currentProject.increaseAmount(this.investmentFormControl.amount.value);
        this.transactionSuccess = !!transactionId;
      });
  }
}
