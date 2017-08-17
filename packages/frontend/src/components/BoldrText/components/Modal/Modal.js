import React from 'react';
import ReactDOM from 'react-dom';
import hasWindow from '@boldr/utils/lib/dom/hasWindow';
import hasDocument from '@boldr/utils/lib/dom/hasDocument';
import { UniqueIndex } from '../../utils/base';

let $;
if (!__SERVER__) {
  $ = window.$ || document.querySelector.bind(document);
}

export default class Modal extends React.Component {
  componentId = 'BE-modal__' + UniqueIndex();
  rootElement = $('#' + this.componentId);
  state = {
    visible: false,
  };

  componentDidMount() {
    if (this.props.visible) {
      this.setState({
        visible: true,
      });
    }

    if (hasDocument && !this.rootElement) {
      this.rootElement = document.createElement('div');
      this.rootElement.id = this.componentId;
      this.rootElement.className = 'be-modal__root';
      document.body.appendChild(this.rootElement);
    }
  }

  componentWillReceiveProps(next) {
    if (this.props.visible && !next.visible) {
      this.unrenderComponent();
    } else if (this.props.visible || next.visible) {
      this.renderComponent(next);
    }
  }

  render() {
    return null;
  }

  handleTransitionEnd = () => {
    if (!this.rootElement.classList.contains('active')) {
      ReactDOM.unmountComponentAtNode(this.rootElement);
    }
  };

  unrenderComponent() {
    this.rootElement.classList.remove('active');
  }

  renderComponent(props) {
    const {
      title,
      className,
      width,
      height,
      children,
      confirmable,
      showCancel,
      showClose,
      bottomText,
      language,
    } = props;
    const childComponent = (
      <div className={'be-modal ' + (className || '')}>
        <div className="be-modal__mask" />
        <div
          onTransitionEnd={this.handleTransitionEnd}
          style={{ width, height }}
          className="be-modal__content"
        >
          <div className="be-modal__header">
            <h3 className="be-modal__caption">
              {title}
            </h3>
            {showClose &&
              <button onClick={this.close} className="be-modal__close-button">
                <i className="icon-close" />
              </button>}
          </div>
          <div className="be-modal__body">
            {children}
          </div>
          <div className="be-modal__footer">
            <div className="be-modal__addon-text">
              {bottomText}
            </div>
            <div className="be-modal__buttons">
              {showCancel &&
                <button onClick={this.handleCancel} className="be-modal__cancel">
                  {language.base.cancel}
                </button>}
              <button
                onClick={this.handleConfirm}
                className={'be-modal__confirm ' + (!confirmable ? 'disabled' : '')}
              >
                {language.base.confirm}
              </button>
            </div>
          </div>
        </div>
      </div>
    );

    ReactDOM.render(childComponent, this.rootElement);
    setImmediate(() => {
      this.rootElement.classList.add('active');
    });
  }

  handleCancel = () => {
    this.props.onCancel && this.props.onCancel();
  };

  handleConfirm = () => {
    this.props.onConfirm && this.props.onConfirm();
  };

  close = () => {
    this.props.onClose && this.props.onClose();
  };
}
