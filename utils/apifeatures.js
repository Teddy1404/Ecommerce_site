class Apifeatures {
    constructor(query,querystr){
        this.query = query;
        this.querystr = querystr;
    }
    // we are writing the function to search thing in the products using a keyword 
    // here query = Product.find()
    // and querystr = keyword (that we will write in seach bar)
    search(){
        const keyword = this.querystr.keyword
        ?{
            name:{
                $regex: this.querystr.keyword,
                $options:"i",
            },
        }
        :{};
        console.log(keyword);
        
        this.query = this.query.find({...keyword });
        return this;

    }
    
filter(){
    const querycopy = {...this.querystr}
}
}


module.exports = Apifeatures;