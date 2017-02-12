const requiredParam = (name) => {
  throw new Error(`Missing paramater ${name}`);
};

export default requiredParam;
