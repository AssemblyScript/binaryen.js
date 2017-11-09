  var exports = {};
  for (var key in Module)
    if (/^_(Binaryen|Relooper|malloc$|free$)/.test(key))
      exports[key] = Module[key];

  // Support AMD-compatible loaders by defining a factory function that returns 'Module'
  if (typeof define === "function" && define["amd"])
    define(function() { return exports; });

  // Support CommonJS-compatible loaders by checking for 'require' and 'module.exports'
  else if (typeof require === "function" && typeof module !== "undefined" && module && module.exports)
    module.exports = exports;

  // Otherwise expose as 'Binaryen' globally checking for common names of the global object
  // first (namely 'global' and 'window') and fall back to 'this' (i.e. within web workers).
  else
    (typeof global !== "undefined" && global ||
     typeof window !== "undefined" && window ||
     this)["Binaryen"] = exports;
})();
