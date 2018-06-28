import { NavigationOptions } from 'puppeteer';
import { GetWaitCondition } from '../typings';
export declare const LONG_TIMEOUT = 60000;
export declare const TIMEOUT = 5000;
export declare const SHORT_TIMEOUT = 100;
export declare const waitForNetwork: NavigationOptions;
export declare const getWaitCondition: (condition: GetWaitCondition) => NavigationOptions;
export declare const waitForTimeout: (ms: any) => NavigationOptions;
