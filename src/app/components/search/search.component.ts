import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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
export class SearchComponent implements OnInit, OnDestroy {
  searchValue: string = '';
  matchingSuggestions: string[] = [];
  page: number = 1;
  centuries = centuries;
  suggestions = suggestions;
  century: number = 0;
  faMagnifyingGlass = faMagnifyingGlass;

  private pagingSubscription!: Subscription;

  constructor(private router: Router, private searchService: SearchService) {}

  ngOnInit() {
    this.searchService.getCentury().subscribe((century: number) => {
      this.century = century;
    });

    this.searchService.getSearch().subscribe((term: string) => {
      this.searchValue = term;
    });

    this.pagingSubscription = this.searchService
      .getPaging()
      .subscribe((page: number) => {
        this.page = page;
        if (this.century !== 0) {
          this.dateSearch(this.century);
        } else if (this.searchValue !== '') {
          this.search(this.searchValue);
        }
      });
  }

  ngOnDestroy() {
    this.pagingSubscription.unsubscribe();
  }

  handleInput(value: string) {
    this.searchValue = value;
    this.matchingSuggestions = this.getSuggestions(value);
  }

  getSuggestions(value: string): string[] {
    return this.suggestions.filter((suggestion) =>
      suggestion.toLowerCase().startsWith(value.toLowerCase())
    );
  }

  handleSearch(suggestion: string) {
    this.searchValue = suggestion;
    this.search(this.searchValue);
    this.searchService.setPaging(1);
  }

  handleInputFocus() {
    this.matchingSuggestions = [];
    this.searchValue = '';
  }

  search(searchValue: string) {
    this.searchService.setCentury(0);
    if (searchValue.length > 1) {
      this.searchService.setSearchTerm(this.searchValue);
      this.searchService.setSearch(this.searchValue);
      axios
        .get(
          `https://www.rijksmuseum.nl/api/en/collection?key=6x1qSUeZ&q=${this.searchValue}&ps=10&p=${this.page}`
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

  dateSearch(date: any) {
    this.searchService.setSearch('');
    this.searchService.setSearchTerm('');
    const century = parseInt(date);
    if (this.century !== century) {
      this.searchService.setPaging(1);
    }
    this.searchService.setCentury(century);
    axios
      .get(
        `https://www.rijksmuseum.nl/api/en/collection?key=6x1qSUeZ&f.dating.period=${this.century}&ps=10&p=${this.page}`
      )
      .then((res) => {
        if (res.data.artObjects) {
          this.searchService.setSearchData(res.data.artObjects);
          this.router.navigate(['/results']);
          console.log('page after dateSearch', this.page);
        } else {
          console.log('No results found');
        }
      });
  }
}
