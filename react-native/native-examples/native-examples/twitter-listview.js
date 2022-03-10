import React, { PropTypes, Component } from 'react';
import { View, Text, ScrollView, Image, ListView } from 'react-native';

class Feed extends Component {
  static props = {
    tweets: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      user_id: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      numberOfFavorites: PropTypes.number.isRequired,
      numberOfRetweets: PropTypes.number.isRequired,
    })).isRequired,
  }

  constructor(props) {
    super(props);
// passing object(rowHasChanged) with a function ListView to see
// if list needs to be re rendered
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
//DataSource intancing with data. cloneWithRows(set or update data
//kept internally by ListView.DataSource instance) used too down
    this.state = { //instance is immutable, if change needed
      //cos of constant updating make a
      //copy nad use it in cloneWithRows function.
      dataSource: this.ds.cloneWithRows(this.props.tweets),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tweets !== this.props.tweets) {
      this.setState({
        //cloneWithRows needed here to update tweets via ListView
        dataSource: this.ds.cloneWithRows(nextProps.tweets),
      });
    }
  }
  //mapping in jsx´s way, renderRow function for every tweet from dataSource
  //renderRow is a ListView property, others are renderSeparator(), renderHeader(), renderFooter()
  renderRow = ({ tweet }) => {
    return (
      <View>
        <View>
          <Image src={tweet.avatar} />
          <Text>{tweet.name}</Text>
        </View>
        <Text>{tweet.text}</Text>
        <View>
          <Text>Favs: {tweet.numberOfFavorites}</Text>
          <Text>RTs: {tweet.numberOfRetweets}</Text>
        </View>
      </View>
    );
  }
  render() {
    return (
      <ListView
        renderRow={this.renderRow} 
        dataSource={this.state.dataSource}
      />
    );
  }
}
