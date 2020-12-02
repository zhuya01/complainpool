import {graphql, commitMutation} from 'react-relay';

const mutation = graphql`
mutation updateComplain_Mutation(
  $commentContent:String!,
  $fId:ID,
  $topicId:ID
  ) {
    createComment(commentContent: $commentContent,fId: $fId, 
        topicId:$topicId) {
        commentContent
        createdAt
        fId
        id
        topicId
        user {
          id
          name
        }
      }
}

`

export default function updateBase(
    id,
    formInfo,
    environment,
    onCompleted,
    onError,
) {
    return commitMutation(environment, {
            mutation,
            onCompleted: onCompleted,
            onError: onError,
            variables: {
              "commentContent":formInfo.commentContent,
              "fId":formInfo.fId,
              "topicId":formInfo.topicId
            },
        }
    );
}

