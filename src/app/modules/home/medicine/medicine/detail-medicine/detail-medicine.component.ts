import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-medicine',
  templateUrl: './detail-medicine.component.html',
  styleUrls: ['./detail-medicine.component.css']
})
export class DetailMedicineComponent implements OnInit {


  id: string = '';
  subParam!: Subscription;

  constructor(
    private atvRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subParam = this.atvRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

}
