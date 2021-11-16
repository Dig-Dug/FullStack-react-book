import React from 'react';

class App extends React.Component {
  //2 state properties
  state = {
    //items is tied to control input, check render
    items: [],
    item: '',
  };

  onItemChange = (e) => {
    this.setState({
      item: e.target.value,
    });
  };
//onSubmit called from form, adding new items
  addItem = (e) => {
    e.preventDefault();

    this.setState({
      items: this.state.items.concat(
        this.state.item
      ),
      item: '',
    });
  };

  render() {
    const submitDisabled = !this.state.item;
    return(
      <div
        className='ui text container'
        id='app'
      >
        <table className='ui selectable structured large table'>
          <thead>
            <tr>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            { //iteration over this.state.items to see all items
           
              this.state.items.map((item, idx) => (
                <tr
                  key={idx}
                >
                  <td>{item}</td>
                </tr>
              ))
            }
          </tbody>
          <tfoot>
            <tr>
              <th>
                {/* control input inside a form*/}
                <form
                  className='ui form'
                  onSubmit={this.addItem}
                >
                <div className='field'>
                  <input
                    className='prompt'
                    type='text'
                    placeholder='Add item...'
                    value={this.state.item}
                    onChange={this.onItemChange}
                  />
                </div>
                <button
                  className='ui button'
                  type='submit'
                  disabled={submitDisabled}
                >
                  Add item
                </button>
                </form>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
}

export default App;
