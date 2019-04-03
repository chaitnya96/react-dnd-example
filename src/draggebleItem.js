import React from 'react'
import { DragSource } from 'react-dnd';
import './App.css'
import { Segment } from 'semantic-ui-react';
import itemType from './itemType'

class ItemDrag extends React.Component {
    render() {
        const { isDragging, dragSource, text } = this.props
        const opacity = isDragging ? 0 : 1
        return (
                dragSource(<div style={{margin : '5px'}}>
                    <Segment key={text.name} as='label' style={{ 'opacity': opacity,display: 'inherit' }} content={text.name} />
                </div>)
        )
    }
}

const cardSource = {
    beginDrag: props => props.text,


    endDrag(props, monitor, component) {
        console.log(props.text)
        if (!monitor.didDrop()) {
          return;
        }
    
        return props.handleDrop(props.text);
      }
    
    // props.endDrag({text : props.text}) : null
    // endDrag :(props, monitor, component)=>{
    //    return monitor.didDrop() ? props.endDrag({text : props.text}) : null
    // }
}

function collect(connect, monitor) {
    return {
        dragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}

export default DragSource(itemType.ITEM, cardSource, collect)(ItemDrag)