import { Component } from '@angular/core';
import { Hero } from "../hero/hero";
import { SearchSection } from '../search-section/search-section';
import { FaqSection } from '../landing/faq-section/faq-section';
import { CtaBanner } from '../landing/cta-banner/cta-banner';

@Component({
  selector: 'app-home',
  imports: [Hero, SearchSection, FaqSection, CtaBanner],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
