/* @flow */
import React from 'react';
import Link from 'react-router/lib/Link';
/*
      Fields
      Name<br />
      URL<br />
      Layout<br />
      Meta<br />
      data<br />
      status<br />
      restricted
 */
const Page = (props: { label: any, name: String }) => {
  const pageLabel = props.label;
  return (
    <div>
    <Link to={ `/dashboard/pages/builder/${pageLabel}` }>{ props.name }</Link>
    </div>
  );
};

export default Page;
