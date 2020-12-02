// //React

// import React, {useContext, useState} from 'react';
// import {SessionContext} from 'funweb-lib'
// import {QueryRenderer, graphql} from 'react-relay';
// //antd相关
// import {Row, Col,Form, Button, List, Input,Layout ,Breadcrumb,message,Popover} from 'antd';
// //css
// import indexCss from '../../Complain/listdesign/css/index.css'
// const query=graphql`
// query Complaincontent_Query($id: ID!,$complainId:ID!) {
//     complainpool {
//       complainPoolQuery(id: $id) {
//         content
//         count
//         createdAt
//         title
//         comment {
//           commentContent
//           createdAt
//           fId
//           topicId
//           id
//           user {
//             id
//             name
//           }
//         }
//         user {
//           name
//           id
//         }
//         id
//       }
//       commentQueryList(complainId:$complainId) {
//         edges {
//           commentContent
//           fId
//           topicId
//           id
//           createdAt
//           user {
//             name
//             id
//           }
//         }
//       }
//     }
//   }
// `

// export default function (prop) {
//     const io=props.query.get('id')
//     console.log(io)
//     const session = useContext(SessionContext);
//     const [pageNum, setPageNum] = useState('1');//页码
//     return (
//     <QueryRenderer
//         //环境设置
//         environment={session.environment}
//         //查询语句
//         query={query}
//         variables={{
//             id:io,
//             complainId:io,
            
//         }}
//         //查询过程
//         render={({error, props, retry}) => {
            
//             if (error) {//error
//                 return (
//                     <div>
//                         <h1>Error!</h1><br/>{error.message}
//                     </div>)
//             }else{
//                 return (
//                     <  ListDesign
//                        {...props}
                        
//                     />
//                 )
//             }
//             }
//         }  
//         />);

//     }
// function ListDesign(props) {
//     const [topicId,setTopicId]=useState(cmssData.id);
//     const [fId,setFId]=useState(cqlData.id);
//     const clickto=(com,top)=>{
//         setFId(com)
//         setTopicId(top)
//         console.log(com)
//         console.log(top)
//       }

//     let commentData=[]
//     if(props&&props.complainpool){
//       commentData=props.complainpool.commentQueryList.edges;
//       console.log(props.complainpool.commentQueryList.edges);
//     }
//     let cqlData =[];
//     if(props&&props.complainpool)
//     {
//     cqlData = props.complainpool.complainPoolQuery.comment;
//     console.log(props.complainpool.complainPoolQuery.comment);
//      }


//     return (
//         <List
//             dataSource={commentData}
//             renderItem={item1 => {
//             if(item1.fId===parseInt(cqlData.id.split("-")[1])){
//             return (
//             <List.Item
//             >
//             <div className={indexCss.fcomment} >
//                 <Row>
//                     <Col className={indexCss.fcommenter}>
//                         <span style={{fontWeight:"bold"}}>{item1.user.name}:</span>
//                         <span>{item1.commentContent}</span>
//                     </Col>
//                     </Row>
//                     <Row>
//                     <Col className={indexCss.fcommenttime}>
//                         <span>{moment(item1.createdAt).utc().add(8, 'hours').format('YYYY-MM-DD HH:mm')}</span>
//                             <span id={indexCss.flink} style={{marginLeft:"580px"}}>
//                             <Popover content={content} trigger="click" onClick={()=>{clickto(item1.id,item1.topicId)}}>
//                             <CommentOutlined/>
//                             <span style={{marginLeft:"10px"}}>回复</span>
//                             </Popover>
//                             </span>
//                     </Col>
//                 </Row>
//             </div>
//             </List.Item>
//         )
//     }}}
//     />
//     );
// }
