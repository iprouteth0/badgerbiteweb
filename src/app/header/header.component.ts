import { Component, OnInit, Input } from '@angular/core';
import { LeftHandMenuService } from "../service/left-hand-menu.service";
import { StateService } from "../service/state.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


sliderTopbar?: boolean;


  constructor(private leftHandMenuService: LeftHandMenuService,
              public stateService: StateService) {
  }

  ngOnInit(): void {
  }

  openLeftHandMenuForMobile(): void {
    this.leftHandMenuService.openLeftHandMenuForMobile();
  }
}
