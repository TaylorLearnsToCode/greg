import { browser, by, element } from 'protractor';

/** AppPage */
export class AppPage {
  /** navigateTo */
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  /** getTitleText */
  getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText() as Promise<
      string
    >;
  }
}
