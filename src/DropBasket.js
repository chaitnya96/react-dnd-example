import React from 'react'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd';
import ItemDrag from './draggebleItem'
import itemType from './itemType'

class DropBasket extends React.Component {
    state={
        item:''
    }
    componentWillReceiveProps(nextState){
        this.setState({
            item : nextState.item
        },console.log(this.state))
    }
    handleDrop = item1 => {
       console.log(item1)
      }
    render() {
        const { connectDropTarget, hovered, item, isOver, canDrop, name } = this.props;
        const backgroundColor = isOver && canDrop ? 'yellow' : !isOver && canDrop ? '#f5f5f5ba' : 'white'
        return (
            connectDropTarget(
                <div name={name} style={{ border: '1px solid black', padding: '20px', minHeight:'100px',  background: backgroundColor }}>
                    {this.state.item ? this.state.item.map((item,index) => <ItemDrag key={index} text={item} handleDrop={this.handleDrop} />) : null}
                </div>
            )
        )
    }
}

const spec = {
    drop: (props, monitor) => {
        console.log(props.name, monitor.getItem())
        return props.onDrop(props.name, monitor.getItem())
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    }
}

export default DropTarget(itemType.ITEM, spec, collect)(DropBasket);