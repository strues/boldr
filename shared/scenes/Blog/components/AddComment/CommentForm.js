/* @flow */
import React from 'react';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons';

type State = {
  value: any,
};
type Props = {
  id: Number,
  value: any,
  dispatch: Function,
  handleChange: Function,
  handleSubmit: Function,
};
class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };

    (this: any).handleChange = this.handleChange.bind(this);
    (this: any).handleSubmit = this.handleSubmit.bind(this);
  }
  state: State;
  handleSubmit(event) {
    const payload = {
      id: this.props.id,
      value: this.state.value,
    };

    // this.props.dispatch(updateBoldrSettings(payload));
    event.preventDefault();
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  props: Props;
  render() {
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
            <TextField
              style={ { width: '400px' } }
              id="floatingTitle"
              label="Logo"
              placeholder={ this.state.value }
              value={ this.state.value }
              onChange={ this.handleChange }
            />
            <Button type="submit" primary raised label="Comment" />
      </form>
      </div>
    );
  }
}

export default CommentForm;
