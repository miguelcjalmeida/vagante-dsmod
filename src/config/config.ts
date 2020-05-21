import * as configJson from '../../config.json'
import * as packageJson from '../../package.json'

class Config {
  public buildroom : string
  public version: string
  private assetsDir: string
  private distDir: string
  private projectRootDir: string

  public constructor() {
    this.projectRootDir = __dirname
    this.assetsDir = this.translateDir(configJson.assetsDir)
    this.distDir = this.translateDir(configJson.distDir)
    this.buildroom = configJson.buildroom
    this.version = packageJson.version
  }

  private translateDir(dir: string) {
    return dir.replace('./', `${this.projectRootDir}/../../../`)
  }

  public asset(name: string) {
    return `${this.assetsDir}/${name}`
  }

  public dist(name: string) {
    return `${this.distDir}/${name}`
  }
}

export const config = new Config
