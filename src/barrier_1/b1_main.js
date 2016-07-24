LLK.B1Scene = LLK.GameScene.extend({

    ctor:function(){
        this._super();
        this.gameLayer = undefined;
        this.menuLayer = undefined;
        //this.renderBGLayer();
    },
    getName:function(){
        return "B1Scene";
    },
    onEnter:function () {
        this._super();
        cc.log("enter b1");
        this.renderBGLayer();
        this.renderGameLayer();
        this.renderMenuLayer();
    },
    onGameOver : function(){
        cc.log("gameOver");
        if(g_configs.soundSwitch){
            cc.audioEngine.playEffect(g_resources.GameOver_wav, false);
        }
        var _this = this;

        var winSize = cc.director.getWinSize();
        var bgLayer = new cc.LayerColor(cc.color(0,50,100,100), winSize.width, winSize.height);

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
            swallowTouches: true,
            //onTouchBegan event callback function
            onTouchBegan: function (touch, event) {
                return true;
            }
        });
        cc.eventManager.addListener(listener,bgLayer);
        bgLayer.attr({
            x : winSize.width
        });

        var moveTo = new cc.MoveTo(0.2, cc.p(0, 0));
        bgLayer.runAction(moveTo);

        var menu = new cc.Menu();

        var mi_startGame = new cc.MenuItemFont("Restart", function(){
            var moveTo = new cc.MoveTo(0.2, cc.p(winSize.width, 0));
            bgLayer.runAction(moveTo);

            _this.removeChild(_this.gameLayer);
            _this.removeChild(_this.menuLayer);

            _this.renderGameLayer();
            _this.renderMenuLayer();
        });
        //mi_startGame.setFontFillColor(cc.color(50,50,50,255));
        
        menu.addChild(mi_startGame);
        menu.alignItemsVerticallyWithPadding(20);

        bgLayer.addChild(menu);
        this.addChild(bgLayer);

    },
    reload:function(){
        this._super();
        cc.director.runScene(this);
    },
    renderBGLayer:function(){
        var bgLayer = new cc.LayerColor(cc.color(10,10,10,0));
        var bg = new cc.Sprite(g_resources.GameBG_jpg);
        bgLayer.addChild(bg, 0);

        bg.attr({
            x : cc.director.getWinSize().width/2,
            y : cc.director.getWinSize().height/2
        });
        this.addChild(bgLayer, 0);
    },
    renderMenuLayer:function(){
        var _this = this;
        var winSize = cc.director.getWinSize();
        var layerHeight = 60;
        this.menuLayer = new cc.LayerColor(cc.color(255,255,255,0), winSize.width, layerHeight);
        this.menuLayer.setPosition(cc.p(0, winSize.height-layerHeight))
        var labelTime = new cc.LabelTTF('Time left:' + g_configs.playSeconds + "s",  'Times New Roman', 25, cc.size(200,40), cc.TEXT_ALIGNMENT_LEFT);
        labelTime.setFontFillColor(cc.color(200,0,0,255));
        labelTime.attr({
            x : 40,
            y : layerHeight/2,
            anchorX : 0,
        });
        labelTime.schedule(function(){
            _this.gameLayer.gameManager.seconds--;
            labelTime.setString("Time left:"+_this.gameLayer.gameManager.seconds+"s");
            if(_this.gameLayer.gameManager.seconds === 0){
                labelTime.unschedule("labelTime");
                _this.onGameOver();
                cc.log("labelTime end");
                return;
            }
        },1,cc.REPEAT_FOREVER,0,"labelTime");


        var progressSprite = new cc.Sprite(g_resources.Progress_png);
        /*var mi_progress = new cc.ProgressTimer(progressSprite);

        mi_progress.setMidpoint(cc.p(0,0));
        mi_progress.setScale(120,1);
        mi_progress.setBarChangeRate(cc.p(1,0));
        mi_progress.setType(cc.ProgressTimer.TYPE_BAR);
        mi_progress.setAnchorPoint(cc.p(0.5,0.5));

        mi_progress.setPosition(labelTime.getPositionX() - 10, layerHeight/2);

        this.menuLayer.addChild(mi_progress, 1);*/
        this.menuLayer.addChild(labelTime , 1);

        // var pFromTo = new cc.ProgressFromTo(seconds, 100, 0);
        // var callFun = new cc.CallFunc(function(){
        //     _this.onGameOver();
        // }, this);
        // var seq = new cc.Sequence(pFromTo, callFun);

        //mi_progress.runAction(seq);

        this.addChild(this.menuLayer);
    },
    renderGameLayer:function(){
        //var gridsLayer = new LLK.LayerGrids();
        //this.addChild(gridsLayer);
        this.gameLayer = new LLK.LayerGame();
        this.addChild(this.gameLayer);
        cc.log("renderGameLayer");
    }
});