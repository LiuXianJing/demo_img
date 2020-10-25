import React, {useState, useEffect,} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import './index.css';
import {
  Button,
  message,
  Input,
  Select,
  Form,
  Row,
  Col,
} from 'antd';
import {
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons'
import {
  get,
} from 'axios';

const shopList = ['storage', 'bedroom', 'living', 'dining',  'other']   //商品种类
const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Oct', 'Nov', 'Dec']   //月份
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: {
    offset: 3,
    span: 12,
  },
};
const ImgContent = (props) => {
  const [ content, setContent ] = useState({})
  const [selectShopIndex, setSelectShopIndex] = useState(0)  //展开折叠商品项的index
  const [ shopType, setShopType ] = useState('')   //选择的商品种类
  const [ shopIgHandle, setShopIgHandle ] = useState('')   //商品ig_handle
  const [ shopImg, setShopImg ] = useState('')   //商品img

  useEffect(() => {
    get('https://www.castlery.com/api/story_bloks/social-images').then((res) => {
      let resData = res.data || {}
      let story = resData.story || {}    
      setContent(story.content)
    }).catch((err) => {
      message.error('查询失败')
    })
  }, [])
  
  //展开折叠
  const handleOpenOrFold = (index) => {
    setSelectShopIndex(indexOld => {
       if(index === indexOld){
         return index = null
       }
       return index
    })
  }
  //每种商品展示
  const handleContentItem = (contentItem) => <div className="content-item"> 
      {
        contentItem &&  contentItem.length>0 && contentItem.map((item, index) => 
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={6}>
        <div className="post-item" key={item._uid} onClick={() => handleToDetail(item)}>
            <img src={item.image} className="post-img" alt="..." />
            <p className='good-p' >
            <p className='ig-handle-p'>
            {item.ig_handle}
            </p>
            <p className='date-p'>
              {`${monthList[parseInt(new Date(item.date).getMonth())-1] || ''} ${new Date(item.date).getFullYear()}`}
            </p>
            </p>
        </div>
        </Col>
        </Row>
        ) 
      }
    </div>
  //进入商品详情
  const handleToDetail = (item) => {
    props.history.push({pathname: `/post/${item._uid}`, state: {data: item}})
  }

  //选择商品种类
  const handleShopType = (value) => {
    setShopType(value)
  }
   //输入商品ig_handle
   const handleShopIgHandle = (e) => {
    setShopIgHandle(e.target.value)
  }
  //输入商品img的url
  const handleShopImg = (e) => {
    setShopImg(e.target.value)
  }
  //添加商品
  const addShop = () => {
    setSelectShopIndex(shopList.indexOf(shopType))
    content[shopType].push({
      ig_handle:  shopIgHandle,
      image: shopImg
    })
    message.success('添加成功')
  }
  return  <div> 
     <Form  {...layout} >
      <Form.Item label="商品类别" >
        <Select  width='30%' onChange={handleShopType} value={shopType}>
        {
            shopList.map((item, index) => 
             <Select.Option key={index} value={item}>{item}</Select.Option>)
          }
        </Select>
      </Form.Item>
      <Form.Item  label="ig_handle" >
         <Input placeholder='请输入ig_handle' width='30%' onChange={handleShopIgHandle} />
      </Form.Item>
      <Form.Item   label="图片地址" >
         <Input placeholder='请输入图片地址' width='30%'  onChange={handleShopImg}/>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" onClick={addShop}>
          添加
        </Button>
      </Form.Item>
    </Form>
    {
      shopList.map((k, i) => {
        if(content[k] && Array.isArray(content[k])){
          return <div className='main' key={i}> 
            <p className='header'>
              <span>  {k}  </span>
              {
                i === selectShopIndex ? <MinusOutlined  onClick={() => handleOpenOrFold(i)}   /> :
                <PlusOutlined  onClick={() => handleOpenOrFold(i)}   />   
              }
            </p>
            {
                 i === selectShopIndex && 
               handleContentItem(content[k])
            }
          </div>
        }
      })
    }
    </div> 
}

export default ImgContent;
