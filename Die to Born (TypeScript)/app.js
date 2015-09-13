/// <reference path="./core/Engine.ts"/>
/// <reference path="./core/Scene.ts"/>
/// <reference path="./core/World.ts"/>
var Scene = Core.Scene;
var World = Core.World;
var Engine = Core.Engine;
function Main() {
    var TAG = "MAIN";
    console.log(TAG, "It is working");
    //Add a scene
    var scene = new Scene("background");
    //Add a world
    var world = new World();
    //Add scene to the world
    world.AddScene(scene);
    //Add an engine to run the world and initialize it
    var engine = new Engine(world);
    engine.init();
}
//Invoke the Main when page is loaded
window.addEventListener("load", Main, false);
//# sourceMappingURL=app.js.map