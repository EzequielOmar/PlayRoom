import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { Survey } from 'src/app/interfaces/survey.interface';
import { DbService } from 'src/app/services/db/db.service';
import { databases } from 'src/app/services/dbNames';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit {
  @Output() signOutRequest: EventEmitter<true> = new EventEmitter<true>();
  @Input() uid?: string;
  form: FormGroup;
  submitted: boolean = false;
  maxAge: number = 99;
  minAge: number = 8;

  constructor(private fb: FormBuilder, private db: DbService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      cell: ['', Validators.required],
      country: ['', Validators.required],
      fav_game: ['', Validators.required],
      daysPerWeek: [1, Validators.required],
      hoursPerDay: ['0.25', Validators.required],
      suggestion: [''],
    });
  }

  ngOnInit(): void {}

  getMinDate() {
    return {
      year: new Date().getFullYear() - this.maxAge,
      month: new Date().getMonth(),
      day: new Date().getDate(),
    };
  }

  getMaxDate() {
    return {
      year: new Date().getFullYear() - this.minAge,
      month: new Date().getMonth(),
      day: new Date().getDate(),
    };
  }

  signOut() {
    this.signOutRequest.emit();
  }

  sendSurvey() {
    this.submitted = true;
    if (this.form.valid) {
      this.db
        .setWithId(databases.survey, this.uid ?? '', this.form.value as Survey)
        .finally(() => {
          this.signOut();
        });
    }
  }
}
