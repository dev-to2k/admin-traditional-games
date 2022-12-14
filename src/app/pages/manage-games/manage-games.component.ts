import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Game } from 'src/app/interfaces';
import { GameApiService } from './../../services/api.service';
import { FileUploadService } from './../../services/file-upload.service';

@Component({
  selector: 'app-manage-games',
  templateUrl: './manage-games.component.html',
  styleUrls: ['./manage-games.component.css']
})
export class ManageGamesComponent implements OnInit {
  public displayModalAdd: boolean = false;
  public displayModalUpdate: boolean = false;
  public shortLink: string = '';
  public image: File | null = null;
  public loading: boolean = false;
  public search: string = '';
  public games: Game[] = []
  public gameEdit: Game = {
    id: '',
    name: '',
    description: '',
    guide: '',
    image: ''
  };

  constructor(private formBuilder: FormBuilder, private fileUploadService: FileUploadService, private gameApi: GameApiService) {
    this.getAllGames();
  }

  ngOnInit(): void {
  }

  addGameForm = this.formBuilder.group({
    id: '',
    name: '',
    description: '',
    guide: '',
    image: ''
  });

  updateGameForm = this.formBuilder.group({
    id: '',
    name: '',
    description: '',
    guide: '',
    image: ''
  });

  public getAllGames(): void {
    this.gameApi.getAllGames().subscribe((games: Game[]) => {
      this.games = games;
    });
  }

  public onChangeImage(event: any) {
    this.image = event.target.files[0];

  }

  public async uploadImage() {
    this.loading = !this.loading;
    await this.fileUploadService.formDataUpload({
      accountId: "FW25az7",
      apiKey: "public_FW25az747yyjs9SmbiJo1kY7vgFz",
      requestBody: this.image,
    }).then((res: any) => {
      this.shortLink = res.files[0].fileUrl;
      this.loading = false;
    }).catch((err: any) => {
      console.error(err);
      this.loading = false;
    });

  }

  public async addGame() {
    this.addGameForm.value.image = this.shortLink;

    await this.uploadImage();

    if (this.shortLink) {
      const newGame = {
        id: Math.random().toString(36).substr(2, 9),
        name: this.addGameForm.value.name,
        description: this.addGameForm.value.description,
        guide: this.addGameForm.value.guide,
        image: this.shortLink
      }

      this.displayModalAdd = false;

      // TODO: Add game to database
      this.gameApi.createGame(newGame).subscribe(() => {
        this.gameApi.getAllGames().subscribe((games: Game[]) => {
          this.games = games;
        });
      });
    }
  };

  public async updateGame() {
    await this.uploadImage();

    if (this.shortLink) {
      this.gameEdit = {
        id: this.gameEdit.id,
        name: this.updateGameForm.value.name,
        description: this.updateGameForm.value.description,
        guide: this.updateGameForm.value.guide,
        image: this.shortLink
      }

      this.displayModalUpdate = false;

      this.gameApi.updateGame(this.gameEdit).subscribe(() => {
        this.gameApi.getAllGames().subscribe((games: Game[]) => {
          this.games = games;
        });
      });
    }
  }

  public deleteGame(id: string): void {
    this.gameApi.deleteGame(id).subscribe(() => {
      this.gameApi.getAllGames().subscribe((games: Game[]) => {
        this.games = games;
      });
    });
  }

  public openModalAdd(): void {
    this.displayModalAdd = true;
  }

  public closeModalAdd(): void {
    this.displayModalAdd = false;
  }

  public openModalUpdate(game: Game): void {
    this.displayModalUpdate = true;
    this.gameEdit = game;
    this.updateGameForm.patchValue({
      id: game.id,
      name: game.name,
      description: game.description,
      guide: game.guide,
      // image: game.image
    });
  }

  public closeModalUpdate(): void {
    this.displayModalUpdate = false;
  }
}
