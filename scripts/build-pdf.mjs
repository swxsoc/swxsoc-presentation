import puppeteer from 'puppeteer'
import {pathToFileURL} from 'node:url'
import path from 'node:path'

const args = process.env.CI ? ['--no-sandbox'] : undefined
const browser = await puppeteer.launch({args})
const page = await browser.newPage()
await page.setViewport({width: 1600, height: 900, deviceScaleFactor: 1})
const indexPath = path.resolve('index.html')
const url = pathToFileURL(indexPath).href
await page.goto(`${url}?print-pdf`, {waitUntil: 'networkidle0'})
await page.pdf({
  path: 'swxsoc-presentation.pdf',
  width: '1600px',
  height: '900px',
  margin: {top: 0, right: 0, bottom: 0, left: 0},
  printBackground: true,
  preferCSSPageSize: false,
  waitForFonts: true,
})
await browser.close()