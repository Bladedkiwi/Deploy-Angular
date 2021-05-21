import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * WindRefService
 * This method returns a single reference to the DOM window object.
 * The window object contains useful functions to interact with the browser window.
 */
export class WindRefService {

  constructor() { }

  getNativeWindow(): Window {
    return window;
  }
}
