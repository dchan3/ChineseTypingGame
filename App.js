import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import PlayingField from './PlayingField.js';
import SelectScreen from './SelectScreen.js';
import Menu from './Menu.js';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.handleNormalClick = this.handleNormalClick.bind(this);
    this.handleHardClick = this.handleHardClick.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleDone = this.handleDone.bind(this);

    this.state = {
      inGame: false,
      selectScreen: false,
      mode: -1,
      words: [],
      numWords: 0,
      totalWords: 0,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    var keys = Object.keys(this.state);
    return !(keys.map((key) => this.state[key] === nextState[key]).reduce(
      (acc,cur) => acc && cur
    ));
  }

  handleNormalClick(event) {
    this.setState({ mode: 0, selectScreen: true });
  }

  handleHardClick(event) {
    this.setState({ mode: 1, selectScreen: true });
  }

  handleStartClick(file) {
    var self = this;
    new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
        xhr.onerror = reject;
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                resolve(xhr.response);
            }
        };
        xhr.open('GET', file);
        xhr.responseType = 'text'; // convert type
        xhr.send();
    }).then(function(data) {
      var words = data.match(/.{4}/g).map(
        word => String.fromCharCode(Number.parseInt(word, 16)));
      self.setState({ inGame: true, selectScreen: false, words: words,
        totalWords: words.length });
    });
  }

  handleCancelClick() {
    this.setState({ selectScreen: false, mode: -1 });
  }

  handleComplete() {
    var words = this.state.words;
    words.shift();
    this.setState({ numWords: this.state.numWords + 1, words: words });
  }

  handleDone() {
    this.setState({
      inGame: false,
      selectScreen: false,
      mode: -1,
      words: "",
      numWords: 0,
      totalWords: 0
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {!this.state.inGame ? (!this.state.selectScreen ? <Menu
          handleHardClick={this.handleHardClick}
          handleNormalClick={this.handleNormalClick}/>:
          <SelectScreen startCb={this.handleStartClick}
          cancelCb={this.handleCancelClick} />
        ) :
            <PlayingField mode={this.state.mode}
              word={this.state.words[0] || ""}
              handleComplete={this.handleComplete}
              numWords={this.state.numWords}
              totalWords={this.state.totalWords}
              handleDone={this.handleDone} />
          }
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
};
