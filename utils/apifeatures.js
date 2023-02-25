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
    const querycopy = {...this.querystr};
    //Removing some fieds for category
    const removeFields = ["keyword","page","limit"];
    removeFields.forEach((key)=> delete querycopy[key]);


    console.log(querycopy);

    let querystr = JSON.stringify(querycopy);
    querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=> `$${key}`);

    this.query = this.query.find(JSON.parse(querystr));
    return this;
}
}


module.exports = Apifeatures;