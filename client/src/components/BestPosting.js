import { Button,IconButton } from '@material-ui/core';
// 게시글 페이지
import React, { Component } from 'react';
import './CSS/BestPosting.css';
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

        const posting = this.props.postingdata;

        return (
            <div className="BestPostingView-full">
                <div className="BestPostingView-img">
                    <div><img className="BestImg" src={"http://localhost:5000" + posting?.image}/></div>
                </div>
                <div className="BestPosting-content">
                    {
                        posting &&
                        <p className="BestPosting-coment">{posting.content}</p>
                    }
                    
                    <div className="BestPosting-heart-btn">
                        <IconButton>
                            <img className="like-btn" height="30px" src="/images/heart.PNG" alt="post-like"/>
                            <span className="BestPosting-like">{posting.like}</span>
                        </IconButton>
                    </div>
                </div>
            </div>
        )
    }   
}


export default PostingView;