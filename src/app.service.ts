import { Injectable } from "@nestjs/common";
import { Builder, By } from "selenium-webdriver";
import * as fs from "fs";

@Injectable()
export class AppService {

  sleep = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  async getHello() {
    const driver = await new Builder().forBrowser('chrome').build();

    //Navigate to the url passed in
    await driver.get(
      'https://www.maxbet.ro/ro/jocuri-pacanele-online/aviator-spribe',
    );

    while (true) {
      try {
        const button = await driver.findElement(
          // By.xpath("//button[@class='btn.btn-success.bet.ng-star-inserted']"),
          (By.css("div[class='btn btn-success bet ng-star-inserted']")),
          // By.className('btn.btn-success.bet.ng-star-inserted'),
        );
        console.log(button.isEnabled());
        await this.sleep(500);
      } catch (e) {
        console.log('no element found');
        console.log(e.message);
      }
    }

    //Capture the screenshot
    const image = await driver.takeScreenshot();

    await fs.writeFileSync('./images/nyt-selenium.png', image, 'base64');
    // await driver.quit();
    return Promise.resolve();
  }
}
