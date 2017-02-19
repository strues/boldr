/* @flow */
import React from 'react';

type Props = {
  atype: Number,
};

const ActivityItemDetail = (props: Props) => {
  const createdType = props.atype === 'create';
  const updatedType = props.atype === 'update';
  const deletedType = props.atype === 'delete';
  const registeredType = props.atype === 'register';
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
