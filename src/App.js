import React, { Component } from 'react';
import ItemDrag from './draggebleItem'
import { DragDropContext } from 'react-dnd';
import MultiBackend, { TouchTransition } from 'react-dnd-multi-backend'
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import Preview from 'react-dnd-preview'
import { Grid, GridColumn, Container, Header, Segment } from 'semantic-ui-react';
import DropBasket from './DropBasket'
class App extends Component {
  constructor() {
    super()
    this.state = {
      item: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
        { id: 4, name: 'Item 4' }
      ],
      Baskets: {
        'b1': [],
        'b2': []
      }
    }

    this.Answer = {}
  }

  previewGenerator(itemType, item, style) {
    return <div as='h1' style={style}>{item.text}</div>
  }

  onBasket = (value) => {
    console.log(value)
  }
  onDrop = (name, item) => {
    this.Answer = this.state.Baskets;
    this.Answer[name] !== undefined ? this.Answer[name].push(item) : this.Answer[name] = [item]
    console.log(this.Answer)
  }
  handleDrop = item1 => {
    this.setState(prevState => {
      return {
        item: prevState.item.filter(item => item.id !== item1.id)
      }
    })
  }
  render() {
    return (
      <Container>

        <Grid columns={3}>
          <Grid.Column>
            {
              this.state.item.map(data => <ItemDrag key={data.id} text={data} handleDrop={this.handleDrop} />)
            }
          </Grid.Column>
          {
            Object.keys(this.state.Baskets).map(
              basket => <Grid.Column key={basket}>
                <DropBasket name={basket} onBasket={this.onBasket} onDrop={this.onDrop} item={this.state.Baskets[basket]} handleDrop={this.handleDrop} />  {/* item={this.state.Baskets[basket]} */}
              </Grid.Column>
            )

          }

          <Preview generator={this.previewGenerator} />
        </Grid>
      </Container>
    );
  }
}

const HTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend
    },
    {
      backend: TouchBackend({ enableMouseEvents: true }), // Note that you can call your backends with options
      preview: true,
      transition: TouchTransition
    }
  ]
};


export default DragDropContext(MultiBackend(HTML5toTouch))(App)
