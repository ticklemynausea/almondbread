module.exports = function override(config, env) {
  // Add src/ to resolve modules path.
  config.resolve.modules.push(
    "src",
    "src/components",
    "src/enhancers",
    "src/lib",
  );

  // WebWorker webpack loader
  config.module.rules[1].oneOf.unshift(
    {
      test: /\.worker\.js$/,
      use: { loader: "worker-loader" },
    },
  );

  return config;
}
