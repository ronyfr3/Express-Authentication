//same as try/catch
//it accepts function, if response.ok is true then it will not go for catch block
//as Example: catchAsyncError( async (req, res) => fn body))
module.exports = (acceptedFunction) => (req,res,next) => {
    Promise.resolve(acceptedFunction(req,res,next)).catch(next)
}