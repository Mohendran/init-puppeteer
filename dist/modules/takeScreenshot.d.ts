import { Page } from 'puppeteer';
import { ScreenOnError } from '../../typings';
export declare function takeScreenshot(page: Page, screenOnError: ScreenOnError): Promise<string>;
