import React from 'react';
import cx from 'classnames';
import Color from 'color';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Image from '../components/Image';
import { formatTime, parseTime } from '../utils/schedule';
import { Helmet } from 'react-helmet';
import styled from "react-emotion";
import {NavLink} from "react-router-dom";
import {format} from "date-fns";
import {queries} from "../css/mq";

// TODO: move to a utils thing or i18n file
const DAYS_TEXT = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const ShowMain = styled.div`
  ${queries.large`
    display: flex;
  `}
`;

const ShowSidebar = styled.div`
  ${queries.large`
    width: calc(200px + 2rem);
    flex: none;
  `}
`;

const ShowMenu = styled.ul`
  list-style: none;
  
  ${queries.large`
    padding-left: calc(200px + 2rem);
    margin-bottom: 2rem;
  `}
  
  & li {
    display: inline-block;
    margin-right: 1rem;
  }
  
  & a {
    color: #6d6d6d;
    text-decoration: none;
    font-size: 1.2rem;
  }
  
  & a.active {
    text-decoration: underline;
  }
`;

interface IProps {
  data?: any;
}

function ShowBase(props: IProps) {
  const { data: { show, loading } } = props;

  if (loading) {
    return (
      <div>
        <div className={cx('ShowHeader', 'ShowHeader--loading')}>
          <div className="Container">
            <div className="ShowHeader__container">
              <div className="ShowHeader__cover" />
              <div className="ShowHeader__info" />
            </div>
          </div>
        </div>
        <div className="Container" />
      </div>
    );
  }

  const bgColor = Color(`#${show.brandColor}`)
    .desaturate(0.1)
    .lighten(0.1)
    .rgb();

  return (
    <div>
      <Helmet>
        <title>{show.name}</title>
      </Helmet>
      <div
        className={cx(
          'ShowHeader',
          `ShowHeader--tone-${bgColor.light() ? 'dark' : 'light'}`
        )}
        style={{
          backgroundColor: bgColor.string(),
        }}
      >
        <div className="Container">
          <div className="ShowHeader__container">
            <div className="ShowHeader__cover">
              <Image src={show.cover.resource} width={400} height={400} />
            </div>
            <div className="ShowHeader__info">
              <h1 className="ShowHeader__show-title">{show.name}</h1>
              <span className="ShowHeader__schedule-times">
                {show.slots.map((slot: any) => (
                  <span>
                    {DAYS_TEXT[slot.day]}s at{' '}
                    {formatTime(parseTime(slot.startTime))}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="Container">
        <ShowMenu>
          <li>
            <NavLink to={`/shows/${show.slug}/`}>About</NavLink>
          </li>
          <li>
            {show.socialMixcloudHandle && <a href={`https://mixcloud.com/${show.socialMixcloudHandle}`}>Listen back on Mixcloud</a>}
          </li>
        </ShowMenu>
      </div>
      <div className="Container">
        <ShowMain>
          <ShowSidebar>
            <ul>
              <li>
                Est. {format(new Date(show.createdAt), 'MMM YYYY')}
              </li>
            </ul>
          </ShowSidebar>
          <div className="ShowHeader__short-description">
            {show.longDescription}
          </div>
        </ShowMain>
      </div>
    </div>
  );
}

const ShowBaseQuery = gql`
  query ShowBaseQuery($showSlug: String) {
    show(slug: $showSlug) {
      id
      name
      slug
      shortDescription
      longDescription
      brandColor
      socialMixcloudHandle
      createdAt
      cover {
        resource
      }
      cover {
        resource
      }
      slots {
        startTime
        day
      }
    }
  }
`;

export default graphql(ShowBaseQuery, {
  options: (props: any) => ({
    variables: {
      showSlug: props.match.params.showSlug,
    },
  }),
})(ShowBase);
