if (typeof(Module) === "undefined") Module = {};
Module["arguments"] = ["bundle.lua"];
Module["preInit"] = function() {
    FS.createLazyFile('/', "bundle.lua", "/bundle.lua", true, false);
};
Module["print"] = function(s) { self.postMessage({channel: "stdout", line: s}); };
Module["printErr"] = function(s) { self.postMessage({channel: "stderr", line: s}); };