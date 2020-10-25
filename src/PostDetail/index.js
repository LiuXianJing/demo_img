import React, {useState, useEffect,} from 'react';
import {
  Button,
} from 'antd';
import  "./index.css";

const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Oct', 'Nov', 'Dec']
const PostDetail = (props) => {
  const postItem = props.location.state.data || {}

  const goBack = () => {
      props.history.go(-1)
  }
  return (
    <div className="post-detail">
      <div className="post-detail-inner"> 
       {
         <>
           <img src={postItem.image} className="detail-img" alt="..." />
           <p className='content-p'>
            {postItem.content}
           </p>
           <Button className='back-button' type='primary' onClick={goBack}>返回</Button>
         </>
      }
      </div>
    </div>
  );
}

export default PostDetail;
