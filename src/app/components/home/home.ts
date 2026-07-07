import { Component } from '@angular/core';
import { FaqSection } from '../landing/faq-section/faq-section';
import { CtaBanner } from '../landing/cta-banner/cta-banner';

@Component({
  selector: 'app-home',
  imports: [FaqSection, CtaBanner],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
