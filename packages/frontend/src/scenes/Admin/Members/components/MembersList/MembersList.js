/* @flow */
import React from 'react';
import styled from 'styled-components';
import type { AccountsType, AccountType } from '../../../../../types/boldr';
import MemberCard from '../MemberCard';

const MemList = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const MembersList = (props: { accounts: AccountsType, toggleUser: AccountType => AccountType }) => {
  function handleToggle(account) {
    // const userId = user.id;
    props.toggleUser(account);
  }
  return (
    <div className="boldr-members-list">
      <MemList>
        {props.accounts.map(account => (
          <MemberCard
            id={account.id}
            avatarUrl={account.profile.avatarUrl}
            email={account.email}
            roleName={account.roles[0].name}
            key={account.id}
            firstName={account.profile.firstName}
            lastName={account.profile.lastName}
            username={account.profile.username}
            handleToggle={handleToggle}
            account={account}
          />
        ))}
      </MemList>
    </div>
  );
};

export default MembersList;
