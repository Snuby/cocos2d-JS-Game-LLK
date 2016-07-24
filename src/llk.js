/**
 * Created by suweijie on 16/7/8.
 */
window.LLK = (function(){
    var LLK = window.LLK || {};
    LLK.configs = {
        debugMode:true
    };

    var scenes = {};

    LLK.currentScene = undefined;

    LLK.loadHomeScene = function(){
        if(!scenes.homeScene){
            scenes.homeScene = new LLK.HomeScene();
        }

        LLK.currentScene = scenes.homeScene;
        LLK.currentScene.reload();
    };

    LLK.loadB1Scene = function(startNew){
        if(!scenes.b1Scene || startNew){
            scenes.b1Scene = new LLK.B1Scene();
        }
        cc.loader.register(["mp3","jpg","png","wav"]);
        cc.LoaderScene.preload(g_resources_array(),function(){
            LLK.currentScene = scenes.b1Scene;
            LLK.currentScene.reload();
        });
    };

    LLK.loadGameOverScene = function(){
        if(!scenes.gameOverScene){
            scenes.gameOverScene = new LLK.GameOverScene();
        }

        LLK.currentScene = scenes.gameOverScene;
        LLK.currentScene.reload();
    };
    return LLK;
})();
