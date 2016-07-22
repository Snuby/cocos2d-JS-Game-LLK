/**
 * Created by suweijie on 16/7/12.
 */

LLK.EnumCells = cc.Class.extend({
    _eleMap:null,
    _texture:null,
    _gameManager:null,
    ctor:function(eleMap, gameManager){
        this._eleMap = eleMap;
        this._gameManager = gameManager;
        this._texture = g_resources.Altas;

        this.init();
    },
    init:function(){
        cc.extend(this,{
            CELL_1: function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(0,0,60,60), false);
            },
            CELL_2: function () {
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(60,0,60,60), false)
            }
        });
    },
    createNewCell : function(type){
        if(type < 1) type = 1;
        return this["CELL_"+type]();
    }
    
});