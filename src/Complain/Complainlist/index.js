//react
import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import {SessionContext} from 'funweb-lib';
//antd
import {List, Row, Col,Button,Paragraph,Breadcrumb,message,Layout} from 'antd';
//css
import indexCss from './css/index.css'
//graphql
import {QueryRenderer, graphql} from 'react-relay';
//moment
import moment from 'moment'
//mutation

const query=graphql`
query Complainlist_Query($first: Int,$order:String,$skip:Int) {
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
      complainPoolQueryList(first:$first, order:$order, skip:$skip) {
        edges {
          title
          id
          createdAt
          content
        }
        totalCount
      }
    }
  }
  
  
  `
export default function () {
    //session
    const session = useContext(SessionContext);
    const [pageNum] = useState('1');//页码
    return (<QueryRenderer
        //环境设置
        environment={session.environment}
        //查询语句
        query={query}
        variables={{
            first:200,
            order:"",
            skip:(pageNum - 2) * 5

            
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
                    <Page
                       {...props}
                        pageNum={pageNum}
                    />
                )
            }
            }
            
        }
        
    />);
}

function Page(props) {
    let viewData =[];
    if (props&&props.viewer){
       
        viewData = props.viewer.user;
        console.log(props.viewer.user);
    }
    // console.log(props)
    let cmssData =[];
    if (props&&props.complainpool){
       
        cmssData = props.complainpool.complainPoolQueryList.edges;
        console.log(props.complainpool.complainPoolQueryList.edges);
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
                    <Link to="/complain.Complain/Create" className="watchkeerper_headgzt"><b>吐槽池发布</b></Link>
                    <Breadcrumb.Separator />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                    <Link to="/complain.Complain/List" className="watchkeerper_headgzt"><b>吐槽池列表</b></Link>
                    <Breadcrumb.Separator />
                    </Breadcrumb.Item>
                    </Breadcrumb>
                </Layout>
        
            <List
                dataSource={viewData}
                dataSource={cmssData}
                renderItem={item => {
                    console.log(item);
                    return (
                        
                        <List.Item>
                            <Row style={{}}>
                                <Col span={24}>
                                    <Row span={24}>
                                        <Col>
                                            <b>{viewData.name}:</b>
                                        <Link to={{pathname: `/complain.Complain/Content/`,search: `?id=${item.id}`,}}>
                                        <span className={indexCss.title}>{item.title}</span>
                                        </Link>
                                        </Col> 
                                        {/* <Paragraph ellipsis> */}
                                            <Col span={24}>
                                                <span className={indexCss.content}>{item.content}</span>
                                            </Col>
                                        {/* </Paragraph> */}
                                        
                                    </Row>
                                    <Row style={{width: '100%',offset:100}}>
                                                <Col span={24}>
                                                    <span>发布时间：{moment(item.createdAt).utc().add(8, 'hours').format('YYYY-MM-DD HH:mm')}</span>
                                                </Col>
                                    </Row>
                                    <Row>
                                    </Row>
                                </Col>
                            </Row>
                        </List.Item>
                    )
                    
                }}
                
            />
        </>
    )
}
