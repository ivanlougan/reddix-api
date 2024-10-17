exports.psqlInvalidIdErrorHandler = (err, request, response, next) => {
    if(err.code === '22P02') {
        response.status(400).send({ message: 'Invalid id type'});
    } else {
        next(err);
    }
}

exports.customErrorHandler = (err, request, response, next) => {
    if( err.status && err.message ) {
        response.status(err.status).send({ message: err.message })
    } else {
        next(err)
    }
}

exports.internalServerError = (req, res) => {
    res.status(500).send({ msg: "Internal Server Error" });
  };