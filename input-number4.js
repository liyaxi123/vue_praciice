Vue.component('number-input',{
    template: '<div><input type="text" :value="myvalue" @keyup.down="two" @keyup.up="one" @change="parent"><button @click="reduce" :disabled="myvalue<=min">-</button><button @click="crease" :disabled="myvalue>=max">+</button></div>',
    props:{
        max:{
            type: Number,
            default: Infinity
        },
        min:{
            type: Number,
            default:-Infinity
        },
        value:{
            type: Number,
            default:3
        },
        step:{
            type: Number,
            default: 2
        }
    },
    data: function(){
        return {
            myvalue:this.value
        }
    },
   watch:{
       value: function(val){
        this.myvalue=val
       },
       myvalue: function(val){
           this.$emit('input',val)
       }
   },
   
    methods:{
        //判断是否是数字
        isValueNumber: function(val){
            return (/^\d+$/).test(val)
        },
        reduce: function(){
            if(this.myvalue===this.min) return
            this.myvalue--
            // this.$emit('input',this.myvalue)
        },
        crease: function(){
            if(this.myvalue===this.max) return
            this.myvalue+=this.step;
            //子组件已经可以传递给父组件了
            // this.$emit('input',this.myvalue)
        },
        parent: function(e){
            var val=e.target.value.trim();
        if(this.isValueNumber(val)){
            this.myvalue =Number(val)
             if(val>this.max){
                 this.myvalue=10
             }else if(val<1){
                this.myvalue=1
             }
        }
           e.target.value=this.myvalue
        //    this.$emit('input',this.myvalue)
        },
      one: function(e){
          if(e.target.value>=this.max) return
          this.myvalue++
      },
      two:function(e){
        if(e.target.value<=this.min) return
          this.myvalue--
      }
    },

})