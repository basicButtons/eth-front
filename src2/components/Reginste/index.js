import React, { Component } from 'react'
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {actionCreaters as registeractionCreaters} from "./store"

class Registe extends Component {
    state={
        username:"",
        email:"",
        password:"",
        rePassword:""
    }
    handleSubmit =  async (e)=>{
        e.preventDefault()
        const {data} = await this.props.registeFn.registeAC(this.state)
        console.log(data)
        // console.log(this.props.registerData)
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render() {
        const {username,email,password,rePassword} = this.state

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">用户名</label>
                        <input type="text" className="form-control" id="username" defaultValue={username} onChange={this.handleChange} name="username"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputEmail">邮箱</label>
                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" defaultValue={email} onChange={this.handleChange} name="email"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPassword">密码</label>
                        <input type="password" className="form-control" id="inputPassword" defaultValue={password}  onChange={this.handleChange} name="password"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="rePassword1">确认密码</label>
                        <input type="password" className="form-control" id="rePassword1" defaultValue={rePassword} onChange={this.handleChange} name="rePassword"/>
                    </div>
                    <button type="submit" href="/home" className="btn btn-primary">注册</button>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state=>{
    return {
        registerData:state.register
    }
}
const mapDispatchToProps = (dispatch)=> {  return  {
    registeFn:bindActionCreators(registeractionCreaters,dispatch)
}
}
export default connect(mapStateToProps,mapDispatchToProps)(Registe)