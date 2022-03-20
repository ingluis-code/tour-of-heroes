import { Component, Input, OnInit } from '@angular/core';


/*
  El ActivatedRoutecontiene información sobre la ruta a esta instancia del 
  HeroDetailComponent. Este componente está interesado en los parámetros de la ruta
   extraídos de la URL. El parámetro "id" es el iddel héroe a mostrar.
*/
import { ActivatedRoute } from '@angular/router';


/*
  El locationes un servicio de Angular para interactuar con el navegador.
  Lo usará más tarde para volver a la vista que navegó aquí
*/
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;
  
  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private location: Location
              ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

}
