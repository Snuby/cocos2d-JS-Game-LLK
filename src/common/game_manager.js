/**
 * Created by suweijie on 16/7/12.
 */
LLK.GameManager = cc.Class.extend({
    cellWidthNum:1,
    cellHeightNum:1,
    cellSize:0,

    eleMap:null,
    enumCells:null,

    leftDownPosition:null,
    rightUpPosition:null,

    gameLayer:null,
    selectedCells:null,
    /**
     * @param {number} cellWidthNum:以宽计算有多少个格子
     */
    ctor:function(gameLayer) {

        this.gameLayer = gameLayer;
        this.selectedCells = new Array(0);
        
        var size = cc.director.getWinSize();
        var width = size.width;
        var height = size.height;

        this.cellWidthNum = g_configs.cellWidthNum;
        this.cellSize = width/this.cellWidthNum;
        this.cellHeightNum = height/this.cellSize;

        this.leftDownPosition = g_configs.leftDownPosition;
        this.rightUpPosition = g_configs.rightUpPosition;

        this.eleMap = new LLK.EleMap(this.cellSize, this.leftDownPosition, this.rightUpPosition);
        this.enumCells = new LLK.EnumCells(this.eleMap, this);
    },
    testInRegion:function(position){
        var ld = this.leftDownPosition;
        var ru = this.rightUpPosition;
        
        return position.x>=ld.x && position.x <= ru.x && position.y >= ld.y && position.y <= ru.y;
    },
    createBarrier : function(){
        var mapData = new Array();
        var nums = 24;
        var minX = this.leftDownPosition.x + 1;
        var minY = this.leftDownPosition.y + 1;
        var maxX = this.rightUpPosition.x - 1;
        var maxY = this.rightUpPosition.y - 1;

        var checkInMap = function(p){
            for(var i = 0; i< mapData.length; i++){
                if(cc.pSameAs(p, mapData[i])){
                    return true;
                }
            }
            return false;
        };
        while(mapData.length < nums){
            var rX = Math.round(cc.rand()%(maxX-minX)) + minX;
            var rY = Math.round(cc.rand()%(maxY-minY)) + minY;
            var p = cc.p(rX, rY);

            if(checkInMap(p)){
                continue;
            }
            mapData.push(p);
        }
        this.eleMap.resetMapData(mapData);

        for(var i = 0; i< mapData.length; i++){
            var p = mapData[i];

            var eleSpriteCell = this.enumCells.createNewCell(1);
            eleSpriteCell.reset(p);
            eleSpriteCell.addTouchEventListener();

            this.gameLayer.addChild(eleSpriteCell, 1);
        }
    },
    onSelectEleSpriteCell : function(eleSpriteCell){
        if(this.selectedCells.length === 0){
            this.selectedCells.push(eleSpriteCell);
            eleSpriteCell.drawSelected();
        }else if(this.selectedCells.length === 1){
            if(this.selectedCells[0] === eleSpriteCell){
                cc.log("*********************** error 3 ***********************");
                return;
            }
            
            this.selectedCells.push(eleSpriteCell);
            eleSpriteCell.drawSelected();

            var spriteCell1 = this.selectedCells[0];
            var spriteCell2 = this.selectedCells[1];
            var path = LLK.GameLogic.searchPath(this.eleMap, spriteCell1.eleCell, spriteCell2.eleCell, this.gameLayer);
            if(!path) path = LLK.GameLogic.searchPath(this.eleMap, spriteCell2.eleCell, spriteCell1.eleCell, this.gameLayer);

            if(path){
                path.drawPath();
                this.gameLayer.addChild(path, 0);
                spriteCell1.cleanUp();
                spriteCell2.cleanUp();
                this.eleMap.refreshMap();

                path.clearUp();
                this.selectedCells = new Array();
            }else{
                spriteCell1.drawUnSelected();
                this.selectedCells.shift();
                cc.log("----- path no found -----");
            }
        }else{
            cc.log("*********************** error ***********************");
        }

    },
    onUnSelectEleSpriteCell : function(eleSpriteCell){
        eleSpriteCell.drawUnSelected();
        if(this.selectedCells.length === 1){
            if(this.selectedCells[0] === eleSpriteCell){
                this.selectedCells.shift();
            }else{
                debugger;
                cc.log("*********************** error 5 ***********************");
            }
        }else if(this.selectedCells.length === 2){
            if(this.selectedCells[0] === eleSpriteCell){
                this.selectedCells.shift();
            }else if(this.selectedCells[1] === eleSpriteCell){
                this.selectedCells.pop();
            }else{
                cc.log("*********************** error 2 ***********************");
            }
        }else{
            debugger;
            cc.log("*********************** error 4 ***********************");
        }
    },

    loadGameData : function(){
        this.createBarrier();
        this.gameLayer.addChild(this.eleMap);

    }

});