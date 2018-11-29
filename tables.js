Vue.component('tabs',{
    template:'<div class="tabs"><div class="tabs-bar">'
    //标签页标题
    +'<div :class="tabCls(item)" v-for="(item,index) in navList" @click="handleChange(index)">{{item.label}}</div>'
    +'</div><div class="tabs-content">'
    //这里的slot就是嵌套的pane
    +'<slot></slot></div></div>',
    props:{
        //这里的value是为了可以使用v-model
        value:{
            type: [String,Number]
        }
    },
    data: function(){
        return {
            //因为不能修改value，所以复制一份自己维护
            currentValue: this.value,
            //用来渲染tab的标题
            navList:[]
        }
    },
    methods:{
        tabCls: function(item){
            return [
                'tabs-tab',
                {
                    //给当前选中的tab加一个class
                    'tabs-tab-active': item.name===this.currentValue
                }
            ]
        },
        //点击tab标题时触发
        handleChange: function(index){
            var nav = this.navList[index];
            var name = nav.name;
            //改变当前选中的tab,并触发下面的watch
            this.currentValue = name;
            //更新value
            this.$emit('input',name);
            this.$emit('on-click',name);
        },
        getTabs: function(){
            //通过遍历子组件，得到所有的名字为pane组件
            return this.$children.filter(function(item){
                //这里的name和data平级
                return item.$options.name==='pane';
            })
        },
        updateNav: function(){
            this.navList=[];
            //设置对this的引用，在function回调中，this指向的并不是vue实例
            var _this = this;
            this.getTabs().forEach(function(pane,index){
                _this.navList.push({
                    label:pane.label,
                    //这里的name 是props里面name
                    name:pane.name|| index
                });
                //如果没有给pane设置name，默认设置它的索引
                if(!pane.name) pane.name=index;
                //设置当前选中的tab的索引， 首次进来时初始化选中状态
                if(index===0){
                    if(!_this.currentValue){
                        _this.currentValue=pane.name||index;
                    }
                }
            });
            //根据初始化，来隐藏其他元素
            this.updateStatus();
        },
        updateStatus: function(){
            var tabs = this.getTabs(); //所有props组件
            var _this=this;
            //显示当前选中的tab对应的pane组件，隐藏没有选中的
            tabs.forEach(function(tab){
                return tab.show=tab.name===_this.currentValue; //初始后是0 [true,false,false]
            })
        }
    },
    watch: {
        value: function(val){
            this.currentValue=val;
        },
        currentValue: function(){
            this.updateStatus();
        }
    }
})



