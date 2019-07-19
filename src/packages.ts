import fse from "fs-extra";
import path from "path";
import { ProdDependencies, DevDependencies } from "./dependencies";

export default class Packages {
  public readonly ready: Promise<boolean>;

  protected _packageDir: string;
  protected _packages: Set<string>;

  protected _prodDeps: ProdDependencies[];
  protected _devDeps: DevDependencies[];

  public constructor(packageDir: string) {
    this._packageDir = path.resolve(packageDir);
    this._packages = new Set();

    this._prodDeps = [];
    this._devDeps = [];

    this.ready = this._addPackages().then((): true => true, (): false => false);
  }

  protected async _addPackages({
    packageDir,
    scope
  }: { packageDir?: string; scope?: string } = {}): Promise<void> {
    if (packageDir) {
      packageDir = path.resolve(packageDir);
    } else {
      packageDir = this._packageDir;
    }

    if (scope) {
      packageDir = path.join(packageDir, scope);
    }

    const packages: string[] = await fse.readdir(packageDir);

    for (const pckg of packages) {
      if (/^@/.test(pckg)) {
        await this._addPackages({ packageDir, scope: pckg });
      } else {
        this._packages.add(scope ? path.join(scope, pckg) : pckg);
      }
    }
  }

  public async getProdDependencies(): Promise<ProdDependencies[]> {
    if (!(await this.ready)) {
      return [];
    }

    if (this._prodDeps.length === 0) {
      this._prodDeps = Array.from(
        this._packages,
        (pckg): ProdDependencies => {
          return new ProdDependencies(
            "src/**/*.ts",
            path.join(process.cwd(), "packages", pckg)
          );
        }
      );
    }

    return Promise.all(this._prodDeps);
  }
}