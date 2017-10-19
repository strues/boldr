/* @flow */
import React from 'react';
import styled from 'styled-components';
import Link from 'react-router-dom/Link';

export type Props = {
  firstName: string,
  avatarUrl: string,
  lastName: string,
  bio: string,
  username: string,
};

const AFooter = styled.footer`
  @media (min-width: 700px) {
    padding: 70px 100px 0;
  }
`;

const AuthorCardLink = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 15px;
  border-radius: 50%;
`;

const AuthorCardContent = styled.section``;

const AuthorName = styled.h4`
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  margin: 0 0 5px;
`;

const AuthorBio = styled.p`
  margin: 0;
  color: #738a94;
  font-size: 13px;
  line-height: 18px;
  font-weight: 300;
  @media (min-width: 700px) {
    font-size: 18px;
    line-height: 22px;
  }
`;
const ArticleFooter = ({ avatarUrl, firstName, lastName, username, bio }: Props) => {
  return (
    <AFooter>
      <AuthorCardLink>
        <AuthorImage src={avatarUrl} />
        <AuthorCardContent>
          <AuthorName>
            <Link to={`/profiles/${username}`}>
              {firstName} {lastName}
            </Link>
          </AuthorName>
          <AuthorBio>{bio}</AuthorBio>
        </AuthorCardContent>
      </AuthorCardLink>
    </AFooter>
  );
};

export default ArticleFooter;
