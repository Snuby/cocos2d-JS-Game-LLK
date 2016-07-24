/**
 * Created by suweijie on 16/7/12.
 */

LLK.EleMap = cc.Node.extend({
    eleCellsMap:null,

    mapData:null, //记录哪些格子上有点

    leftDownPos:null,
    rightUpPos:null,

    cellSize:null,
    drawNode:null,

    ctor:function(cellSize, leftDownPos, rightUpPos, mapData){
        this._super();

        this.drawNode = new cc.DrawNode();
        this.eleCellsMap = new Array();
        this.mapData = new Array();

        this.cellSize = cellSize;
        this.leftDownPos = leftDownPos;
        this.rightUpPos = rightUpPos;

        var xStart = this.leftDownPos.x;
        var xEnd = this.rightUpPos.x;

        var yStart = this.leftDownPos.y;
        var yEnd = this.rightUpPos.y;

        var lineColor = cc.color(100,255,0,255);
        var fillColor = cc.color(100,255,0,80);
        var lineWidth = 1;

        for(var x = xStart; x<=xEnd; x++){
            var column = new Array();
            for(var y = yStart; y<=yEnd; y++){
                var position = cc.p(x, y);
                var isBorder = (x==xStart || y==yStart || x==xEnd || y==yEnd) ? true : false;
                var eleCell = new LLK.EleCell(this, position, isBorder);

                if(isBorder){
                    fillColor = cc.color(255,100,0,80);
                }else{
                    fillColor = cc.color(100,255,0,80);
                }
                column.push(eleCell);
                if(g_configs.debugMap){
                    this.drawNode.drawRect(eleCell.leftDownPoint, eleCell.rightUpPoint, fillColor, lineWidth, lineColor);
                }
            }
            this.eleCellsMap.push(column);
        }
        if(g_configs.debugMap){
            this.addChild(this.drawNode);
        }
        this.resetMapData(mapData);
        cc.log("map initialized!");
    },
    getEleCell:function(position){
        var xStart = this.leftDownPos.x;
        var yStart = this.leftDownPos.y;

        var x = position.x - xStart;
        var y = position.y - yStart;

        var cols = this.eleCellsMap.length; //cols
        var rows = this.eleCellsMap[0].length; //rows
        if(x < 0 || x >= cols || y < 0 || y >= rows){
            return undefined;
        }
        return this.eleCellsMap[x][y];
    },
    removeElementFromMapData : function(position1, position2, emptyListener){
        for(var i = 0; i < this.mapData.length; i++){
            if(position1 && cc.pSameAs(position1, this.mapData[i])){
                this.mapData.splice(i, 1);
                i--;
            }
            if(position1 && cc.pSameAs(position2, this.mapData[i])){
                this.mapData.splice(i, 1);
                i--;
            }
        }
        if(this.mapData.length == 0 && emptyListener){
            emptyListener();
        }

        cc.log("length left to: " + this.mapData.length);
    },

    resetMapData:function(mapData){
        if(mapData && mapData.length > 0){
            this.mapData = mapData;
            for(var i = 0; i < this.eleCellsMap.length; i++){
                var array = this.eleCellsMap[i];
                for(var j = 0; j < array.length ; j++){
                    var eleCell = array[j];
                    eleCell.value = 0;
                }
            }
            for(var i = 0; i < mapData.length; i++){
                var ele = mapData[i];
                var eleCell = this.getEleCell(ele);
                eleCell.value += 1;
            }
        }
        this.refreshMap();
    },
    refreshMap:function(){
        if(g_configs.debugMap){
            for(var i = 0; i < this.eleCellsMap.length; i++){
                var array = this.eleCellsMap[i];
                for(var j = 0; j < array.length ; j++){
                    var eleCell = array[j];
                    var textNode = eleCell.debugTextNode;
                    textNode.removeFromParent(false);
                    textNode.attr({
                        x:eleCell.centerPoint.x,
                        y:eleCell.centerPoint.y
                    });
                    eleCell.debugRefresh();

                    this.addChild(textNode, 1);
                    //cc.log("x:"+eleCell.centerPoint.x+";y:"+eleCell.centerPoint.y+";str:"+textNode.getString());
                }
            }

        }
    }

});