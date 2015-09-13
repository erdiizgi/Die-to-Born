var Core;
(function (Core) {
    var World = (function () {
        function World() {
        }
        World.prototype.AddScene = function (scene) {
            this.sceneDeck.push(scene);
        };
        Object.defineProperty(World.prototype, "Scenes", {
            get: function () {
                return this.sceneDeck;
            },
            enumerable: true,
            configurable: true
        });
        return World;
    })();
    Core.World = World;
})(Core || (Core = {}));
//# sourceMappingURL=World.js.map