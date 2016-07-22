LLK.B1Scene = LLK.GameScene.extend({
    
    getName:function(){
        return "B1Scene";
    },
    onEnter:function () {
        this._super();
        this.renderBGLayer();
        this.renderMenuLayer();
        this.renderGameLayer();
    },
    reload:function(){
        this._super();
        cc.director.runScene(this);
    },
    renderBGLayer:function(){
        var bgLayer = new cc.LayerColor(cc.color(10,10,10,255));
        this.addChild(bgLayer);
    },
    renderMenuLayer:function(){
        var menuLayer = new cc.Menu();

        var mi_startGame = new cc.MenuItemFont("返回首页", function(){
            LLK.loadHomeScene();
        });

        var size = cc.director.getWinSize();
        var fontSize = 30;
        mi_startGame.setFontSize(fontSize);
        mi_startGame.setPosition(cc.p(0,size.height/2-fontSize/2-10));

        menuLayer.addChild(mi_startGame);
        this.addChild(menuLayer);
    },
    renderGameLayer:function(){
        //var gridsLayer = new LLK.LayerGrids();
        //this.addChild(gridsLayer);
        var gameLayer = new LLK.LayerGame();
        this.addChild(gameLayer);
        cc.log("renderGameLayer");
    }
});