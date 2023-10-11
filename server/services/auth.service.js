import model from '../models/user.model.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";


export default class authService {
    constructor(){
        this.model=model
    }
    validateEmail(email) {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(email);
      }
       validatePassword(password) {
        const pattern = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
        return pattern.test(password);
      }
      bcryptPassword= async(password)=>{
        try {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          return hashedPassword;
        } catch (error) {
          // Xử lý lỗi nếu cần thiết
          throw new Error('Không thể bcrypt mật khẩu');
        }
      }
      generateRefreshToken= (id,token)=>{
        return jwt.sign({ id,token }, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn:  process.env.TIME_REFRESHTOKEN,
        });
      }
      generateToken = (id) => {
        return jwt.sign({ id }, process.env.TOKEN_SECRET, {
          expiresIn:  process.env.TIME_TOKEN,
        });
      };
    
      verify = (token, signature) => {
        return jwt.verify(token, signature);
      };
      passwordIsCorrect = async (passwordHash, userPassWord) =>await bcrypt.compare(passwordHash, userPassWord);
        //register
      register = ({ email, password, name }) => {
        return new Promise(async (resolve, reject) => {
          try {
            if(!this.validateEmail(email))throw new Error('wrong email format')
            if(!this.validatePassword(password)) throw new Error('Password must have at least 6 characters including letters and numbers ')
            if (!email || !password || !name)
              throw new Error("Please fill in all required fields");
            if (password.length < 6)
              throw new Error("Password must be up to 6 characters");
    
            const userExist = await this.model.findOne({ email });
            if (userExist) throw new Error("Email has already been registereds");
            else {
              const user = await this.model.create({ email, password, name });
            //   console.log(user);
              resolve({ complete: true });
            }
    
          } catch (error) {
            reject(error);
          }
        });
      };
      //login
      login = ({ email, password }) => {
        return new Promise(async (resolve, reject) => {
          try {
            // console.log(process.env.TIME_TOKEN);
            if(!this.validateEmail(email))throw new Error('wrong email format')
            if(!this.validatePassword(password)) throw new Error('Password must have at least 6 characters including letters and numbers ')
            if (!email || !password)
              throw new Error("Please fill in all required fields");
            let account = await this.model.findOne({ email });

            // console.log(account);
            if (!account) {
              throw new Error("your email is not exist");
            } else {
              let correct = await this.passwordIsCorrect(
                password,
                account.password
              );
              if (!correct) throw new Error("password is wrong");
              else {
 
                
                let token = this.generateToken(account._id);
                 console.log(token);
                let refreshToken = this.generateRefreshToken(account._id,token)
                resolve({
                  refreshToken:refreshToken,
                  Accesstoken:`${token}`,
                  _id:`${account._id}`
                });
    
              }
            }
          } catch (error) {
            reject(error);
          }
        });
      };
      //logout
      logout=(accessToken)=>{
        return new Promise(async(resolve, reject) => {
          try {
            global.blackListToken.push(accessToken)
            console.log(global.blackListToken);
            if(!accessToken)throw new Error('token sai ')
            resolve({logout :'success'})
          } catch (error) {
            reject(error)
          }
        })
       }
       //refreshToken
       refreshToken = ( oldtoken,oldReFreshToken ) => {
        return new Promise(async (resolve, reject) => {
          try {
            
            if(!oldtoken||!oldReFreshToken)throw new Error('token is invalid')
            // var checkToken = jwt.verify(oldtoken.token,'taotoken')
          // console.log();
          console.log(global.blackListToken);
          if (global.blackListToken.includes(oldtoken))throw new Error('ban da dang xuat')
            var checkReFreshToken =jwt.verify(oldReFreshToken,process.env.REFRESH_TOKEN_SECRET)
            if(!checkReFreshToken)throw new Error('you must login back')
            if(checkReFreshToken.token!==oldtoken) throw new Error('refresh token and access token do not match')
            let newToken = this.generateToken(checkReFreshToken.id)
            let newReFreshToken = this.generateRefreshToken(checkReFreshToken.id,newToken)
            resolve({
              accessToken:newToken,
              refreshToken:newReFreshToken
            })
          } catch (error) {
            reject(error)
          }
        });
      };
      //updatePassword 
      updatePassword=({email,oldPassword,newPassword})=>{
        return new Promise( async(resolve, reject) => {
          try {
            console.log(email,oldPassword,newPassword);
            if (!email || !oldPassword || !newPassword)
            throw new Error("Please fill in all required fields");
            if (newPassword.length < 6)
            throw new Error("Password must be up to 6 characters");
            
            var findUser= await this.model.findOne({email:email})
            if(!findUser){
              throw new Error('email is invalid')
            }
            else{
              var check = await this.passwordIsCorrect(oldPassword,findUser.password)
              if(!check) throw new Error('password is wrong')
              else{
                var bcryptPassword= await this.bcryptPassword(newPassword)
                await this.model.updateOne({email:email},{password:bcryptPassword})
                resolve({changePassword:true})
              }
            }
            
          } catch (error) {
            reject(error)
          }
        })
      }
    
}