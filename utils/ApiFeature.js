class ApiFeature {
  constructor(query, queryKeyword) {
    this.query = query;
    this.queryKeyword = queryKeyword;
  }

  search() {
    const keyword = this.queryKeyword.keyword
      ? {
          name: {
            $regex: this.queryKeyword.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter(){
    const queryCopy = {...this.queryKeyword};
    const removeFileds=["keyword", "page","limit"];
    removeFileds.forEach((key)=> delete queryCopy[key]);

    let queryKeyword = JSON.stringify(queryCopy)
    queryKeyword=queryKeyword.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);
    this.query = this.query.find(JSON.parse(queryKeyword))
    return this
  }
  pagination(resultPage){
    const currentPage = Number(this.queryKeyword.page)||1
    const skip = resultPage * (currentPage-1)
    this.query = this.query.limit(resultPage).skip(skip)
    return this
  }
}

module.exports = ApiFeature;
