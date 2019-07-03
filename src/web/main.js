const Index = {
    constructor(str){
        this.str = str
    },
    say(){
       console.log(this.str)
    }
}
const index = new Index('zhangsan')

export default Index;