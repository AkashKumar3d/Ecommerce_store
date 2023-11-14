const { json } = require("express");

class ApiFeature {
    constructor(query, querystr){
        this.query = query;
        this.querystr = querystr;
    }

    // search method in the api 
    search(){
        const keyword=this.querystr.keyword ? {
            name:{
                $regex:this.querystr.keyword,
                $options:"i"
            }
        }:{}
    // console.log(keyword,"keyword")
        this.query = this.query.find({...keyword})
        return this
    }

    // filter method in api 
    filter(){
        const querycopy={...this.querystr}
        // remove some fields from category 
        const removefield=["keyword", "page", "limit"]

        removefield.forEach(key=> delete querycopy[key])

        // filter for price
        let querystr=JSON.stringify(querycopy)
        querystr=querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=>`$${key}`)
        this.query=this.query.find(JSON.parse(querystr))
    
        return this 
    }

    // pagination
    pagination(resultperpage){
        const currentpage=Number(this.querystr.page) || 1

        // skip the data 
        const skip=resultperpage *(currentpage - 1)
        this.query=this.query.limit(resultperpage).skip(skip)
      return this
    }

}


module.exports= ApiFeature;