var app =new Vue({
    el:'#app',
    data:{
        list:[
            {id:1,neame:'iphone',price:'1000',count:1,checked:true},
            {id:2,neame:'iphone2',price:'2000',count:1,checked:true},
            {id:3,neame:'iphone3',price:'3000',count:1,checked:true},
            {id:4,neame:'iphone4',price:'4000',count:1,checked:true},
        ],
        checked: true
    },
    methods:{
        reduce: function(index){
            if(this.list[index].count===1) return
            this.list[index].count--
        },
        add: function(index){
            this.list[index].count++
        },
        remove: function(index){
            //注意
            this.list.splice(index,1);
        },
        click: function(){
            if(!this.checked){
                for(var i=0;i<this.list.length;i++){
                    this.list[i].checked=true
                }
            }else{
                for(var i=0;i<this.list.length;i++){
                    this.list[i].checked=false
                }
            }
        },
        panduan: function(index){
            this.list[index].checked = !this.list[index].checked
             for(var i=0;i<this.list.length;i++){
                 if(this.list[i].checked===false) {
                     this.checked=false;
                     return
                }  
             } 
             this.checked=true;   
        }
    },
    computed:{
        totalprice: function(){
            var total=0;
            for(var i=0;i<this.list.length;i++){
                if(this.list[i].checked){
                total+=this.list[i].price*this.list[i].count
                }
            }
            return total.toString().replace(/\B(?=(\d{3})+$)/g,',');
        }
    },
    filters:{
        yuan: function(val){
            return '¥：' +  val + '元' 
        }
    }
})