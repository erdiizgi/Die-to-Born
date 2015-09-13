/// <reference path="./core/GameState.ts"/>
/// <reference path="./core/Game.ts"/>
/// <reference path="./core/Scene.ts"/>
/// <reference path="./core/World.ts"/>
/// <reference path="./core/Engine.ts"/>
/// <reference path="./helper/Utils.ts"/>
/// <reference path="./ui/Drawable.ts"/>
/// <reference path="./ui/Label.ts"/>
/// <reference path="./ui/StylishLabel.ts"/>
/// <reference path="./ui/Movable.ts"/>
/// <reference path="./ui/MovableLabel.ts"/>
/// <reference path="./component/Story.ts"/>
/// <reference path="./component/StoryTeller.ts"/>
/// <reference path="./component/Graphics.ts"/>
/// <reference path="./component/Player.ts"/>
/// <reference path="./component/Grid.ts"/>
/// <reference path="./component/Game/GameStatus.ts"/>


import GameState = MCGE.Core.GameState;
import Scene = MCGE.Core.Scene;
import World = MCGE.Core.World;
import Engine = MCGE.Core.Engine;
import Drawable = MCGE.UI.Drawable;
import Utils = MCGE.Helper.Utils;
import Label = MCGE.UI.Label;
import StylishLaber = MCGE.UI.StylishLabel;
import MovableLabel = MCGE.UI.MovableLabel;
import Story = MCGE.Component.Story;
import StoryTeller = MCGE.Component.StoryTeller;
import Game = MCGE.Core.Game;
import Player = MCGE.Component.Graphics.Player;
import Mountain = MCGE.Component.Graphics.Mountain;
import Platform = MCGE.Component.Graphics.Platform;
import InfoBox = MCGE.Component.Graphics.InfoBox;
import Grid = MCGE.Component.Grid;
import GameStatus = MCGE.Component.Game.GameStatus;

function Main() {

    var game = new Game("Die to Born", 800, 600);

    //Add a storyteller
    var storyScene = new Scene("StoryScene");
    var storyTeller = new StoryTeller(storyScene, game.width, game.height);

    //Add some story to storyTeller
    storyTeller.addStoryText("Science says that we came from singularity and&after the BigBang, singularity became our universe&which has been expanding continiously.&Time has been ticking forward. You were born in 1989&and collected so much memories with your family.&Evantually you died in 2064.");
    storyTeller.addStoryText("The theory says that there is a limit for expanding& and if the size of the universe reaches to this limit& universe would start to shrink.&When the shrinking starts,& Everything would be REVERSED& Even the time!&Well, that limit has been reached and&the time has started to running back.&So, you will die, live and born again.&Then you will disappear forever&like you have never existed.");
    storyTeller.addStoryText("There is nothing to do except one.&You can fall as fast as you can,&only this will make the time slower and&keep your memories in your mind.&&Just use the left and right arrow keys to play.");
   
    //Add a world
    var world: World = new World(); 

    var gameScene: Scene = new Scene("Game");
    var player = new Player(380, 100);
    game.addPlayer(player);
    gameScene.addDrawable(player);
  

    var grid: Grid = new Grid(game, 6, 4);
    grid.init(); 

    for (var i = 0; i < grid.rowCount; i++) {
        for (var j = 0; j < grid.columnCount; j++) {
            gameScene.addDrawable(grid.platformDrawables[i][j]);
        }
    }

    for (var i = 0; i < grid.rowCount; i++) {
        for (var j = 0; j < grid.columnCount; j++) {
            gameScene.addDrawable(grid.mountainDrawables[i][j]);
        }
    }
    
    var ageBox = new InfoBox(110, 10, 75, "#17a4e6");
    var memoryBox = new InfoBox(400, 10, 100, "#00ff00");
    var speed = new InfoBox(640, 10, 10, "#ff1e1f");

    gameScene.addDrawable(ageBox);
    gameScene.addDrawable(memoryBox);
    gameScene.addDrawable(speed);
    gameScene.addDrawable(new Label("Age:", 50, 32, 22, "Impact", "black"));
    gameScene.addDrawable(new Label("Memories:", 265, 32, 22, "Impact", "black"));
    gameScene.addDrawable(new Label("Speed:", 550, 32, 22, "Impact", "black"));

    //Add scene to the world
    world.AddStroyScene(storyScene);
    world.AddScene(gameScene);
   
    //Add world to the game
    game.add2dWorld(world);

    //Add an engine to run the world and initialize it
    var engine: Engine = new Engine(game);
    engine.setStoryTeller(storyTeller);
    engine.gameStatus.addInfoBoxes(ageBox, memoryBox, speed);
    engine.init();
    engine.run(grid);
}

//Invoke the Main when page is loaded
window.addEventListener("load", Main, false);

