Vue.component('pane',{
    template:'<transition name="pane"><div v-show="panduan" class="pane"><slot></slot></div></transition>',
    name: 'pane',
    data: function(){
        return {
            panduan : true,
        }
    },
    props:{
        name:'',
        label:'',
        choseable: {
            type: Boolean
        }
    },
    methods:{
        xuanran: function(){
            this.$parent.updatevalue();
        },
    },
    watch: {
        label: function(){
            this.xuanran()
        }
    },
    mounted(){
        this.xuanran();
    }
})