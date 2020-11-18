//react
import React,{useContext,useState} from 'react'
import {SessionContext} from 'funweb-lib';
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'
//antd
import {Layout, Input, Row, Col,Button, Form,message,Select,Option,Breadcrumb} from 'antd';
//css
import indexCss from './css/index.css'
import '../css/bread.global.css'
//css
import createOrderCss from './css/createOrderForm.css'
import createorder from './css/createorder.css'
//components
import RichText from './components/richText'
//mutations
import createBase from './mutations/createBase'
import updateBase from './mutations/updateBase'
//mutation
//graphql
import {QueryRenderer, graphql} from 'react-relay';

const mutation=graphql`
mutation Complaincreate_Mutation($content: String!, $title: String!) {
    viewer {
      id
      username
      user {
        ... on Employee {
          id
          name
        }
      }
    }
    createComplainPool(content: $content, title: $title) {
      content
      createdAt
      deletedAt
      title
      updatedAt
      id
    }
  }
  
  
  `
const {Content} = Layout;
//页面
export default function Page(props) {
    const complainId=props.id;
    const session=useContext(SessionContext)//session
    const [isPublish,setisPublish]=useState(false)//是否发布成功
    const id=props.id//吐槽池d
    //富文本--不能为空
    function richTextCheck(rule, value) {
        if (value) {
            //去标签
            let regex = /(<([^>]+)>)/ig
            let noHtmlVal = value.toString('html').replace(regex, '')
            let flag = false;//默认不通过
            if (noHtmlVal === '') {
                return Promise.reject('请输入具体的内容');
            } else {
                //判断是否全是空格
                let tmpArr = noHtmlVal.split(';')
                for (let i = 0; i < tmpArr.length; i++) {
                    if (tmpArr[i] != ' &nbsp' && i != tmpArr.length - 1 && tmpArr[i] != '&nbsp') {
                        flag = true
                    }
                    if (i === tmpArr.length - 1 && flag === false) {
                        tmpArr[tmpArr.length - 1] === '' ? flag = false : flag = true
                    }
                }

            }
            if (flag)
                return Promise.resolve();
            else
                return Promise.reject('请输入具体的内容');
        } else {
            return Promise.reject('请输入具体的内容');
        }
    }
    //表单提交
    const onFinish = (formInfo) => {
        
        if(id){
            //更新吐槽池
            updateBase(id,formInfo, session.environment, (response, errors) => {
                    if (errors) {
                        message.error(errors[0].message);
                    } else {
                        message.success({
                            content: '更新成功', duration: '1', onClose: () => {
                                setisPublish(true)
                            }
                        });
                    }
                },
                (errors) => {
                    message.error(errors.source.errors[0].message);
                })
        }
        else {
            //发布吐槽池
            createBase(formInfo, session.environment, (response, errors) => {
                    if (errors) {
                        message.error(errors[0].message);
                    } else {

                        message.success({
                            content: '发布成功', duration: '1', onClose: () => {
                                setisPublish(true)
                            }
                        });
                    }
                },
                (errors) => {
                    message.error(errors.source.errors[0].message);
                })
        }
    }
    //发布成功
    if(isPublish)
        return(
            <Redirect to={'/complain.Complain/List'}/>
        )
    //暂未发布
    return (
        
        <>
            <Form
                className='form'
                name="form_content"
                initialValues={{remember: true}}
                onFinish={onFinish}
                style={{fontSize:"18px"}}
                labelAlign={'left'}
                labelCol={{span: 3}}
                wrapperCol={{span: 16}}
            >
                <Layout>

                    <Breadcrumb  className='head_bread' separator=""  style={{fontSize:"18px",margin:"0px 20px 20px 0px"}}>
            <Breadcrumb.Item>
                <Link to="/commander.WorkingTable/BasicList" className="watchkeerper_headgzt"><b>工作台</b></Link>
                <Breadcrumb.Separator />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <Link to="/complain.Complain/Create" className="watchkeerper_headgzt"><b>吐槽池发布</b></Link>
                <Breadcrumb.Separator />
            </Breadcrumb.Item>
            </Breadcrumb>
            </Layout>

                <Layout>
                    <Content className={indexCss.richText}>
                    <div className={indexCss.contentArea}>
                            <div className={indexCss.header_right}>
                            <Form.Item
                                label="标题"
                                name="title"
                                labelCol={{span: 1}}
                                wrapperCol={{span: 5,offset:2}}
                                rules={[
                                    {required: true, message: '请输入标题'}]}
                            >
                                <Input className="btn"  placeholder='输入标题'/>
                            </Form.Item>
                            </div>
                        </div>
                        <div className={indexCss.contentArea}>
                        <Row >
                            <Form.Item
                                label="吐槽池内容"
                                name="content"
                                labelCol={{span: 3}}
                                rules={[{required: true, message: ' '}, {validator: richTextCheck}]}
                                wrapperCol={{span:20,offset:1}}
                            >
                                <RichText onChange={(e) => {
                                }} placeholer={'请输入吐槽池内容'}/>
                            </Form.Item>
                            </Row>
                        </div>
                    </Content>
                    <Content>
                        <div style={{'background': 'white'}}>
                            <Row  justify={'center'}>
                                <Col span={3}>
                                    <Button type="primary" htmlType="submit" className='confirm_btn'>
                                        发送
                                </Button>
                                </Col>
                                <Col span={3}>
                                    <Link to='/complain.Complain/List'>
                                <Button type="primary" htmlType="submit" className={createorder.cancel_btn}>
                                    返回
                                </Button>
                            </Link>
                        </Col>
                            </Row>
                        </div>
                    </Content>
                </Layout>
            </Form>
        </>
    )
}

