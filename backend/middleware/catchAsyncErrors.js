module.exports = (theFunc) => (req, res, next) => {
	Promise.resolve(theFunc(req, res, next)).catch(next);
};

// By using catchAsyncErrors, you can write asynchronous code in your route handlers without
// having to include repetitive try-catch blocks solely to pass errors to the next middleware.
// It simplifies error handling in asynchronous Express routes.
