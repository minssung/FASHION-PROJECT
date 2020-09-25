// 게시글 페이지
import React, { Component } from 'react';
import './CSS/PostingView.css';

class PostingView extends Component{
    render(){
        
        return (
            <div className="PostingView-full">
                {/* 유저이미지 */}
                <div className="PostingView-img">
                    
                </div>
                {/* 유저 네임 및 글 */}
                <div className="user-name-content">

                </div>
                {/* 댓글 */}
                <div className="comment-preview">

                </div>
                {/* 댓글 적기 */}
                <div className="comment-add">

                </div>
            </div>
        )
    }   
}


export default PostingView;