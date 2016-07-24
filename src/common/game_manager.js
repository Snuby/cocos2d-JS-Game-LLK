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
    seconds:null,
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

    //打乱Map
    upsetMap : function(){
        this.gameLayer.removeAllChildren();
        var mapData = this.eleMap.mapData;

        var newMapData = new Array();
        var checkInMap = function(p){
            for(var i = 0; i< newMapData.length; i++){
                if(cc.pSameAs(p, newMapData[i])){
                    return true;
                }
            }
            return false;
        };
        var minX = this.leftDownPosition.x + 1;
        var minY = this.leftDownPosition.y + 1;
        var maxX = this.rightUpPosition.x - 1;
        var maxY = this.rightUpPosition.y - 1;

        while(newMapData.length < mapData.length){
            var rX = Math.round(cc.rand()%(maxX-minX)) + minX;
            var rY = Math.round(cc.rand()%(maxY-minY)) + minY;
            var p = cc.p(rX, rY);

            if(checkInMap(p)){
                continue;
            }
            newMapData.push(p);
        }
        this.gameLayer.removeAllChildren();
        this.eleMap.resetMapData(newMapData);

        var half = newMapData.length / 2;
        for(var i = 0; i< half; i++){
            var p1 = newMapData[i];
            var p2 = newMapData[half + i];

            var type = i%14+1;
            var eleSpriteCell1 = this.enumCells.createNewCell(type);
            eleSpriteCell1.reset(p1);
            eleSpriteCell1.addTouchEventListener();

            var eleSpriteCell2 = this.enumCells.createNewCell(type);
            eleSpriteCell2.reset(p2);
            eleSpriteCell2.addTouchEventListener();

            this.gameLayer.addChild(eleSpriteCell1, 1);
            this.gameLayer.addChild(eleSpriteCell2, 1);
        }

        cc.log("upset eleMap, remaining:" + newMapData.length);
    },

    createBarrier : function(){
        var mapData = new Array();
        var minX = this.leftDownPosition.x + 1;
        var minY = this.leftDownPosition.y + 1;
        var maxX = this.rightUpPosition.x - 1;
        var maxY = this.rightUpPosition.y - 1;
        var nums = 24;

        var checkInMap = function(p){
            for(var i = 0; i< mapData.length; i++){
                if(cc.pSameAs(p, mapData[i])){
                    return true;
                }
            }
            return false;
        };
        /*while(mapData.length < nums){
         var rX = Math.round(cc.rand()%(maxX-minX)) + minX;
         var rY = Math.round(cc.rand()%(maxY-minY)) + minY;
         var p = cc.p(rX, rY);

         if(checkInMap(p)){
         continue;
         }
         mapData.push(p);
         }*/

        for(var i = minX; i <= maxX; i++){
            for(var j = minY; j <= maxY; j++){
                var p = cc.p(i, j);
                mapData.push(p);
            }
        }
        for(var i = 0; i < mapData.length; i++){
            var r1 = i;
            var r2 = Math.round(cc.rand()%(mapData.length-1));

            var temp = mapData[r1];
            mapData[r1] = mapData[r2];
            mapData[r2] = temp;
        }

        this.eleMap.resetMapData(mapData);

        var half = mapData.length / 2;
        for(var i = 0; i< half; i++){
            var p1 = mapData[i];
            var p2 = mapData[half + i];

            var type = i%16+1;
            var eleSpriteCell1 = this.enumCells.createNewCell(type);
            eleSpriteCell1.reset(p1);
            eleSpriteCell1.addTouchEventListener();

            var eleSpriteCell2 = this.enumCells.createNewCell(type);
            eleSpriteCell2.reset(p2);
            eleSpriteCell2.addTouchEventListener();

            this.gameLayer.addChild(eleSpriteCell1, 1);
            this.gameLayer.addChild(eleSpriteCell2, 1);
        }
        this.seconds = g_configs.playSeconds;

    },
    onRemovePair : function(path, spriteCell1, spriteCell2){
        var _this = this;
        path.drawPath();
        this.gameLayer.addChild(path, 0);

        if(g_configs.soundSwitch){
            cc.audioEngine.playEffect(g_resources.Hit_mp3, false);
        }
        spriteCell1.cleanUp();
        spriteCell2.cleanUp();

        this.eleMap.removeElementFromMapData(spriteCell1.eleCell.position, spriteCell2.eleCell.position, function(){
            cc.log("Game End! start New Game");
            if(g_configs.soundSwitch){
                cc.audioEngine.playEffect(g_resources.GameWin_wav, false);
            }
            _this.createBarrier();
        });
        this.eleMap.refreshMap();

        path.clearUp();
    },

    onSelectEleSpriteCell : function(eleSpriteCell){
        if(g_configs.soundSwitch){
            cc.audioEngine.playEffect(g_resources.Click_wav, false);
        }
        if(this.selectedCells.length === 0){
            this.selectedCells.push(eleSpriteCell);
            eleSpriteCell.drawSelected();
        }else if(this.selectedCells.length === 1){
            if(this.selectedCells[0] === eleSpriteCell){
                debugger;
                cc.log("*********************** error 3 ***********************");
                return;
            }
            
            this.selectedCells.push(eleSpriteCell);
            eleSpriteCell.drawSelected();

            var spriteCell1 = this.selectedCells[0];
            var spriteCell2 = this.selectedCells[1];
            if(spriteCell1.type === spriteCell2.type){
                var path = LLK.GameLogic.searchPath(this.eleMap, spriteCell1.eleCell, spriteCell2.eleCell, this.gameLayer);
                if(!path) path = LLK.GameLogic.searchPath(this.eleMap, spriteCell2.eleCell, spriteCell1.eleCell, this.gameLayer);

                if(path){
                    this.onRemovePair(path, spriteCell1, spriteCell2);
                    this.selectedCells = new Array();
                }else{
                    spriteCell1.drawUnSelected();
                    this.selectedCells.shift();
                    cc.log("----- path no found -----");
                }
            }else{
                spriteCell1.drawUnSelected();
                this.selectedCells.shift();
                cc.log("----- pair no math -----");
            }

        }else{
            debugger;
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
                debugger;
                cc.log("*********************** error 2 ***********************");
            }
        }else{
            debugger;
            cc.log("*********************** error 4 ***********************");
        }
    },

    loadGameData : function(){
        this.createBarrier();
        //this.gameLayer.addChild(this.eleMap);

    }

});