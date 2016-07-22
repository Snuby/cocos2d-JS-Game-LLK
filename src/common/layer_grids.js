/**
 * Created by suweijie on 16/7/11.
 */

LLK.LayerGrids = cc.Layer.extend({
    ctor:function(){
        this._super();
        this.init();
    },
    init: function(){
        var size = cc.director.getWinSize();
        var width = size.width;
        var height = size.height;

        var widthNum = 18;
        var gridSize = width/widthNum;
        var heightNum = height/gridSize;

        var drawNode = cc.DrawNode.create();
        var lineColor = cc.color(255,100,0,255);
        var fillColor = cc.color(255,100,0,80);
        var lineWidth = 1;

        for(var i=0; i<heightNum; i++){
            var h = i*gridSize;
            var fromP = cc.p(0, h);
            var toP = cc.p(width, h);
            drawNode.drawSegment(fromP, toP, lineWidth, lineColor);
        };
        for(var i=0; i<widthNum; i++){
            var w = i*gridSize;
            var fromP = cc.p(w, 0);
            var toP = cc.p(w, height);
            drawNode.drawSegment(fromP, toP, lineWidth, lineColor);
        };

        var startP = cc.p(gridSize, gridSize);
        var endP = cc.p(gridSize * (widthNum-1), gridSize * 8);

        drawNode.drawRect(startP, endP, fillColor, lineWidth, lineColor);
        this.addChild(drawNode);
    }
});