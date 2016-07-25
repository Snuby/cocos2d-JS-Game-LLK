window.g_resources = {
    HelloWorld_png : "res/HelloWorld.png",
    Texture : "res/imgs/icons.png",
    Icon_png : "res/imgs/icon.png",
    GameBG_jpg : "res/imgs/bg6.jpg",
    Round_White_png:"res/imgs/round_white.png",
    Animations_png : "res/imgs/animations.png",
    Progress_png : "res/imgs/progress_blue.png",
    Niu_jpg : "res/imgs/niu.jpg",

    BGM_mp3:"res/sounds/bgm_dyht.mp3",
    Click_wav:"res/sounds/click.wav",
    Hit_mp3:"res/sounds/hit.mp3",
    GameOver_wav:"res/sounds/game_over.wav",
    GameWin_wav:"res/sounds/game_win.wav"
};

window.g_resources_array = function(){
    var array = new Array();
    for(var item in g_resources){
        var value = g_resources[item];
        array.push(value);
    }
    return array;
}

window.g_configs = {
    cellWidthNum : 16,
    leftDownPosition : cc.p(1,1),
    rightUpPosition : cc.p(16,8),

    playSeconds : 160,
    soundSwitch : false,
    bgmSwitch : true,

    debugMap : true,
    url:"http://localhost:63343/llk/index.html"
};

