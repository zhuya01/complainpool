//react
import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import {SessionContext} from 'funweb-lib';
//antd
import {List, Row, Col,Breadcrumb,Layout,Tabs} from 'antd';
import {CommentOutlined} from '@ant-design/icons';
//css
import indexCss from './css/index.css'
//graphql
import {QueryRenderer, graphql} from 'react-relay';
//moment
import moment from 'moment'
//mutation
const { TabPane } = Tabs;
const query=graphql`
query Complainlist_Query($first: Int, $order: String, $skip: Int) {
    complainpool {
      complainPoolQueryList(first: $first, order: $order, skip: $skip) {
        edges {
          title
          id
          createdAt
          content
          user {
            name
            id
          }
          annexCreate {
            name
            url
          }
          count
        }
      }
    }
    viewer {
      user {
        ... on Employee {
          id
        }
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
            first:100,
            order:"",
            skip:(pageNum - 1) * 5
            
        }}
        //查询过程
        render={({error, props, retry}) => {
            if (error) {//error
                return (
                    <div>
                        <h1>Error!</h1><br/>{error.message}
                    </div>)
            }else{
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
    let cmssData =[];
    if (props&&props.complainpool){
       
        cmssData = props.complainpool.complainPoolQueryList.edges;
        console.log(props.complainpool.complainPoolQueryList.edges);
    }
    let countData =[];
    if (props&&props.complainpool){
       
        countData = props.complainpool.complainPoolQueryList
        console.log(props.complainpool.complainPoolQueryList);
    }
    
    let viewData =[];
    if (props&&props.viewer){
       
        viewData = props.viewer;
        console.log(viewData);
    }
    cmssData.sort(function(a,b){
        return a.time < b.time ? 1 : -1
        })
    return (
        <>
                <Layout style={{backgroundColor:"white"}}>
                        <Breadcrumb  className={indexCss.head_bread} separator="" >
                        <Breadcrumb.Item>
                        <Link to="/complain.Complain/List" className="watchkeerper_headgzt"><b>吐槽池</b></Link>
                        <Breadcrumb.Separator />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                        <Link to="/complain.Complain/List" className="watchkeerper_headgzt"><b>吐槽池列表</b></Link>
                        <Breadcrumb.Separator />
                        </Breadcrumb.Item>
                        </Breadcrumb>
                </Layout>
                <div className={indexCss.ct}>
                    <Row>
                        <Col>
                        <span>创建吐槽池</span>
                        </Col>
                        <Col>
                        <a href="/complain.Complain/Create">
                            <div className={indexCss.orderReceive_head_addSpan}> 
                            </div>
                        </a>
                        </Col>
                    </Row>
                </div>
                <div style={{backgroundColor:"white"}}>
                    <Tabs defaultActiveKey="1" style={{backgroundColor:"white",marginLeft:"20px",marginRight:"20px"}} size="middle">
                    <TabPane tab={<span className={indexCss.tab}>全部文章</span>} key="1" >
        
            <List
                pagination={{
                    responsive:false,
                    onChange: page => {
                      console.log(page);
                    },
                    pageSize: 10,
                  }}
                dataSource={cmssData}
                renderItem={item => {
                    console.log(item)
                    return (
                        <List.Item
                        >
                            <div className={indexCss.body}>
                                <Row span={24}>
                                    <Col id={indexCss.title}>
                                        <Link to={{pathname: `/complain.Complain/Content/`,search: `?id=${item.id}`,}}>
                                            <span style={{color:"#555555",fontWeight:"bold"}}>{item.title}</span>
                                        </Link>
                                    </Col>     
                                </Row>
                                <Row span={24}>
                                    <Col id={indexCss.name}>
                                        <span>发布人：{item.user?item.user.name:''}</span>
                                    </Col>    
                                    <Col id={indexCss.time}>
                                        <span>发布时间：{moment(item.createdAt).utc().add(8, 'hours').format('YYYY-MM-DD HH:mm')}</span>
                                    </Col>
                                    <Col>
                                        <Link to={{pathname: `/complain.Complain/Content/`,search: `?id=${item.id}`,}}>
                                        <div className={indexCss.image}> 
                                            <CommentOutlined/>
                                            <span style={{marginLeft:"10px",color:"#black"}}>{item.count}</span>
                                        </div>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row span={24}>
                                    <Col >
                                        {
                                            item.annexCreate.map((image)=>{
                                                console.log(image)
                                                return(
                                                    <img id={indexCss.images} src={'/storage/' + image.url}/>
                                                )
                                            })
                                            
                                        }
                                        
                                    </Col>
                                </Row>
                            </div>  
                        </List.Item>
                    
                    )
                    
                }
                }
            />
            </TabPane>
            <TabPane tab={<span className={indexCss.tab}>我发布的文章</span>} key="2">

            <List
                pagination={{
                    responsive:false,
                    onChange: page => {
                      console.log(page);
                    },
                    pageSize: 10,
                  }}
                dataSource={cmssData}
                renderItem={item => {
                    if(viewData.user&&item.user&&viewData.user.id===item.user.id){
                        return (
                            <List.Item
                            >
                                <div className={indexCss.body}>
                                    <Row span={24}>
                                        <Col id={indexCss.title}>
                                            <Link to={{pathname: `/complain.Complain/Content/`,search: `?id=${item.id}`,}}>
                                                <span style={{color:"#555555",fontWeight:"bold"}}>{item.title}</span>
                                            </Link>
                                        </Col>     
                                    </Row>
                                    <Row span={24}>
                                        <Col id={indexCss.name}>
                                            <span>发布人：{item.user?item.user.name:''}</span>
                                        </Col>    
                                        <Col id={indexCss.time}>
                                            <span>发布时间：{moment(item.createdAt).utc().add(8, 'hours').format('YYYY-MM-DD HH:mm')}</span>
                                        </Col>
                                        <Col>
                                            <Link to={{pathname: `/complain.Complain/Content/`,search: `?id=${item.id}`,}}>
                                                <div className={indexCss.image}> 
                                                <CommentOutlined/>
                                                <span style={{marginLeft:"10px",color:"#black"}}>{item.count}</span>
                                                </div>
                                                
                                            </Link>
                                        </Col>
                                    </Row>
                                    <Row span={24}>
                                        <Col >
                                            {
                                                item.annexCreate.map((image)=>{
                                                    console.log(image)
                                                    return(
                                                        <img id={indexCss.images} src={'/storage/' + image.url}/>
                                                    )
                                                })
                                                
                                            }
                                            
                                        </Col>
                                    </Row>
                                </div>  
                            </List.Item>
                        
                        )
                    }
                }}
                
            />
            </TabPane>     
              </Tabs>
              </div>
        </>
    )
}
