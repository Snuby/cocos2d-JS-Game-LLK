/**
 * Created by suweijie on 16/7/12.
 */

LLK.EleSpriteCell = cc.Sprite.extend({
    eleCell:null,
    eleMap:null,
    type:null,
    value:null,
    touchListener:null,
    state: null,
    bgSprite:null,
    gameManager:null,

    ctor:function(gameManager, eleMap, fileName, rect, rotated, type){
        this._super(fileName, rect, rotated);
        
        this.eleMap = eleMap;
        this.gameManager = gameManager;
        this.type = type;
        this.value = 0;
        this.state = 0;

        this.setScale(55.0/200);
        this.bgSprite = new cc.Sprite(g_resources.Round_White_png);
        this.bgSprite.setNormalizedPosition(0.5,0.5);
        this.bgSprite.setScale(2.5);
    },
    reset:function(position){
        var eleCell = this.eleMap.getEleCell(position);
        if(!eleCell){
            eleCell = this.eleMap.getEleCell(this.eleMap.leftDownPos);
        }
        this.attr({
            x:eleCell.centerPoint.x,
            y:eleCell.centerPoint.y
        });
        this.eleCell = eleCell;
    },
    drawSelected:function(){
        this.state = LLK.EleSpriteCell.State.SELECTED;
        this.addChild(this.bgSprite, -1);
    },
    drawUnSelected:function(){
        this.state = LLK.EleSpriteCell.State.UNSELECTED;
        this.removeChild(this.bgSprite);
    },
    cleanUp:function(){
        var _this = this;
        _this.drawUnSelected();

        cc.eventManager.removeListener(_this.touchListener);
        _this.eleCell.value = 0;
        _this.runAction(new cc.Sequence(
            new cc.FadeOut(0.5),
            new cc.CallFunc(function(){
                _this.removeFromParent(true);

            }, _this)
        ));

    },
    addTouchEventListener:function() {
        var _this = this;
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
            swallowTouches: true,
            //onTouchBegan event callback function
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if (cc.rectContainsPoint(target.getBoundingBox(),pos)) {
                    target.state = 1 - target.state;
                    if(target.state == LLK.EleSpriteCell.State.SELECTED){
                        _this.gameManager.onSelectEleSpriteCell(target);
                    }else{
                        _this.gameManager.onUnSelectEleSpriteCell(target);
                    }
                    return true;
                }
                return false;
            }
        });
        cc.eventManager.addListener(this.touchListener.clone(),this);
    }
});

LLK.EleSpriteCell.State = {
    SELECTED : 1,
    UNSELECTED : 0
};
