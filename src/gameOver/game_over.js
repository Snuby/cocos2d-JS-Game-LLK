/**
 * Created by suweijie on 16/7/24.
 */
LLK.GameOverScene = LLK.GameScene.extend({
    getName:function(){
        return "HomeScene";
    },
    onEnter:function () {
        this._super();
        var blackLayer = new cc.LayerColor(cc.color(0,0,0,255));
        var menuLayer = new cc.Menu();

        var mi_startGame = new cc.MenuItemFont("开始游戏", function(){
            LLK.loadB1Scene();
        });
        var mi_about = new cc.MenuItemFont("关于", function(){
            cc.log("click 关于");
        });

        menuLayer.addChild(mi_startGame);
        menuLayer.addChild(mi_about);
        menuLayer.alignItemsVerticallyWithPadding(20);

        this.addChild(blackLayer);
        this.addChild(menuLayer);
    },
    reload:function(){
        this._super();
        cc.director.runScene(this);
    }
});


