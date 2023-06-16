import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IData } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchDataSubject: BehaviorSubject<IData[]> = new BehaviorSubject<
    IData[]
  >([]);
  private searchTermSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private centurySubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );

  setCentury(century: number): void {
    this.centurySubject.next(century);
  }

  getCentury(): Observable<number> {
    return this.centurySubject.asObservable();
  }

  setSearch(term: string): void {
    this.searchSubject.next(term);
  }

  getSearch(): Observable<string> {
    return this.searchSubject.asObservable();
  }

  setSearchData(data: IData[]): void {
    this.searchDataSubject.next(data);
  }

  getSearchData(): Observable<IData[]> {
    return this.searchDataSubject.asObservable();
  }

  setSearchTerm(term: string): void {
    this.searchTermSubject.next(term);
  }

  getSearchTerm(): Observable<string> {
    return this.searchTermSubject.asObservable();
  }
}
