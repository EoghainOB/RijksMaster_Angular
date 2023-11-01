import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css'],
})
export class PagingComponent implements OnInit {
  page: number = 1;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchService.getPaging().subscribe((page) => {
      this.page = page;
    });
  }

  handlePrevClick = () => {
    if (this.page > 1) {
      this.page -= 1;
      this.searchService.setPaging(this.page);
      this.scrollToTop();
    }
  };

  handleNextClick = () => {
    this.page += 1;
    this.searchService.setPaging(this.page);
    this.scrollToTop();
  };

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
