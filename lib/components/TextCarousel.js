import React, { Component } from "react";
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";
import Typist from "react-typist";
import assign from "lodash/assign";
import get from "lodash/get";

class TextCarousel extends Component {
  static propTypes = {
    phrases: PropTypes.arrayOf(PropTypes.string).isRequired,
    interval: PropTypes.number,
    typistProps: PropTypes.object,
    loopPhrases: PropTypes.bool
  }

  static defaultProps = {
    interval: 2000,
    typistProps: {},
    loopPhrases: true
  }

  state = {
    currentPhraseIndex: 0
  }

  componentDidMount = () => {
    this.renderWord();
  };

  componentWillUnmount = () => {
    clearTimeout(this.timer);
  }

  setNextPhrase = () => {
    const { phrases } = this.props;
    const { currentPhraseIndex } = this.state;

    if(!this.props.loopPhrases && (currentPhraseIndex + 1 == phrases.length)) clearTimeout(this.timer);

    this.setState({
      currentPhraseIndex: this.props.loopPhrases ? (currentPhraseIndex + 1) % phrases.length : currentPhraseIndex + 1,
    });
  }

  handleTypingComplete = () => {
    // Need the delay since typist triggers typingComplete before that happens
    const cursorHideDelay = get(this.props.typistProps, 'cursor.hideWhenDoneDelay', 0);

    if (this.props.loopPhrases) {
      this.timer = setTimeout(() => {
        this.renderWord();
      }, this.props.interval + cursorHideDelay);
    } else if (this.state.currentPhraseIndex != this.props.phrases.length) {
      this.timer = setTimeout(() => {
        this.renderWord();
      }, this.props.interval + cursorHideDelay);
    }
  }

  getCurrentPhrase = () => this.props.phrases[this.state.currentPhraseIndex];

  renderWord = () => {
    const domNode = this.refs.phraseContainer;
    const typistProps = assign({}, this.props.typistProps, {
      onTypingDone: this.handleTypingComplete,
    });

    ReactDOM.unmountComponentAtNode(domNode);
    ReactDOM.render(
      <Typist {...typistProps}>{this.getCurrentPhrase()}</Typist>,
      domNode
    );

    this.setNextPhrase();
  }

  render = () => {
    const customClass = this.props.className || "";

    return (
      <span className={`textCarouselContainer ${customClass}`} ref="phraseContainer" />
    );
  }
}

export default TextCarousel;
