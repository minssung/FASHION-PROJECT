import { Button,IconButton } from '@material-ui/core';
// 게시글 페이지
import React, { Component } from 'react';
import './CSS/PostingView.css';

class PostingView extends  Component{
    constructor(props) {
        super(props);
        this.state = {
            file: "",
            preview: "",
            top_tag: "",
            outer_tag: "",
            bottom_tag: "",
            shoes_tag: "",
            content: "",
            loginModal: false,
            posting_data: [],
            nick: '',
        }
    }
    async componentDidMount(){
        this.setState({
            posting_data: this.props.postingdata,
        })
    }

    render(){

        // const posting = this.props.postingdata[6] ? this.props.postingdata[6].image : null;
        const posting = this.props.postingdata[0] ;
        // ? this.props.postingdata[0].image : null;
        console.log(posting);
        // if(posting) {
        //     const reader = new FileReader();
        //     const basePosting = Buffer.from(posting).toString('base64');
        //     console.log(basePosting);
        //     reader.readAsArrayBuffer(basePosting);
        //     reader.onload = (event) => {
        //         console.log(event.target.result);
        //     }
        // }
        // this.setState({})
        console.log(typeof posting);
        // const objectURL = window.URL ? window.URL.createObjectURL(posting) : window.webkitURL.createObjectURL(posting);
        // const objectURL = URL.createObjectURL(new Blob(['<a></a>'], {type: 'text/html'}));
        return (
            <div className="PostingView-full">
                {/* 유저이미지 */}
                <div className="PostingView-img">
                    <img src={''}></img>
                </div>
                {/* 유저 네임 및 글 */}
                <div className="user-name-content">
                    {/* <p>{posting.content}</p> */}
                    <p className="posting-user-name">username</p> 
                    <p className="posting-user-content">content 내용입력...</p>
                    <div className="posting-heart-btn">
                        <IconButton>
                            <img height="30px" src="/images/heart.PNG" alt="addposting"/>123
                        </IconButton>
                    </div>
                </div>
                {/* 댓글 */}
                <div className="comment-preview">
                    <div>
                        <p className="posting-comment-user">user</p>
                        <p className="posting-comment-content">user comment...</p>
                        <p className="posting-comment-user">user</p>
                        <p className="posting-comment-content">user comment...</p>
                        <p className="posting-comment-user">user</p>
                        <p className="posting-comment-content">user comment...</p>
                    </div>
                </div>
                {/* 댓글 적기 */}
                <div className="comment-add">
                    <form>
                        <textarea className="comment-add-box" placeholder="댓글 입력"></textarea>
                        <Button variant="outlined" style={{width:'83px', height:'70px',fontSize:'20px',fontWeight:'bold'}}>게시</Button>
                    </form>
                </div>
            </div>
        )
    }   
}


export default PostingView;