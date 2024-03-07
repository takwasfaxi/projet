const jwt =require('jsonwebtoken')

const authenticate=(req,res,next)=>{
    const token = req.header('Authorization');
    if(!token || !token.startsWith('Bearer ')){
        res.status(401).send('Authentication failed:invalid token')
    }
    try{
    const tokenData=token.split(' ')[1]
    const decodedToken = jwt.verify(tokenData,process.env.JWT_SECRET);//vérifier la validité du token, le token est décrypté, et les données du token sont stockées dans la variable decodedToken
    }catch(error){
        res.status(401).send('Authentication failed:invalid token')
    }
    
}
module.exports = authenticate;