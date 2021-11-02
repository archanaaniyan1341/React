import React, { Component } from 'react';
class Counting extends Component {
    
    state={
        count:0,
        list:["aA","bB","cC"]
    }
    styles={
        fontSize:40,
        fontWeight:"bold"
    }
    render() { 
        return (
            <React.Fragment>
            <span style={this.styles} className={this.getClassColor()}>{this.countValue()}</span>
            <button style={{ fontSize:40}} className="btn btn-secondary btn-sm ">Increment</button>
          {/* boolean+string=string output */}
          {this.state.list.length===0&&"no items in list"}
           {this.renderTags()}
        </React.Fragment>
        )
        
    }
    countValue(){
        const {count}=this.state;
        return count===0?"Zero":count;
    }
    getClassColor(){
        let classes="badge mr-1 badge-"
        classes+=this.state.count===0?"warning":"primary"
        return classes
    }
    renderTags(){
        if (this.state.list.length===0) return "nothing to display";
        return <ul> {this.state.list.map(tag=><li key={tag}>{tag}</li>)}  </ul>
    }
}
 
export default Counting;