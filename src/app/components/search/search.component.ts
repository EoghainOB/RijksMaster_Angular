import { Component } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { SearchService } from '../../service/search.service';
import centuries from 'src/MockFiles/Centuries';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  parseInt(arg0: any): number {
    throw new Error('Method not implemented.');
  }
  searchValue: string = '';
  value: number = 0;
  page: number = 1;
  centuries = centuries;
  century: number = 0;

  constructor(private router: Router, private searchService: SearchService) {}

  search() {
    if (this.searchValue.length > 1) {
      this.searchService.setSearchTerm(this.searchValue);
      this.searchService.setSearch(this.searchValue);
      axios
        .get(
          `https://www.rijksmuseum.nl/api/en/collection?key=6x1qSUeZ&q=${this.searchValue}&ps=10&p=${this.page}`
        )
        .then((res) => {
          if (res.data.artObjects) {
            this.searchService.setSearchData(res.data.artObjects);
            this.searchService.setCentury(0);
            this.router.navigate(['/results']);
          } else {
            console.log('No results found');
          }
        });
    }
  }

  dateSearch(event: any) {
    const century = parseInt(event);
    this.searchService.setCentury(century);
    axios
      .get(
        `https://www.rijksmuseum.nl/api/en/collection?key=6x1qSUeZ&f.dating.period=${century}&ps=10&p=${this.page}`
      )
      .then((res) => {
        if (res.data.artObjects) {
          this.searchService.setSearchData(res.data.artObjects);
          this.searchService.setSearchTerm('');
          this.searchService.setSearch('');
          this.router.navigate(['/results']);
        } else {
          console.log('No results found');
        }
      });
  }
}
