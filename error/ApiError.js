'use strict';

class ApiError {
  constructor(code,message){
    this.code = code;
    this.message = message
  }
  static requestBad(message){
    return new ApiError(400,message);
  }
  static requestNotFound(message){
    return new ApiError(404,message);
  }
  static requestDefault(message){
    return new ApiError(500,message);
  }
}

module.exports = ApiError;