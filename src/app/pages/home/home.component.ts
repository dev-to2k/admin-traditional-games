import { Component, OnInit } from '@angular/core'
import { Game, User } from '../../interfaces'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public name: string = 'Admin page'

  public fruits: string[] = [
    'Apple',
    'Orange',
    'Banana',
    'Pineapple',
    'Strawberry',
    'Mango',
    'Watermelon',
    'Grape',
    'Peach',
    'Cherry',
  ]

  public users: User[] = [
    { name: 'John', age: 15, isAdmin: false, isActive: true },
    { name: 'Jane', age: 20, isAdmin: true, isActive: true },
    { name: 'Bob', age: 25, isAdmin: false, isActive: false },
    { name: 'Alice', age: 30, isAdmin: true, isActive: true },
  ]

  // let create list of 5 traditional games have 3 properties: name, description, guide
  public games: Game[] = [
    {
      name: 'Chess',
      description:
        'Chess is a two-player strategy board game played on a chessboard, a checkered game board with 64 squares arranged in an eight-by-eight grid.',
      guide: 'https://en.wikipedia.org/wiki/Chess',
    },
    {
      name: 'Go',
      description:
        'Go is an abstract strategy board game for two players, in which the aim is to surround more territory than the opponent.',
      guide: 'https://en.wikipedia.org/wiki/Go_(game)',
    },
    {
      name: 'Xiangqi',
      description:
        'Xiangqi, also known as Chinese chess, is a strategy board game for two players. It is played on a board of 10×9 grid lines or 90 intersections.',
      guide: 'https://en.wikipedia.org/wiki/Xiangqi',
    },
    {
      name: 'Shogi',
      description:
        'Shogi is a Japanese chess variant. It is played on a board of 9×9 grid lines or 81 squares, similar to Western chess, but with a different initial setup and different rules.',
      guide: 'https://en.wikipedia.org/wiki/Shogi',
    },
    {
      name: 'Janggi',
      description:
        'Janggi, also known as Korean chess, is a strategy board game for two players. It is played on a board of 9×10 grid lines or 90 intersections.',
      guide: 'https://en.wikipedia.org/wiki/Janggi',
    },
  ]

  public gameSelected: Game = {
    name: '',
    description: '',
    guide: '',
  }

  constructor() {
    this.gameSelected = this.games[0]
  }

  ngOnInit(): void { }

  public resetName(): void {
    this.name = 'Admin page'
  }

  public changeGame(game: Game): void {
    this.gameSelected = game
  }
}
