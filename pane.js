Vue.component('pane',{
    name:'pane',
    template: '<div class="pane" v-show="show"><slot></slot></div>',
    data: function(){
        //控制pane的隐藏与显示
        return {
            show :'true'
        }
    },
    props:{
        //用来区分哪个pane
        name:{
            type: String
        },
        //显示在标题名称
        label:{
            type:String,
            default: ''
        }
    },
    methods:{
        updateNav: function(){
            this.$parent.updateNav();
        },
    },
    watch:{
        label: function(){
            this.updateNav();
        }
    },
    mounted () {
        this.updateNav();
    },
})