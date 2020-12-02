import {graphql, commitMutation} from 'react-relay';

const mutation = graphql`
mutation updateBase_Mutation($content: String!, $title: String!, $annex: [complainFileInput]) {
  createComplainPool(content: $content, title: $title, annex: $annex) {
    content
    createdAt
    deletedAt
    title
    updatedAt
    userId
    id
    annexCreate {
      name
      url
    }
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
              "content":formInfo.content,
              "title":formInfo.title,
              "annex":formInfo.annex
            },
        }
    );
}

