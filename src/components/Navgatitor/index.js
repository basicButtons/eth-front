import React, { Component } from 'react'

export default class Navgatitor extends Component {
    render() {
        return (
            <div>
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <a className="nav-link active" href="/">首页</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/login">登陆</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/registe">注册</a>
                    </li>
                </ul>
            </div>
        )
    }
}
