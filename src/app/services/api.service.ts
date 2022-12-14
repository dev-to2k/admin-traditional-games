import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from './../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class GameApiService {

  baseApiUrl = "http://localhost/api";

  headerOptions = {
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    }
  }

  constructor(private httpClient: HttpClient) { }

  getAllGames(): Observable<Game[]> {
    const response = this.httpClient.get(`${this.baseApiUrl}/getGames.php`);
    return response as Observable<Game[]>;
  }

  createGame(game: Game): Observable<Game> {
    return this.httpClient.post(`${this.baseApiUrl}/createGame.php`, game,) as Observable<Game>;
  }

  updateGame(game: Game): Observable<Game> {
    return this.httpClient.put(`${this.baseApiUrl}/updateGame.php`, game) as Observable<Game>;
  }

  deleteGame(id: string): Observable<Game> {
    return this.httpClient.delete(`${this.baseApiUrl}/deleteGame.php?id=${id}`) as Observable<Game>;
  }
}
