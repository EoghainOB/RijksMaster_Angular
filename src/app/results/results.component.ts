import { Component, OnInit } from '@angular/core';
import { SearchService } from '../service/search.service';
import { IData } from 'src/types';
import { Router } from '@angular/router';

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

  constructor(private router: Router, private searchService: SearchService) {}

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
    if (this.searchTerm === '' && this.century === 0) {
      this.router.navigate(['/']);
    }
  }
  filterSearchData() {
    if (this.searchData.length > 0) {
      this.filteredSearchData = this.searchData.filter(
        (data) => data.hasImage === true
      );
    }
  }
}
