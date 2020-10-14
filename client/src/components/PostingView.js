import { Button,IconButton } from '@material-ui/core';
// 게시글 페이지
import React, { Component } from 'react';
import './CSS/PostingView.css';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

class PostingView extends Component{
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

        const posting = this.props.postingdata;
        // console.log('props', posting);
        // console.log(posting.nick)

        // ? this.props.postingdata[0].image : null;
        // console.log(posting);
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
        // const objectURL = window.URL ? window.URL.createObjectURL(posting) : window.webkitURL.createObjectURL(posting);
        // const objectURL = URL.createObjectURL(new Blob(['<a></a>'], {type: 'text/html'}));

        return (
            <div className="PostingView-full">
                <div className="PostingView-img">
                    {/* 이미지 리사이즈 필요 */}
                    {/* 이미지 슬라이드  */}
                    <AwesomeSlider
                    style={{width:"500px",height:"470px"}}
                    bullets={true}>
                        <div><img src={"http://localhost:5000"+posting.image}/></div>
                        <div><img src={"http://localhost:5000"+posting.image2}/></div>
                        <div><img src={"http://localhost:5000"+posting.image3}/></div>
                    </AwesomeSlider>
                </div>
                {/* 유저 네임 및 글 */}
                {/* <div className="user-name-content">
                    <p className="posting-user-name">{posting.postting_num}</p> 
                    <p className="posting-user-content">{posting.content}</p>
                    <div className="posting-heart-btn">
                        <IconButton>
                            <img height="30px" src="/images/heart.PNG" alt="addposting"/>{posting.like}
                    {
                        posting &&
                        <img src={"http://localhost:5000"+posting.image} alt="post-img" />
                    }
                    
                </div>
                {/* 유저 네임 및 글 */}
                <div className="user-name-content">
                    {/* {
                        posting &&
                        <p>{posting.content}</p>
                    } */}
                    <p className="posting-user-name">{posting.writer}</p>
                    {
                        posting &&
                        <p className="posting-user-content">{posting.content}</p>
                    }
                    
                    <div className="posting-heart-btn">
                        <IconButton>
                            <img height="30px" src="/images/heart.PNG" alt="post-like"/>
                            <span className="posting-like">{posting.like}</span>
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