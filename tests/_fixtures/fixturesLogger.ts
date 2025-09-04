import { test as base } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';

export const test = base.extend<
  {},
  {
    logger;
  }
>({
  logger: [
    async ({}, use) => {
      const logger = new Logger('debug');

      await use(logger);
    },
    { scope: 'worker' },
  ],
});
