var Core;
(function (Core) {
    var Engine = (function () {
        function Engine(world) {
            this.world = world;
        }
        Engine.prototype.init = function () {
            for (var i = 0; i < this.world.Scenes.length; i++) {
                document.body.appendChild(this.world.Scenes[i].scene);
            }
        };
        Engine.prototype.run = function () {
        };
        return Engine;
    })();
    Core.Engine = Engine;
})(Core || (Core = {}));
//# sourceMappingURL=Engine.js.map