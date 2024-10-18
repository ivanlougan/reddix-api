exports.psqlInvalidIdErrorHandler = (err, request, response, next) => {
    if(err.code === '22P02') {
        response.status(400).send({ message: 'Bad Request'});
    } else {
        next(err);
    }
}

exports.notNullViolation = (err, req, res, next) => {
    if (err.code === "23502") {
      res.status(400).send({ msg: "Body cannot be blank" });
    }
    next(err);
  };

exports.customErrorHandler = (err, request, response, next) => {
    if( err.status && err.message ) {
        response.status(err.status).send({ message: err.message })
    } else {
        next(err)
    }
}

exports.internalServerError = (err, req, res) => {
    console.log(err.stack)
    res.status(500).send({ msg: "Internal Server Error" });
  };