const fakeNotifs = [
  {
    id: 1,
    message: 'There was a problem uploading.',
    kind: 'error',
    dismissAfter: 3000,
  },
  {
    id: 2,
    message: 'Upload success!',
    kind: 'success',
    dismissAfter: 3000,
  },
  {
    id: 3,
    message: 'Removed file',
    kind: 'success',
    dismissAfter: 3000,
  },
];

const fakeNotif = {
  id: 1,
  message: 'There was a problem uploading.',
  kind: 'error',
  dismissAfter: 3000,
};

export default fakeNotifs;
export { fakeNotif };
