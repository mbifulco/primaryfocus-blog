import { Wrap, Stack } from '@chakra-ui/react';

import { ArticleListItem } from './ArticleListItem';

const ArticleList = ({ articles }) => {
  return (
    <Stack spacing={6}>
      {articles.length > 0 && (
        <>
          <Wrap spacing="30px" marginTop="5">
            {articles.map((article) => {
              return (
                <ArticleListItem {...article} key={article?.slug?.current} />
              );
            })}
          </Wrap>
        </>
      )}
    </Stack>
  );
};

export default ArticleList;
