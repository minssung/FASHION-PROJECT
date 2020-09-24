import React, { Component } from 'react';

class NotFound extends Component {
    render() { 
        return (
            <div className="not-main">
                <h1 style={{margin:"50px"}}>잘못된 접근입니다.</h1>
                <a href="/">메인으로 돌아가기</a>
            </div>
        );
    }
}
 
export default NotFound;