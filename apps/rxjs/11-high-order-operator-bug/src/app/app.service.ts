import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, of } from 'rxjs';
import { LocalDBService, TopicType } from './localDB.service';

@Injectable({ providedIn: 'root' })
export class AppService {
  private dbService = inject(LocalDBService);

  getAllInfo = this.dbService.infos;

  deleteOldTopics(type: TopicType): Observable<boolean> {
    const infoByType = this.dbService.searchByType(type);

    if (!infoByType.length) {
      return of(true);
    }

    return forkJoin(
      infoByType.map((i) => this.dbService.deleteOneTopic(i.id)),
    ).pipe(map((res: boolean[]) => res.every((i) => i)));
  }
}
