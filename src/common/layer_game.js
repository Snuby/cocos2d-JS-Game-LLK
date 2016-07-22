/**
 * Created by suweijie on 16/7/21.
 */
LLK.LayerGame = cc.Layer.extend({
    gameManager:null,
    ctor : function(){
        this._super();
        
        this.gameManager = new LLK.GameManager(this);

        var _gm = this.gameManager;
        _gm.loadGameData();
    }

});