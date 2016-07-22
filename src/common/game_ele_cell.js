/**
 * Created by suweijie on 16/7/12.
 */

LLK.EleCell = cc.Node.extend({
    _cellMap:null,
    
    position:null,
    
    leftDownPoint:null,
    rightUpPoint:null,
    centerPoint:null,

    upCellPosition:null,
    downCellPosition:null,
    leftCellPosition:null,
    rightCellPosition:null,

    isBorder:null,
    value:null,

    debugTextNode:null,

    ctor:function(cellMap, position, isBorder){
        this._super();
        this._cellMap = cellMap;
        this.position = position;
        this.value = 0;
        if(isBorder){
            this.isBorder = !!isBorder;
        }else{
            this.isBorder = false;
        }
        this.debugTextNode = new cc.LabelTTF("",  'Times New Roman', 20, cc.size(20,20), cc.TEXT_ALIGNMENT_CENTER);
        this._rebuild();
    },
    
    reset:function(cellMap, position, isBorder){
        if(cellMap){
            this._cellMap = cellMap;
        }
        if(position){
            this.position = position;
        }
        if(isBorder){
            this.isBorder = !!isBorder;
        }
        this._rebuild();
    },
    debugRefresh:function(){
        var text = "v" + this.value;
        this.debugTextNode.setString(text);
    },
    _rebuild:function () {
        var x = this.position.x;
        var y = this.position.y;

        var size = this._cellMap.cellSize;

        this.leftDownPoint = cc.p((x-1)*size, (y-1)*size);
        this.rightUpPoint = cc.p(x*size, y*size);
        this.centerPoint = cc.p(
            (this.leftDownPoint.x + this.rightUpPoint.x)/2,
            (this.leftDownPoint.y + this.rightUpPoint.y)/2
        );

        this.upCellPosition = cc.p(x, y+1);
        this.downCellPosition = cc.p(x, y-1);
        this.leftCellPosition = cc.p(x-1, y);
        this.rightCellPosition = cc.p(x+1, y);
    }
});
