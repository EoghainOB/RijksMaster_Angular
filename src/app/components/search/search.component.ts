import { Component } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { SearchService } from '../../service/search.service';
import centuries from 'src/MockFiles/Centuries';
import suggestions from 'src/MockFiles/ArtistList';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchValue: string = '';
  matchingSuggestions: string[] = [];
  page: number = 1;
  centuries = centuries;
  suggestions = suggestions;
  century: number = 0;
  faMagnifyingGlass = faMagnifyingGlass;

  constructor(private router: Router, private searchService: SearchService) {}

  handleInput(value: string) {
    this.searchValue = value;
    this.matchingSuggestions = this.getSuggestions(value);
  }

  handleInputFocus() {
    this.matchingSuggestions = [];
    this.searchValue = '';
  }

  getSuggestions(value: string): string[] {
    return this.suggestions.filter((suggestion) =>
      suggestion.toLowerCase().startsWith(value.toLowerCase())
    );
  }

  handleSearch(suggestion: string) {
    this.searchValue = suggestion;
    this.search();
  }

  search() {
    if (this.searchValue.length > 1) {
      this.searchService.setSearchTerm(this.searchValue);
      this.searchService.setSearch(this.searchValue);
      this.searchService.setCentury(0);
      axios
        .get(
          `https://www.rijksmuseum.nl/api/en/collection?key=6x1qSUeZ&q=${encodeURIComponent(
            this.searchValue
          )}&ps=10&p=${this.page}`
        )
        .then((res) => {
          if (res.data.artObjects) {
            this.searchService.setSearchData(res.data.artObjects);
            this.router.navigate(['/results']);
            this.matchingSuggestions = [];
          } else {
            console.log('No results found');
          }
        });
    }
  }

  dateSearch(event: any) {
    const century = parseInt(event);
    this.searchService.setCentury(century);
    this.searchService.setSearchTerm('');
    this.searchService.setSearch('');
    axios
      .get(
        `https://www.rijksmuseum.nl/api/en/collection?key=6x1qSUeZ&f.dating.period=${century}&ps=10&p=${this.page}`
      )
      .then((res) => {
        if (res.data.artObjects) {
          this.searchService.setSearchData(res.data.artObjects);
          this.router.navigate(['/results']);
        } else {
          console.log('No results found');
        }
      });
  }
}
