import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
/**
   * Change theme color
   */
 onChangeColor(color: string) {
  document
    .getElementById('color-opt')!
    .setAttribute('href', './assets/css/colors/' + color + '.css');
}

/**
 * Set dark theme
 */
setDark() {
  document.getElementById('theme-opt')!.setAttribute('href', './assets/css/style-dark.min.css');
}

/**
 * Set light theme
 */
setLight() {
  document.getElementById('theme-opt')!.setAttribute('href', './assets/css/style.min.css');
}

/**
 * Set dark-rtl theme
 */
darkRtl() {
  document.getElementById('theme-opt')!.setAttribute('href', './assets/css/style-dark-rtl.min.css');
}
/**
 * Set dark-light theme
 */
darkLtr() {
  document.getElementById('theme-opt')!.setAttribute('href', './assets/css/style-dark.min.css');
}
/**
 * Set rtl theme
 */
setRtl() {
  document.getElementById('theme-opt')!.setAttribute('href', './assets/css/style-rtl.min.css');
}
/**
 * Set light theme
 */
setLtr() {
  document.getElementById('theme-opt')!.setAttribute('href', './assets/css/style.min.css');
}


}
