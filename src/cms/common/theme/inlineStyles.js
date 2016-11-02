const midnightBlue = '#2A3140';
const cyanLike = '#36C6D1';
const boldrPink = '#DD144D';
const grape = '#40404E';
const txtColor = 'rgba(0,0,0,.87)';

export default {
  headerOverflow: {
    backgroundColor: midnightBlue,
    paddingTop: '50px',
    marginBottom: '50px'
  },
  underlineFocusStyle: {
    borderColor: cyanLike
  },
  headerColumn: {
    color: '#B3B3B3',
    fontWeight: 'bold',
  },
  row: {
    lineHeight: 1.6,
    fontSize: 14,
  },
  rowColumn: {
    whiteSpace: 'normal',
    overFlow: 'visible',
    height: 70,
    paddingLeft: 16,
    paddingRight: 16,
  },
  floatButton: {
    position: 'fixed',
    zIndex: 100,
    bottom: '5%',
    right: '3%',
  },
  textField: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    border: 0
  },
  radio: {
    display: 'inline',
    marginTop: '20px',
    marginRight: '10px',
    float: 'right'
  }
};
