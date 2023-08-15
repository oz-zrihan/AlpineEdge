import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Type } from '../shared/models/type';
import { ShopService } from './../shop/shop.service';
import { Component, OnInit } from '@angular/core';
import { ShopParams } from '../shared/models/shopParams';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  types: Type[] | null = null;
  baseImageUrl = environment.pictureUrl;

  constructor(private shopService: ShopService, private router: Router) {}

  ngOnInit(): void {
    this.shopService.getTypes().subscribe({
      next: (types) => (this.types = types),
    });
  }

  selectType(id: number) {
    this.router.navigate(['/shop'], { queryParams: { typeId: id } });
  }
}
