// This file is required by karma.conf.js and loads recursively all the .spec and framework files
import 'zone.js/dist/sync-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/zone-testing';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/long-stack-trace-zone';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

/** require */
declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp
  ): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
/** context */
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
