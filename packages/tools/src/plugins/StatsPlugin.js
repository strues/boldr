import merge from 'lodash.merge';
// Credit to https://github.com/unindented/stats-webpack-plugin
// outdated peer-deps result in copy-pasta

/**
 * Create a new StatsPlugin that causes webpack to generate a stats file as
 * part of the emitted assets.
 * @constructor
 * @param {String} output Path to output file.
 * @param {Object} options Options passed to the stats' `.toJson()`.
 */

function StatsPlugin(output, options, cache) {
  this.output = output;
  this.options = options;
  this.cache = cache;
}

StatsPlugin.prototype.apply = function apply(compiler) {
  const output = this.output;
  const options = this.options;
  let cache = this.cache;

  compiler.plugin('emit', function onEmit(compilation, done) {
    let result;

    compilation.assets[output] = {
      size: function getSize() {
        return (result && result.length) || 0;
      },
      source: function getSource() {
        const stats = compilation.getStats().toJson(options);

        if (cache) {
          cache = merge(cache, stats);
          if (stats.errors) {
            cache.errors = stats.errors;
          }
          if (stats.warnings) {
            cache.warnings = stats.warnings;
          }
          result = JSON.stringify(cache);
        } else {
          result = JSON.stringify(stats);
        }
        return result;
      },
    };
    done();
  });
};

export default StatsPlugin;
