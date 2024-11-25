import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength:[3,"Name must contain at least 3 characters."],
        maxLength:[30,"Name cannot exceed 30 characters."]
    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail,"Please provide valid Email."]
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    niches:{
        firstNiche: String,
        secondNiche: String,
        thirdNiche: String
    },
    password:{
        type: String,
        required:true,
        minLength:[8,"Password must contain at least 8 characters."],
        maxLength:[32,"Password cannot exceed 32 characters."],
        select: false
    },
    resume:{
        public_id:String,
        url:String
    },
    coverLetter:{
        type: String
    },
    role:{
        type:String,
        required:true,
        enum:["Job Seeker", "Employer"]
    },
    createdAt:{
        type:Date,
        default: Date.now,
    },
});

// FOR ENCRYPT password
// pre menthod user schema ko kuch values assign krta h save hone se phle 
userSchema.pre("save",async function (next) {
    if(!this.isModified("password")){
        next()
    }
    this.password=await bcrypt.hash(this.password,10);
});

// varify password entered by the user is correct or not using compare method
userSchema.methods.comparePassword= async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
};

userSchema.methods.getJWTToken= function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY,{   // sign method is use to generate the token
        expiresIn:process.env.JWT_EXPIRE,
    })
}


export const User=mongoose.model("User",userSchema);