//标题组件
Vue.component('tabs',{
    template:'<div class="tabs"><div class="tabs-bar">'+
    '<div :class="getClass(index)" v-for="(item, index) in items" @click="dianji(index)">'+
    '{{item.label}}<button @click="guanbi(index,$event)" v-if="item.closeable==true">x</button></div>'+
    '<div class="tabs-content"><slot></slot></div></div></div>',
    data: function(){
        return {
            curentvalue:this.value,
            items:[],
        }
    },
     props:{
         value: {
             type: String
         }
     },
    methods: {
        guanbi: function(index,event){
            if(index<this.items.length-1){         
                this.curentvalue=this.items[index+1].name;
                event.stopPropagation();
            }else if(index==this.items.length-1&&this.items.length!=1){
                this.curentvalue=this.items[this.items.length-2].name; 
                event.stopPropagation();
            }
            else{
                    this.curentvalue=''
                    event.stopPropagation();               
            }
            this.items.splice(index,1);
        },
        // close: function(index){
        //        return this.items[index].choseable=this.items[index].choseable==='true';
        // },
        getClass: function(index){
            return [
                'tabs-tab',{
                'tabs-tab-active': this.curentvalue===this.items[index].name,   
                    
                }
            ]
        },
        dianji: function(index){
            this.curentvalue=this.items[index].name
        },
         //获取 名称为pane组件的方法
        getValue: function(){ 
         return this.$children.filter(function(item){
           return item.$options.name==='pane' //通过返回值true,false来筛选数据

         })
        },
        //获取组件数据的方法
        updatevalue: function(){
         
                 
            this.items=[]
        var tabs = this.getValue();
        var _this=this;
        tabs.forEach(function(item,index){
            console.log( item.choseable==true)  
            _this.items.push({
                closeable: item.choseable,
                   label: item.label,//标题
                   name: item.name 
               })
            
         
           //初始化tab框
       if(index===0){
            _this.curentvalue=item.name;
          }
        })
        //据初始化的数据来设置隐藏与出现
        this.showorhidden();
      },
      //对初始化后数据显示隐藏的方法
      showorhidden: function(){
        var tabs = this.getValue();
        var _this=this;
        tabs.forEach(function(item){
            item.panduan=(item.name===_this.curentvalue);
        })
      },
     
    },
    watch:{
        curentvalue: function(){
            this.showorhidden();
        }
    }

})