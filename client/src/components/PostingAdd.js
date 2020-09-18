import React, { Component } from 'react';
import './CSS/Home.css';
import Button from '@material-ui/core/Button';
// import Input from '@material-ui/core/Input';
import { Typography, IconButton } from '@material-ui/core';

class PostingAdd extends Component{
    constructor(props){
        super(props);
        this.state={
            file: "",
            preview: ""
        }
    }
    //onChange에서 호출 되는 함수 
    FileOnChange = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file : file,
            preview : reader.result
          })
        }
        reader.readAsDataURL(file);
      }

    render(){
        let profile_preview = null;
        if(this.state.file !== ''){
            profile_preview = <img className='profile_preview' src={this.state.preview}></img>
        }
     return (
        <div className="full-page">
        <from>
        <div className="left-page">
            <div className="header">
                <div className="logo">
                    <img src="/images/logo3.PNG" alt="logo"/>
                </div>
            </div>
            <div className="left-page-posting">
            <input type="file" 
                name="upload_img" 
                accept="image/jpg,impge/png,image/jpeg,image/gif"
                //onChange는 input에 입력돤값이 변경될때마다 실행
                onChange={this.FileOnChange}/>
            </div>
            <div className="preview-box">
                {profile_preview}
            </div>
            
        </div>
        <div className="right-page">
            <div className="nullbox"></div>
            <div className="tag-selection">
                <p>원하는 태그 선택</p>
                <div className="tag-selection-box">
                    <from>
                        <ul>
                            <div className="line4"></div>
                            <li><Button style={{fontSize:'18px',fontWeight:'bold'}}>상의</Button></li>
                            <li><Button>반팔</Button></li>
                            <li><Button>셔츠</Button></li>
                            <li><Button>후드티</Button></li>
                            <li><Button>스웨트</Button></li>
                            <li><Button>기타</Button></li>
                        </ul>
                        <div className="line1"></div>
                        <ul>
                            <li><Button style={{fontSize:'18px',fontWeight:'bold'}}>아우터</Button></li>
                            <li><Button>코트</Button></li>
                            <li><Button>후드집업</Button></li>
                            <li><Button>가디건</Button></li>
                            <li><Button>자켓</Button></li>
                            <li><Button>패딩</Button></li>
                        </ul>
                        <div className="line2"></div>
                        <ul>
                            <li><Button style={{fontSize:'18px',fontWeight:'bold'}}>하의</Button></li>
                            <li><Button>데님</Button></li>
                            <li><Button>스커트</Button></li>
                            <li><Button>슬랙스</Button></li>
                            <li><Button>레깅스</Button></li>
                            <li><Button>기타</Button></li>
                        </ul>
                        <div className="line3"></div>
                        <ul>
                            <li><Button style={{fontSize:'18px',fontWeight:'bold'}} >신발</Button></li>
                            <li><Button>운동화</Button></li>
                            <li><Button>구두</Button></li>
                            <li><Button>스니커즈</Button></li>
                            <li><Button>샌들</Button></li>
                            <li><Button>기타</Button></li>
                        </ul>
                    </from>
                </div>
            </div>
            <div className="hot-posting">
                <p>내용 입력</p>
                    <textarea></textarea>
                    <div className="save">
                        <Button variant="contained" size="large">저장</Button>
                    </div>
            </div>
        </div>
        </from>
        <footer className="footer">
            <Typography variant="body2" color="textSecondary" align="center">
            {'긴머리와 파마머리 '+new Date().getFullYear()+' 졸업작품 프로젝트'}
            </Typography>
        </footer>
    
    </div>
     );
    };
};
export default PostingAdd;