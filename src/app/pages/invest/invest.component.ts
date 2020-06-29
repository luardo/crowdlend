import {Component, OnInit} from '@angular/core';
import {ProjectsService} from '../../services/projects.service';
import {IProject, Project} from '../../models/project';
import {Options} from 'ng5-slider';
import {InvestmentService} from '../../services/investment.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-invest',
  templateUrl: './invest.component.html',
  styleUrls: ['./invest.component.css']
})
export class InvestComponent implements OnInit {

  submitted = false;
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
    private projectService: ProjectsService,
    private investmentService: InvestmentService) {
  }

  ngOnInit() {

    this.investmentForm = this.formBuilder.group({
      amount: [100, Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });

    this.projectService.getProjectById(1).subscribe(response => {
        this.currentProject = new Project(response);
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

    this.loading = true;
    this.investmentService.createOrder('luis', this.currentProject.id, this.investmentFormControl.amount.value).subscribe(response => {
      this.submitted = false;
      this.loading = false;
    });

  }

}
