//react
import React,{useContext,useState} from 'react'
import {Link} from 'react-router-dom'
//antd
import {Row, Col,Paragraph ,Comment, Avatar, Form, Button, List, Input,Layout ,Breadcrumb,Space} from 'antd';
import { MessageOutlined} from '@ant-design/icons';
//graphql
import {QueryRenderer, graphql} from 'react-relay';
import {ModalLink, SessionContext} from 'funweb-lib';
//moment
import moment from 'moment'
import Item from 'antd/lib/list/Item';

const query=graphql`
query Complaincontent_Query(
    $first: Int, 
    $order: String, 
    $skip: Int, 
    $id: ID!,
    $commentContent:String!,
    $fId:ID!,
    $topicId:ID!
  ) {
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
    complainpool {
      commentQueryList(first: $first, order: $order, skip: $skip) {
        edges {
          commentContent
          createdAt
          fId
          id
          topicId
        }
        totalCount
      }
      complainPoolQuery(id: $id) {
        content
        createdAt
        id
        title
      }
    }
    createComment(commentContent:$commentContent, fId:$fId, topicId:$topicId) {
      commentContent
      createdAt
      fId
      id
      topicId
    }
  }
  
  `

//页面
const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
export default function Page(props) {
    const io=props.query.get('id')
    console.log(io);
    const session = useContext(SessionContext);
    const [pageNum, setPageNum] = useState('1');//页码
    return (
    <QueryRenderer
        //环境设置
        environment={session.environment}
        //查询语句
        
        query={query}
        variables={{
            id:io
        }}
        //查询过程
        render={({error, props, retry}) => {
            
            if (error) {//error
                return (
                    <div>
                        <h1>Error!</h1><br/>{error.message}
                    </div>)
            }else{
                console.log(props);
                return (
                    < Detail
                       {...props}
                        
                    />
                )
            }
            }
        }  
        />);
        
    }
    
function Detail(props) {
    let viewData =[];
    if (props&&props.viewer){
       
        viewData = props.viewer.user;
        console.log(props.viewer.user);
    }
            let cmssData ={};
            if(props&&props.complainpool)
            {
            cmssData = props.complainpool.complainPoolQuery;
            console.log(props.complainpool.complainPoolQuery);
            }

    return (
        
            <>
            <Layout>
                    <Breadcrumb  className='head_bread' separator=""  style={{fontSize:"17px",margin:"0px 20px 20px 0px"}}>
                    <Breadcrumb.Item>
                    <Link to="/commander.WorkingTable/BasicList" className="watchkeerper_headgzt"><b>工作台</b></Link>
                    <Breadcrumb.Separator />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                    <Link to="/complain.Complain/Create" className="watchkeerper_headgzt"><b>知识库发布</b></Link>
                    <Breadcrumb.Separator />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                    <Link to="/complain.Complain/List" className="watchkeerper_headgzt"><b>吐槽池列表</b></Link>
                    <Breadcrumb.Separator />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                    <Link to="/complain.Complain/Content" className="watchkeerper_headgzt"><b>吐槽池详情</b></Link>
                    <Breadcrumb.Separator />
                    </Breadcrumb.Item>
                    </Breadcrumb>
            </Layout>
                    <div>
                        <Row>
                            <Col style={{"margin-top": "20px"}}>
                                <b>{viewData.name}:</b>
                            </Col>
                            <Col style={{"margin-top": "20px"}}>
                                <b>{cmssData.title}</b>
                            </Col>
                            <Col span={24}>
                                <Row style={{width: '100%'}}>
                                    <Col span={8}>
                                        <span>{moment(props.createdAt).utc().add(8, 'hours').format('YYYY-MM-DD HH:mm')}</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col  style={{"margin-top": "20px"}}>
                                <b>{cmssData.content}</b>
                            </Col>
                        </Row>
                    </div>
                    <div>
                    <IconText icon={MessageOutlined} text={props.totalCount} key="list-vertical-message" />
                    </div>
                    <div>
                    <Form.Item
                                name="commentContent"
                                labelCol={{span: 1}}
                                wrapperCol={{span: 5,offset:0}}
                            >
                                <Input className="btn"  placeholder='输入评论'/>
                    </Form.Item>
                    </div>
                    <div>
                    <Col span={3}>
                                    <Button type="primary" htmlType="submit" className='confirm_btn'>
                                        发送
                                </Button>
                                </Col>
                    </div>
        </>
    )
}

