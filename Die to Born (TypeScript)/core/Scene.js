var Core;
(function (Core) {
    var Scene = (function () {
        function Scene(name) {
            this.id = name;
            this.canvas = document.createElement("canvas");
            this.canvas.setAttribute('id', this.id);
        }
        Object.defineProperty(Scene.prototype, "scene", {
            get: function () {
                return this.canvas;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "name", {
            get: function () {
                return this.id;
            },
            enumerable: true,
            configurable: true
        });
        return Scene;
    })();
    Core.Scene = Scene;
})(Core || (Core = {}));
//# sourceMappingURL=Scene.js.map