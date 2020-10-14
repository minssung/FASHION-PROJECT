import React, { Component } from 'react';
import './CSS/Home.css';
import Button from '@material-ui/core/Button';
// import Input from '@material-ui/core/Input';
import { Typography} from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';

class PostingAdd extends Component{
    constructor(props){
        super(props);
        this.state={
            file: "",
            file2: "",
            file3: "",
            preview: "",
            top_tag: "",
            outer_tag: "",
            bottom_tag: "",
            shoes_tag: "",
            content: "",
        }
    }

    async componentDidMount() {
        console.log('props user', this.props.user);
    }

    //onChange에서 호출 되는 함수 
    FileOnChange = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        let file2;
        let file3;
        if(event.target.files[1] != null){
            file2 = event.target.files[1];
        }else{
            file2 = null;
        } 
        if(event.target.files[2] != null){
            file3 = event.target.files[2];
        }else{
            file3 = null;
        }
        let prefile = event.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file : file,
            file2 : file2,
            file3 : file3,
            preview : reader.result
          });
        }
        // 이미지파일 읽어오는 메서드
        reader.readAsDataURL(prefile);
      }
      //상의 태그 선택 시 state값 변경
      TopTagChange = (tag) => {
          this.setState({
              top_tag : tag
          });
      }
      //하의 태그 선택 시 state값 변경
      BottonTagChange = (tag) => {
          this.setState({
              bottom_tag : tag
          });
      }
      //아우터 태그 선택 시 state값 변경
      OutorTagChange = (tag) => {
          this.setState({
              outer_tag : tag
          });
      }
      //신발 태그 선택 시 state값 변경
      ShoesTagChange = (tag) => {
          this.setState({
              shoes_tag : tag
          });
      }

      //포스팅 내용 입력 시 state값 변경
      ContentChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
      }

      //디비에 포스팅 데이터 저장 
      //이미지가 아닌 데이터 입력시 에러메세지 추가 해야함 
      async SaveData(){
        const formData = new FormData();
        
        console.log(this.state.file);
        console.log(this.state.file2);
        console.log(this.state.file3);
        // const postingData = this.state;
        formData.append('images',this.state.file);
        formData.append('images',this.state.file2);
        formData.append('images',this.state.file3);
        formData.append('top_tag',this.state.top_tag);
        formData.append('outer_tag',this.state.outer_tag);
        formData.append('bottom_tag',this.state.bottom_tag);
        formData.append('shoes_tag',this.state.shoes_tag);
        formData.append('content',this.state.content);
            // image : this.state.file,
            // top_tag : this.state.top_tag,
            // outer_tag : this.state.outer_tag,
            // bottom_tag : this.state.bottom_tag,
            // shoes_tag : this.state.shoes_tag,
        await axios.post(`http://localhost:5000/posting/insert?writer=${this.props.user.emailId}`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        });
        
        alert("포스팅이 저장되었습니다.");
      }

    render() {
        let profile_preview = null;
        if (this.state.file !== "") {
            profile_preview = <img className="profile_preview" src={this.state.preview} alt="user-profile"></img>
        }
        
     return (
        <div className="full-page">
            <div className="left-page">
                <div className="header">
                    <div className="logo">
                        <Link to={`/`}>
                            <img src="/images/logo3.PNG" alt="logo"/>
                        </Link>
                    </div>
                </div>
                <div className="left-page-posting">
                    <div className="preview-box">
                        {/* 이미지 미리보기 */}
                        {profile_preview}
                    </div>
                    <input type="file" 
                        name="images" 
                        accept="image/jpg, image/png, image/jpeg, image/gif"
                        multiple
                        //onChange는 input에 입력돤값이 변경될때마다 실행
                        onChange={this.FileOnChange}/>
                </div>
            </div>
            <div className="right-page">
                <div className="nullbox"></div>
                <div className="tag-selection">
                    <p>원하는 태그 선택</p>
                    <div className="tag-selection-box">
                        <form>
                            <ul>
                                <div className="line4"></div>
                                <li><Button style={{fontSize:'18px',fontWeight:'bold'}}>상의</Button></li>
                                <li><Button onClick={this.TopTagChange.bind(this, "short-Tee")} name="top-tag">반팔</Button></li>
                                <li><Button onClick={this.TopTagChange.bind(this, "shirt")} name="top-tag">셔츠</Button></li>
                                <li><Button onClick={this.TopTagChange.bind(this, "hood-shirt")} name="top-tag">후드티</Button></li>
                                <li><Button onClick={this.TopTagChange.bind(this, "sweatshirt")} name="top-tag">스웨트</Button></li>
                                <li><Button onClick={this.TopTagChange.bind(this, "top-etc")} name="top-tag">기타</Button></li>
                            </ul>
                            <div className="line1"></div>
                            <ul>
                                <li><Button style={{fontSize:'18px',fontWeight:'bold'}}>아우터</Button></li>
                                <li><Button onClick={this.OutorTagChange.bind(this,"coat")} name="coat">코트</Button></li>
                                <li><Button onClick={this.OutorTagChange.bind(this,"hood-zip-up")} name="hood-zip-up">후드집업</Button></li>
                                <li><Button onClick={this.OutorTagChange.bind(this,"cardigan")} name="cardigan">가디건</Button></li>
                                <li><Button onClick={this.OutorTagChange.bind(this,"jacket")} name="jacket">자켓</Button></li>
                                <li><Button onClick={this.OutorTagChange.bind(this,"padding")} name="padding">패딩</Button></li>
                            </ul>
                            <div className="line2"></div>
                            <ul>
                                <li><Button style={{fontSize:'18px',fontWeight:'bold'}}>하의</Button></li>
                                <li><Button onClick={this.BottonTagChange.bind(this, "Denim")} name="bottom">데님</Button></li>
                                <li><Button onClick={this.BottonTagChange.bind(this, "skirt")} name="bottom">스커트</Button></li>
                                <li><Button onClick={this.BottonTagChange.bind(this, "slacks")} name="bottom">슬랙스</Button></li>
                                <li><Button onClick={this.BottonTagChange.bind(this, "leggings")} name="bottom">레깅스</Button></li>
                                <li><Button onClick={this.BottonTagChange.bind(this, "bottom-etc")} name="bottom">기타</Button></li>
                            </ul>
                            <div className="line3"></div>
                            <ul>
                                <li><Button style={{fontSize:'18px',fontWeight:'bold'}} >신발</Button></li>
                                <li><Button onClick={this.ShoesTagChange.bind(this,"running-shoes")} name="shoes">운동화</Button></li>
                                <li><Button onClick={this.ShoesTagChange.bind(this,"shoes")} name="shoes">구두</Button></li>
                                <li><Button onClick={this.ShoesTagChange.bind(this,"sneakers")} name="shoes">스니커즈</Button></li>
                                <li><Button onClick={this.ShoesTagChange.bind(this,"sandal")} name="shoes">샌들</Button></li>
                                <li><Button onClick={this.ShoesTagChange.bind(this,"shoes-etc")} name="shoes">기타</Button></li>
                            </ul>
                        </form>
                    </div>
                </div>
                <div className="hot-posting">
                    <p>내용 입력</p>
                    <textarea className="posting-add-textarea" value={this.state.content} onChange={this.ContentChange.bind(this)} name="content"></textarea>
                    <div className="save">
                        <a href='/'>
                            <Button variant="contained" size="large" name="save" onClick={this.SaveData.bind(this)}>저장</Button>
                        </a>
                    </div>
                </div>
            </div>
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