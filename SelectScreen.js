import React, { Component }  from 'react';
import { Picker, Button } from 'react-native';
import parser from 'fast-xml-parser';

const styles = {
  pickerStyle: {
    fontSize: 36,
    height: 50,
    width: 100
  }
};

export default class SelectScreen extends Component {
  constructor(props) {
    super(props);

    this.startCb = this.startCb.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);

    this.state = {
      activeValue: '',
      choices: []
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    var keys = Object.keys(this.state);
    return !(keys.map((key) => this.state[key] === nextState[key]).reduce(
      (acc,cur) => acc && cur
    ));
  }

  componentDidMount() {
    var self = this;

    new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
        xhr.onerror = reject;
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            resolve(xhr.response);
          }
        };
        xhr.open('GET', 'http://s3.us-west-1.amazonaws.com/chinese-typing-game/');
        xhr.responseType = 'text'; // convert type
        xhr.send();
    }).then(function(data) {
      var ls = parser.parse(data).ListBucketResult.Contents.filter((node) => node.Size > 0).map(function(node) {
        return {
          name: node.Key.split('/').slice(-1)[0].replace('.txt', ''),
          path: 'http://s3.us-west-1.amazonaws.com/chinese-typing-game/' + node.Key
        };
      });
      self.setState({
        choices: ls,
        activeValue: ls[0].path
      });
    });
  }

  startCb() {
    this.props.startCb(this.state.activeValue);
  }

  handleValueChange(itemValue, itemIndex) {
    this.setState({ activeValue: itemValue });
  }

  render() {
    return [<Picker selectedValue={this.state.activeValue}
        style={styles.pickerStyle}
      onValueChange={this.handleValueChange}>
      {this.state.choices ? this.state.choices.map(function(choice) {
        return <Picker.Item label={choice.name} value={choice.path} />
      }) : <Picker.Item label={"Loading"} disabled={true} />}
      </Picker>,
      <Button title="開始" color="green" onPress={this.startCb}/>];
  }
}
