import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuList = [
    { title: 'Home', icon: 'home', link: '/' },
    { title: 'Manage Games', icon: 'games', link: '/manage-games' },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
