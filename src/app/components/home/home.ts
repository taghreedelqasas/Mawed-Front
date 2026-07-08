import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Hero } from "../hero/hero";
import { SearchSection } from '../search-section/search-section';

@Component({
  selector: 'app-home',
  imports: [Navbar, Hero,SearchSection],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
