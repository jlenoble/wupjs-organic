import Deps, { Options } from "./common";
import BabelConfig from "./babel";
import EslintConfig from "./eslint";
import GulpConfig from "./gulp";
import MochaConfig from "./mocha";
import TypescriptConfig from "./typescript";

const defaultOptions: Options = {
  babel: true,
  eslint: true,
  gulp: true,
  mocha: true,
  node: "current",
  prettier: true,
  typescript: true
};

export default class Tools extends Deps {
  public readonly babel: BabelConfig;
  public readonly eslint: EslintConfig;
  public readonly gulp: GulpConfig;
  public readonly mocha: MochaConfig;
  public readonly typescript: MochaConfig;

  public constructor(options: Options = defaultOptions) {
    super();

    this.babel = new BabelConfig(options);
    this.eslint = new EslintConfig(options);
    this.gulp = new GulpConfig(options);
    this.mocha = new MochaConfig(options);
    this.typescript = new TypescriptConfig(options);

    this._addDeps(this.babel.deps);
    this._addDeps(this.eslint.deps);
    this._addDeps(this.gulp.deps);
    this._addDeps(this.mocha.deps);
    this._addDeps(this.typescript.deps);
  }
}