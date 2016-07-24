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
        this._texture = g_resources.Niu_jpg;

        this.init();
    },
    init:function(){
        cc.extend(this,{
            CELL_1 : function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(0,0,200,200), false, 1);
            },
            CELL_2 : function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(200,0,200,200), false, 2);
            },
            CELL_3 : function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(400,0,200,200), false, 3);
            },
            CELL_4 : function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(600,0,200,200), false, 4);
            },

            CELL_5 : function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(0,200,200,200), false, 5);
            },
            CELL_6 : function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(200,200,200,200), false, 6);
            },
            CELL_7 : function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(400,200,200,200), false, 7);
            },
            CELL_8 : function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(600,200,200,200), false, 8);
            },

            CELL_9 : function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(0,400,200,200), false, 9);
            },
            CELL_10 : function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(200,400,200,200), false, 10);
            },
            CELL_11 : function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(400,400,200,200), false, 11);
            },
            CELL_12 : function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(600,400,200,200), false, 12);
            },

            CELL_13 : function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(0,600,200,200), false, 13);
            },
            CELL_14 : function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(200,600,200,200), false, 14);
            },
            CELL_15 : function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(400,600,200,200), false, 15);
            },
            CELL_16 : function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(600,600,200,200), false, 16);
            },

            /*CELL_1: function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(0,0,85,105), false, 1);
            },
            CELL_2: function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(0,105,85,105), false, 2);
            },
            CELL_3: function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(0,210,85,105), false, 3);
            },
            CELL_4: function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(0,315,85,105), false, 4);
            },
            CELL_5: function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(0,420,85,105), false, 5);
            },
            CELL_6: function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(0,525,85,105), false, 6);
            },
            CELL_7: function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(0,630,85,105), false, 7);
            },
            CELL_8: function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(85,0,85,105), false, 8);
            },
            CELL_9: function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(85,105,85,105), false, 9);
            },
            CELL_10: function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(85,210,85,105), false, 10);
            },
            CELL_11: function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(85,315,85,105), false, 11);
            },
            CELL_12: function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(85,420,85,105), false, 12);
            },
            CELL_13: function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(85,525,85,105), false, 13);
            },
            CELL_14: function(){
                return new LLK.EleSpriteCell(this._gameManager, this._eleMap, this._texture, cc.rect(85,630,85,105), false, 14);
            },*/
            
        });
    },
    createNewCell : function(type){
        if(type < 1) type = 1;
        return this["CELL_"+type]();
    }
    
});