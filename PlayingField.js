import React, { Component }  from 'react';
import { Text, TextInput, Button } from 'react-native';

const styles = {
  currentWord: {
    fontSize: 72,
    textAlign: 'center'
  },
  textBox: {
    fontSize: 36,
    borderColor: 'gray',
    borderWidth: 1
  },
  stats: {
    textAlign: 'center',
    fontSize: 24
  }
};

export default class PlayingField extends Component {
  constructor(props) {
    super(props);

    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleDone = this.handleDone.bind(this);

    this.state = {
      value: ''
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    var keys = Object.keys(this.state), keys2 = Object.keys(this.props);
    return !(keys.map((key) => this.state[key] === nextState[key]).reduce(
      (acc, cur) => acc && cur
    )) || !(keys2.map((key) => this.props[key] === nextProps[key]).reduce(
      (acc, cur) => acc && cur
    ));
  }

  handleChangeText(val) {
    if (val.length > 0 && val === this.props.word) {
      this.props.handleComplete();
      this.setState({ value: '', wrong: false });
    }
    else this.setState({ value: val });
  }

  handleDone() {
    this.props.handleDone();
  }

  render() {
    return [
      <Text style={styles.currentWord}>
        {this.props.mode === 1 ? "?" : this.props.word}</Text>,
      <TextInput maxLength={5} style={styles.textBox}
        onChangeText={this.handleChangeText} value={this.state.value}/>,
      <Text style={styles.stats}>
        {`${this.props.totalWords}分之${this.props.numWords}個字完成 ${Math.floor(
          this.props.numWords / this.props.totalWords * 100).toString()}%`}</Text>,
      this.props.word === "" ? <Button title="完成" color="green"
        onPress={this.handleDone} /> :
          <Button title="放棄" color="red" onPress={this.handleDone} />
    ];
  }
}
