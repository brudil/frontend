import React from 'react';
import { graphql } from 'react-apollo';
import styled from '@emotion/styled';
import gql from 'graphql-tag';
import TodaySchedule from '../components/TodaySchedule';
import keyBy from 'lodash/keyBy';
import { Flex, Box } from '@rebass/grid/emotion';
import { HomepageBlock } from '../components/ContentTypesBlock';
import { OnAirBlock } from '../components/OnAirBlock';
import Spinner from '../components/Spinner';
import { AspectRatio } from "../components/OneImage";

interface IProps {
  data: any;
}

const BlockContainer = styled.div`
  max-width: 1440px;
  padding-top: 2rem;
`;

function renderBlocks(props: IProps) {
  if (props.data.loading) {
    return <Spinner />;
  }

  if (props.data.error) {
    return <div>error</div>;
  }
  const byPosition = keyBy(props.data.homepage, 'position');

  const hasHero = byPosition.hasOwnProperty('HERO');
  const hasSecondary =
    byPosition.hasOwnProperty('SEC_1') && byPosition.hasOwnProperty('SEC_2');
  const hasThirds =
    byPosition.hasOwnProperty('THIRD_1') &&
    byPosition.hasOwnProperty('THIRD_2') &&
    byPosition.hasOwnProperty('THIRD_3');
  const hasQuarters =
    byPosition.hasOwnProperty('FOURTH_1') &&
    byPosition.hasOwnProperty('FOURTH_2') &&
    byPosition.hasOwnProperty('FOURTH_3') &&
    byPosition.hasOwnProperty('FOURTH_4');

  const gutter = 2;
  const gutterLeft = 1;

  return (
    <BlockContainer>
      {hasHero && (
        <Flex mx={-2} wrap>
          <Box width={[1, 1 / 3]} px={gutterLeft} mb={gutter}>
            <OnAirBlock />
          </Box>
          <Box width={1} px={gutterLeft} mb={gutter} flex="1 1 0">
            <HomepageBlock block={byPosition.HERO} size={1} />
          </Box>
        </Flex>
      )}
      {hasSecondary && (
        <Flex mx={-2} wrap>
          <Box width={[1, 1 / 2]} px={gutterLeft} mb={gutter}>
            <HomepageBlock block={byPosition.SEC_1} size={2} />
          </Box>
          <Box width={[1, 1 / 2]} px={gutterLeft} mb={gutter}>
            <HomepageBlock block={byPosition.SEC_2} size={2} />
          </Box>
        </Flex>
      )}
      {hasThirds && (
        <Flex mx={-2} wrap>
          <Box width={[1, 1 / 3]} px={gutterLeft} mb={gutter}>
            <HomepageBlock block={byPosition.THIRD_1} size={3} />
          </Box>
          <Box width={[1, 1 / 3]} px={gutterLeft} mb={gutter}>
            <HomepageBlock block={byPosition.THIRD_2} size={3} />
          </Box>
          <Box width={[1, 1 / 3]} px={gutterLeft} mb={gutter}>
            <HomepageBlock block={byPosition.THIRD_3} size={3} />
          </Box>
        </Flex>
      )}
      {hasQuarters && (
        <Flex mx={-2} wrap>
          <Box width={[1, 1 / 2, 1 / 4]} px={gutterLeft} mb={gutter}>
            <HomepageBlock block={byPosition.FOURTH_1} size={3} aspectRatio={AspectRatio.r1by1} />
          </Box>
          <Box width={[1, 1 / 2, 1 / 4]} px={gutterLeft} mb={gutter}>
            <HomepageBlock block={byPosition.FOURTH_2} size={3} aspectRatio={AspectRatio.r1by1} />
          </Box>
          <Box width={[1, 1 / 2, 1 / 4]} px={gutterLeft} mb={gutter}>
            <HomepageBlock block={byPosition.FOURTH_3} size={3} aspectRatio={AspectRatio.r1by1} />
          </Box>
          <Box width={[1, 1 / 2, 1 / 4]} px={gutterLeft} mb={gutter}>
            <HomepageBlock block={byPosition.FOURTH_4} size={3} aspectRatio={AspectRatio.r1by1} />
          </Box>
        </Flex>
      )}
    </BlockContainer>
  );
}

function Home(props: IProps) {
  return (
    <div>
      <div className="Container">
        {renderBlocks(props)}

        <h2>Today's schedule</h2>
      </div>
      <TodaySchedule />
      {/*<div className="Container">*/}
      {/*<h2>Feed</h2>*/}
      {/*</div>*/}
    </div>
  );
}

const HomeQuery = gql`
  query HomeQuery {
    homepage {
      position
      overrideTitle
      overrideKicker
      overrideDescription
      overrideBackgroundColor
      object {
        __typename
        ... on Show {
          id
          slug
          name
          brandColor
          shortDescription
          cover {
            resource
          }
          slots {
            day
            startTime
          }
        }
        ... on Article {
          id
          articleId
          title
          slug
          tone
          publishedAt
          shortDescription
          authors {
            name
          }
          featuredImage {
            resource
          }
        }
        ... on Event {
          id
          eventId
          title
          slug
          startDate
          shortDescription
          slug
          featuredImage {
            resource
          }
        }
      }
    }
  }
`;

interface QueryResponse {
  data: any;
}

type WrappedProps = QueryResponse & {};

export default graphql<QueryResponse, {}, WrappedProps>(HomeQuery)(Home);
