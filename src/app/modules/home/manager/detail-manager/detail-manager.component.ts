import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-manager',
  templateUrl: './detail-manager.component.html',
  styleUrls: ['./detail-manager.component.css']
})
export class DetailManagerComponent implements OnInit {

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
