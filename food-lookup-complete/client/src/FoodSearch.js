
import React from 'react';
import Client from './Client';

//max number of search results, scroll to input
const MATCHING_ITEM_LIMIT = 25;

class FoodSearch extends React.Component {
  state = {
    foods: [],
    showRemoveIcon: false,
    searchValue: '',
  };
//value comes from event object(searchValue in input)
  onSearchChange = (e) => {
    const value = e.target.value;

    this.setState({
      searchValue: value,
    });
//if blank value, blank array
    if (value === '') {
      this.setState({
        foods: [],
    //no icon removal(x)
        showRemoveIcon: false,
      });
    } else {
  //if not, icon removed, call server with list
      this.setState({
        showRemoveIcon: true,
      });
//Client.search requests array of matching foods-scroll in render(onClick)
      Client.search(value, (foods) => {
        this.setState({
//no matching items
          foods: foods.slice(0, MATCHING_ITEM_LIMIT),
        });
      });
    }
  };
//reset everything
  onRemoveIconClick = () => {
    this.setState({
      foods: [],
      showRemoveIcon: false,
      searchValue: '',
    });
  };
//check <tbody>. User clicks food item and is added to list
//prop function onFoodClick() specified in parent (App)
  render() {
    return (
      <div id='food-search'>
        <table className='ui selectable structured large table'>
          <thead>
            <tr>
              <th colSpan='5'>
                <div className='ui fluid search'>
                  <div className='ui icon input'>
                   <input
                      className='prompt'
                      type='text'
                      placeholder='Search foods...'
                      value={this.state.searchValue}
                      onChange={this.onSearchChange}
                    />
                    <i className='search icon' />
                  </div>
                  {
                    this.state.showRemoveIcon ? (
                      <i
                        className='remove icon'
                        onClick={this.onRemoveIconClick}
                      />
                    ) : ''
                  }
                </div>
              </th>
            </tr>
            <tr>
              <th className='eight wide'>Description</th>
              <th>Kcal</th>
              <th>Protein (g)</th>
              <th>Fat (g)</th>
              <th>Carbs (g)</th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.foods.map((food, idx) => (
              <tr
                key={idx}
                onClick={() => this.props.onFoodClick(food)}
              >
                <td>{food.description}</td>
                <td className='right aligned'>
                  {food.kcal}
                </td>
                <td className='right aligned'>
                  {food.protein_g}
                </td>
                <td className='right aligned'>
                  {food.fat_g}
                </td>
                <td className='right aligned'>
                  {food.carbohydrate_g}
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default FoodSearch;
