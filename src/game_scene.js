/**
 * Created by suweijie on 16/7/8.
 */
LLK.GameScene = cc.Scene.extend({
    _config:{

    },
    ctor:function(cfg){
        this._super();
        if(cfg){
            cc.inject(cfg, this._config);
        }
    },
    getConfig:function(prop){
        return this._config[prop];
    },
    getConfigs:function(){
        return this._config;
    },
    getName:function(){
        return "GameScene";
    },
    reload:function () {
        cc.log("load "+this.getName()+"!");
    }
});