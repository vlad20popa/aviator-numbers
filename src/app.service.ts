import { Injectable } from '@nestjs/common';
import { Builder, By } from 'selenium-webdriver';
import * as fs from 'fs';

@Injectable()
export class AppService {
  async getHello() {
    const driver = await new Builder().forBrowser('chrome').build();

    //Navigate to the url passed in
    await driver.get('https://google.com');

    const elements = await driver.findElement(By.id('L2AGLb')).click();
    await driver.findElement(By.className('gLFyf')).sendKeys('test');
    console.log(elements);

    //Capture the screenshot
    const image = await driver.takeScreenshot();

    await fs.writeFileSync('./images/nyt-selenium.png', image, 'base64');
    // await driver.quit();
    return Promise.resolve();
  }
}
