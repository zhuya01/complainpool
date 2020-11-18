import {graphql, commitMutation} from 'react-relay';

const mutation = graphql`
mutation updateBase_Mutation(
   $content: String!, 
   $title: String!) {
  createComplainPool(
    content: $content, 
    title: $title) {
    content
    createdAt
    deletedAt
    id
    title
    updatedAt
  }
}

`;

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
              "complainContentType":formInfo.complainContentType,
              "complainId":formInfo.complainId,
              "content":formInfo.content,
              "title":formInfo.title
            },
        }
    );
}

