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
const Page = (props) => {
  return (
    <div>
    <Link to={ `/dashboard/pages/builder/${props.name}` }>{ props.name }</Link>
    </div>
  );
};

export default Page;
