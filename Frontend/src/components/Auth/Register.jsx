import React, { useState } from 'react'
import image from '../../assets/software-register-image.png'
import { Eye, EyeOff, User } from 'lucide-react'
import { NavLink } from 'react-router-dom';
import { authRegister } from '../../services/api/authApi';

const INITIAL = {
    name:'',
    email:'',
    password:'',
    role:'USER'
}

function Register() {
    const [form,setForm] = useState(INITIAL)
    const [loading, setLoading] = useState(false);
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);

    const handleRegister = async () => {
        setLoading(true)
        try {
          const payload = form;
          const response = await authRegister(payload);
            toast.success(response?.data?.message || 'user registered successfully')
          setTimeout(() => {
            navigate('/login', { state: { name: payload?.name } })
          }, 1000)
        } catch (error) {
          toast.error('something went wrong')
          console.log('error: ', error)
        }
        finally {
          setLoading(false)
        }
      }

    return (
        <div className="grid grid-cols-2 min-h-screen">
            <div className="h-screen">
                <img className="h-full w-full object-center" src={image} alt="" />
            </div>
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex items-center justify-center h-16 w-16 border-2 border-blue-500 rounded-full my-2">
                        <User className="text-blue-500" size={50} />
                    </div>
                    <h1 className="font-bold text-4xl">Create Your Account</h1>
                    <span className="text-center text-lg text-gray-400 mb-4">Join Us Today its quick and easy</span>
                </div>
                <div>
                    <div>
                        <input className="text-lg w-96 border border-gray-300 rounded-lg px-4 py-3 h-18 outline-none focus:ring-2 focus:ring-blue-500 my-2"
                            type="text" name="name" placeholder="Enter Your Name"
                            onChange={(e)=>setForm({...form,name:e.target.value})} />
                    </div>
                    <div>
                        <input className="text-lg w-96 border border-gray-300 rounded-lg px-4 py-3 h-18 outline-none focus:ring-2 focus:ring-blue-500 my-2"
                            type="email" name="name" placeholder="Enter Your Email"
                            onChange={(e)=>setForm({...form,email:e.target.value})} />
                    </div>
                    <div className="relative w-96">
                        <input className="text-lg w-96 border border-gray-300 rounded-lg px-4 py-3 h-18 outline-none focus:ring-2 focus:ring-blue-500 my-2"
                            type={ showPassword ? "text" : "password" } name="name" placeholder="Enter Your Password"
                            onChange={(e)=>setForm({...form,password:e.target.value})} />
                        <button onClick={()=>setShowPassword(!showPassword)}
                        className="absolute top-1/3 right-4 cursor-pointer">
                            { showPassword ? <EyeOff size={20} /> : <Eye size={20} /> }
                        </button>
                    </div>
                    <div className="relative w-96">
                        <input className="text-lg w-96 border border-gray-300 rounded-lg px-4 py-3 h-18 outline-none focus:ring-2 focus:ring-blue-500 my-2"
                            type={ showConfirmPassword ? "text" : "password" } name="name" placeholder="Enter Your Confirm Password" />
                        <button onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute top-1/3 right-4 cursor-pointer">
                            { showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} /> } 
                        </button>
                    </div>
                    <div className="flex flex-col justify-center items-center my-4">
                        <h3 className="text-lg text-gray-400">I agree the
                            <span className="text-blue-500">Terms of Service</span> and
                            <span className="text-blue-500">Privacy Policy</span>
                        </h3>
                        <button
                            disabled={loading}
                            className={`px-8 py-3 rounded-lg font-semibold shadow-md transition text-white w-full my-4
                                ${loading
                                    ? "bg-blue-400 cursor-not-allowed opacity-60 blur-[1px]"
                                    : "bg-blue-500 hover:bg-blue-700"
                                }`}
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                        <h3 className="text-lg text-gray-400 my-4">Already have an Account?
                            <NavLink className="text-blue-500" to="/login"> Login</NavLink>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register