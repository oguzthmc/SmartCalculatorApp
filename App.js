// Mobil Uygulama Geliştirme - Proje
// Smart Calculator App
// Oğuzhan Tohumcu - B181210397

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      resultText: '',
      calculationText: '',
    };
    this.operations = ['DEL', '+', '-', '*', '/'];
  }

  calculateResult() {
    const text = this.state.resultText;
    // şimdi gelen text'i parse edelim - 3+3*6^5/2+7
    // parantez -> bölme -> çarpma -> toplama -> çıkarma
    this.setState({
      calculationText: eval(text),
    });
  }

  validate() {
    const text = this.state.resultText;
    switch (text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false;
    }
    return true;
  }

  buttonPressed(text) {
    if (text == '=') {
      return this.validate() && this.calculateResult();
    }

    this.setState({
      resultText: this.state.resultText + text,
    });
  }

  operate(operation) {
    switch (operation) {
      case 'DEL':
        let text = this.state.resultText.split('');
        text.pop();
        this.setState({
          resultText: text.join(''),
        });
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar = this.state.resultText.split('').pop();

        if (this.operations.indexOf(lastChar) > 0) return;

        if (this.state.text == '') return;
        this.setState({
          resultText: this.state.resultText + operation,
        });
        break;
    }
  }

  render() {
    let rows = [];
    let nums = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      ['.', 0, '='],
    ];
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity
            key={nums[i][j]}
            onPress={() => this.buttonPressed(nums[i][j])}
            style={styles.btn}>
            <Text style={styles.btntext}>{nums[i][j]}</Text>
          </TouchableOpacity>
        );
      }
      rows.push(<View key={i} style={styles.row}>{row}</View>);
    }

    let ops = [];
    for (let i = 0; i < 5; i++) {
      ops.push(
        <TouchableOpacity
          key={this.operations[i]}
          style={styles.btn}
          onPress={() => this.operate(this.operations[i])}>
          <Text style={[styles.btntext, styles.opsColor]}>
            {this.operations[i]}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>
            {this.state.calculationText}
          </Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>{rows}</View>
          <View style={styles.operations}>{ops}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultText: {
    fontSize: 30,
    color: '#003f72',
  },
  btntext: {
    fontSize: 32,
    color: '#00d8ff',
  },
  opsColor: {
    color: '#006099',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  calculationText: {
    fontSize: 24,
    color: '#003f72',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  result: {
    flex: 2,
    backgroundColor: '#00fff6',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  calculation: {
    flex: 1,
    backgroundColor: '#00fff6',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  buttons: {
    flexGrow: 7,
    flexDirection: 'row',
  },
  numbers: {
    flex: 3,
    backgroundColor: '#006099',
  },
  operations: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: '#00d8ff',
  },
});
