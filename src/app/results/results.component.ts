import { Component, OnInit } from '@angular/core';
import { SearchService } from '../service/search.service';
import { Router } from '@angular/router';
import { IData } from 'src/types';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  searchData!: IData[];
  searchTerm!: string;
  century!: number;
  filteredSearchData: IData[] = [];

  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit() {
    this.searchService.getSearchData().subscribe((data) => {
      this.searchData = data;
      this.filterSearchData();
    });
    this.searchService.getSearchTerm().subscribe((term) => {
      this.searchTerm = term;
    });
    this.searchService.getCentury().subscribe((century) => {
      this.century = century;
    });
  }
  filterSearchData() {
    if (this.searchData.length > 0) {
      this.filteredSearchData = this.searchData.filter(
        (data) => data.hasImage === true
      );
    }
  }
}
