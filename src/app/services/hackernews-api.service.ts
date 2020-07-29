import { Injectable } from '@angular/core';
import { StoryAdapter, Story } from '../models/story.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HackernewsApiService {

  constructor(
    private http: HttpClient,
    private adapterS: StoryAdapter
  ) { }


  getFeed(feedType, page = 1): Observable<Story[]> {
    return this.http.get(`https://api.hackerwebapp.com/${feedType}?page=${page}`)
      .pipe(
        map((res: any[]) => res.map(item => this.adapterS.adapt(item))
        )
      )

  }
}
