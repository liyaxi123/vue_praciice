var app= new Vue({
    el:"#app",
    data:{
        list: [
            [
                {name:'hair冰箱',price:5600,count:1,checked:true},
                {name:'DELl电视机',price:3400,count:1,checked:true},
                {name:'格力空调',price:3100,count:1,checked:true}
            ],
            [
                {name:'apple手机',price:5600,count:1,checked:true},
                {name:'huawei手机',price:3400,count:1,checked:true},
                {name:'小米手机',price:3100,count:1,checked:true}
            ],
            [
                {name:'青菜',price:5600,count:1,checked:true},
                {name:'黄瓜',price:3400,count:1,checked:true},
                {name:'西红柿',price:3100,count:1,checked:true}
            ],   
            [
                {name:'青菜',price:5600,count:1,checked:true},
                {name:'黄瓜',price:3400,count:1,checked:true},
                {name:'西红柿',price:3100,count:1,checked:true},
                {name:'西红柿',price:3100,count:1,checked:true}
            ]
        ],
        checked:true,
    },
    methods: {
        add: function(els,el){
         this.list[els][el].count++
        },
        remove: function(els,el){
            this.list[els].splice(el,1)
        },
        all: function(){
            this.checked=!this.checked
           if(this.checked){
            for(var i=0;i<this.list.length;i++){
                for(var j=0;j<this.list[i].length;j++){
                    this.list[i][j].checked=true
                }
           }
             } else{
             for(var i=0;i<this.list.length;i++){
                for(var j=0;j<this.list[i].length;j++){
                    this.list[i][j].checked=false
                }
            }
           }


    },
     click: function(els,el){
        this.list[els][el].checked=!this.list[els][el].checked;
        for(var i=0;i<this.list.length;i++){
            for(var j=0;j<this.list[i].length;j++){
                if( this.list[i][j].checked===false){
                    this.checked=false
                    return
                }
            }
        }
           this.checked=true;
     }
  },
  computed:{
    totalprice: function(){
        var lens=this.list.length
        var total=0
        for(var i=0;i<lens;i++){
            for(var j=0;j<this.list[i].length;j++){
                if(this.list[i][j].checked===true){
                 total+=this.list[i][j].count*this.list[i][j].price
                }
            }
        }
        return total.toString().replace(/\B(?=(\d{3})+$)/g,',');
    }
},
filters: {
    yuan: function(val){
        return '￥'+val+'元'
    }
}
   
})