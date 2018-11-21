var app=new Vue({
    el:"#app",
    data:{
        max: 10,
        min: 1,
        value: 5,
        step:5,
    },
    methods: {
        gaibian: function(e){
            this.value = e.target.value;
            console.log(this.$refs.com.myvalue)
        }
    }
})