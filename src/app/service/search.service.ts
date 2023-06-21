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
  private century: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private paging: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  setPaging(page: number): void {
    this.paging.next(page);
  }

  getPaging(): Observable<number> {
    return this.paging.asObservable();
  }

  setCentury(century: number): void {
    this.century.next(century);
  }

  getCentury(): Observable<number> {
    return this.century.asObservable();
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
