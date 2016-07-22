/**
 * Created by suweijie on 16/7/18.
 */
LLK.GameLogic = {

    STAND : 0,
    UP : 1,
    RIGHT : 2,
    DOWN : 3,
    LEFT : 4,

    Path:cc.DrawNode.extend({
        eleCells:null,
        ctor:function(){
            this._super();
            this.eleCells = new Array();
        },
        push:function(eleCell){
            return this.eleCells.push(eleCell);
        },
        pop:function(){
            return this.eleCells.pop();
        },
        isEmpty:function(){
            return this.eleCells.length == 0;
        },
        contains:function(eleCell){
            for(var i = 0; i < this.eleCells.length; i++){
                if(eleCell === this.eleCells[i]){
                    return true;
                }
            }
            return false;
        },
        clearUp:function(){
            var _this = this;
            _this.runAction(new cc.Sequence(
                new cc.FadeOut(0.5),
                new cc.CallFunc(function(){
                    _this.removeFromParent(true);
                }, _this)
            ));   
        },
        drawPath:function(){
            this.clear();
            var lineColor = cc.color(100,200,255,255);
            var fillColor = cc.color(100,0,255,80);
            var lineWidth = 1;
            this.clear();

            cc.log("!-----------------------");
            for(var i = 0; i < this.eleCells.length; i++){
                var eleCell = this.eleCells[i];
                //this.drawRect(eleCell.leftDownPoint, eleCell.rightUpPoint, fillColor, lineWidth, lineColor);
                this.drawCircle(eleCell.centerPoint, 10, 0, 30, false, 20, lineColor);
                cc.log(eleCell.position);
            }
            cc.log("-----------------------!");
        }
    }),

    _searchLeft : function (eleMap, eleCell, targetCell, path){
        var leftCell = eleMap.getEleCell(eleCell.leftCellPosition);
        if(leftCell === targetCell){
            return {found:true,direction:LLK.GameLogic.LEFT};
        }
        if(leftCell && leftCell.value === 0 && !path.contains(leftCell)){
            return leftCell;
        }
        return undefined;
    },
    _searchRight : function (eleMap, eleCell, targetCell, path){
        var rightCell = eleMap.getEleCell(eleCell.rightCellPosition);
        if(rightCell === targetCell){
            return {found:true,direction:LLK.GameLogic.RIGHT};
        }
        if(rightCell && rightCell.value === 0 && !path.contains(rightCell)){
            return rightCell;
        }
        return undefined;
    },
    _searchUp : function (eleMap, eleCell, targetCell, path){
        var upCell = eleMap.getEleCell(eleCell.upCellPosition);
        if(upCell === targetCell){
            return {found:true,direction:LLK.GameLogic.UP};
        }
        if(upCell && upCell.value === 0 && !path.contains(upCell)){
            return upCell;
        }
        return undefined;
    },
    _searchDown : function (eleMap, eleCell, targetCell, path){
        var downCell = eleMap.getEleCell(eleCell.downCellPosition);
        if(downCell === targetCell){
            return {found:true,direction:LLK.GameLogic.DOWN};
        }
        if(downCell && downCell.value === 0 && !path.contains(downCell)){
            return downCell;
        }
        return undefined;
    },

    refreshPath : function(layer, path){
        // layer.removeChild(path);
        // path.drawPath();
        // layer.addChild(path);
        //cc.log("step "+ cc.rand());
        //debugger
    },
    //获取上右下左四个节点中的候选节点, 要求在游戏区域内, 且不在路径中, 且路径不超过两个折点

    _computeCost : function(p1, p2){
        return Math.abs(p1.x-p2.x) + Math.abs(p1.y-p2.y);
    },
    _getToWalk : function (eleMap, eleCell, targetCell, path) {
        var eleCells = new Array();

        var upCell = LLK.GameLogic._searchUp(eleMap, eleCell, targetCell, path);
        var rightCell = LLK.GameLogic._searchRight(eleMap, eleCell, targetCell, path);
        var downCell = LLK.GameLogic._searchDown(eleMap, eleCell, targetCell, path);
        var leftCell = LLK.GameLogic._searchLeft(eleMap, eleCell, targetCell, path);

        if(upCell){
            eleCells.push(upCell);
        }
        if(rightCell){
            eleCells.push(rightCell);
        }
        if(downCell){
            eleCells.push(downCell);
        }
        if(leftCell){
            eleCells.push(leftCell);
        }

        if(eleCells.length > 0){
            eleCells.sort(function(cell1, cell2){
                if(cell1.found){
                    return -1;
                }
                if(cell2.found){
                    return 1;
                }

                var p1 = cell1.position;
                var p2 = cell2.position;
                var t = targetCell.position;

                var cost1 = LLK.GameLogic._computeCost(p1, t);
                var cost2 = LLK.GameLogic._computeCost(p2, t);
                return cost1 - cost2;
            });

            var toWalks = new Array();
            for(var i = 0; i < eleCells.length; i++){
                var cell = eleCells[i];
                if(cell.found){
                    toWalks.push({
                        "cell":cell,
                        "direction":cell.direction
                    });
                    return toWalks;
                }
                var direction = LLK.GameLogic.STAND;
                if(cell === upCell){
                    direction = LLK.GameLogic.UP;
                }
                if(cell === leftCell){
                    direction = LLK.GameLogic.LEFT;
                }
                if(cell === rightCell){
                    direction = LLK.GameLogic.RIGHT;
                }
                if(cell === downCell){
                    direction = LLK.GameLogic.DOWN;
                }
                toWalks.push({
                    "cell":cell,
                    "direction":direction
                });
            }
            return toWalks;
        }

        return undefined;
    },

    _deepSearch : function (eleMap, eleCell, targetCell, path, direction, corner, layer){
        path.push(eleCell);
        LLK.GameLogic.refreshPath(layer, path);

        var eleCellsToWalk = LLK.GameLogic._getToWalk(eleMap, eleCell, targetCell, path);
        if(eleCellsToWalk){
            for(var i = 0; i< eleCellsToWalk.length; i++){
                var walk = eleCellsToWalk[i];

                var cell = walk.cell;
                var newDirection = walk.direction;

                var newCorner = corner;
                if(direction !== newDirection){
                    newCorner ++;
                }

                if(newCorner > 2){
                    //debugger;
                    path.pop();
                    LLK.GameLogic.refreshPath(layer, path);
                    return undefined;
                }

                if(cell.found){
                    path.push(targetCell);
                    LLK.GameLogic.refreshPath(layer, path);
                    cc.log("direction:"+direction+";corner:"+corner);
                    //debugger;
                    return path;
                }

                var res = LLK.GameLogic._deepSearch(eleMap, cell, targetCell, path, newDirection, newCorner, layer);
                if(res) return res;
            }
        }
        path.pop();
        LLK.GameLogic.refreshPath(layer, path);
        return undefined;

        /*var upCell = LLK.GameLogic._searchUp(eleMap, eleCell, targetCell, path);
        if(upCell){
            var newDirection = LLK.GameLogic.UP;
            var newCorner = corner;
            if(direction !== newDirection){
                newCorner ++;
            }
            if(newCorner > 2){
                //debugger;
                path.pop();
                LLK.GameLogic.refreshPath(layer, path);
                return undefined;
            }

            if(upCell.found){
                path.push(targetCell);
                LLK.GameLogic.refreshPath(layer, path);
                cc.log("direction:"+direction+";corner:"+corner);
                //debugger;
                return path;
            }

            var res = LLK.GameLogic._deepSearch(eleMap, upCell, targetCell, path, newDirection, newCorner, layer);
            if(res) return res;
        }

        var rightCell = LLK.GameLogic._searchRight(eleMap, eleCell, targetCell, path);
        if(rightCell){
            var newDirection = LLK.GameLogic.RIGHT;
            var newCorner = corner;
            if(direction !== newDirection){
                newCorner ++;
            }
            if(newCorner > 2){
                //debugger;
                path.pop();
                LLK.GameLogic.refreshPath(layer, path);
                return undefined;
            }
            if(rightCell.found){
                path.push(targetCell);
                LLK.GameLogic.refreshPath(layer, path);
                cc.log("direction:"+direction+";corner:"+corner);
                //debugger;
                return path;
            }

            var res = LLK.GameLogic._deepSearch(eleMap, rightCell, targetCell, path, newDirection, newCorner, layer);
            if(res) return res;
        }

        var downCell = LLK.GameLogic._searchDown(eleMap, eleCell, targetCell, path);
        if(downCell){
            var newDirection = LLK.GameLogic.DOWN;
            var newCorner = corner;
            if(direction !== newDirection){
                newCorner ++;
            }
            if(newCorner > 2){
                //debugger;
                path.pop();
                LLK.GameLogic.refreshPath(layer, path);
                return undefined;
            }
            if(downCell.found){
                path.push(targetCell);
                LLK.GameLogic.refreshPath(layer, path);
                cc.log("direction:"+direction+";corner:"+corner);
                //debugger;
                return path;
            }

            var res = LLK.GameLogic._deepSearch(eleMap, downCell, targetCell, path, newDirection, newCorner, layer);
            if(res) return res;
        }

        var leftCell = LLK.GameLogic._searchLeft(eleMap, eleCell, targetCell, path);
        if(leftCell){
            var newDirection = LLK.GameLogic.LEFT;
            var newCorner = corner;
            if(direction !== newDirection){
                newCorner ++;
            }
            if(newCorner > 2){
                //debugger;
                path.pop();
                LLK.GameLogic.refreshPath(layer, path);
                return undefined;
            }
            if(leftCell.found){
                path.push(targetCell);
                LLK.GameLogic.refreshPath(layer, path);
                cc.log("direction:"+direction+";corner:"+corner);
                //debugger;
                return path;
            }

            var res = LLK.GameLogic._deepSearch(eleMap, leftCell, targetCell, path, newDirection, newCorner, layer);
            if(res) return res;
        }
        //debugger;
        path.pop();
        LLK.GameLogic.refreshPath(layer, path);
        return undefined;*/

    },

    //递归路径搜索算法
    searchPath : function(eleMap, eleCell, targetCell, layer){
        if(eleCell === targetCell){
            return undefined; 
        }
        var path = new LLK.GameLogic.Path();

        var direction = LLK.GameLogic.STAND;
        var corner = -1;

        return LLK.GameLogic._deepSearch(eleMap, eleCell, targetCell, path, direction, corner, layer);
    }

};