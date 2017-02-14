/* @flow */
import React from 'react';

type Props = {
  atype: Number,
};

const ActivityItemDetail = (props: Props) => {
  const createdType = props.atype === 1;
  const updatedType = props.atype === 2;
  const deletedType = props.atype === 3;
  const registeredType = props.atype === 4;
  if (createdType) {
    return (
      <span>added</span>
    );
  }
  if (updatedType) {
    return (
      <span>updated</span>
    );
  }
  if (deletedType) {
    return (
      <span>removed</span>
    );
  }
  if (registeredType) {
    return (
      <span>registered</span>
    );
  }
};

export default ActivityItemDetail;
