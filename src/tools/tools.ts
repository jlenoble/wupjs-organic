import Deps, { Options } from "./common";
import BabelConfig from "./babel";
import EslintConfig from "./eslint";
import MochaConfig from "./mocha";

const defaultOptions: Options = {
  babel: true,
  eslint: true,
  mocha: true,
  prettier: true,
  typescript: true
};

export default class Tools extends Deps {
  public readonly babel: BabelConfig;
  public readonly eslint: EslintConfig;
  public readonly mocha: MochaConfig;

  public constructor(options: Options = defaultOptions) {
    super();

    this.babel = new BabelConfig(options);
    this.eslint = new EslintConfig(options);
    this.mocha = new MochaConfig(options);

    this._addDeps(this.babel.deps);
    this._addDeps(this.eslint.deps);
    this._addDeps(this.mocha.deps);
  }
}
