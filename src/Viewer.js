import React, { Component } from "react";
import Show from "./Show";
import "./Viewer.css";
import _ from "lodash";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

export default class Viewer extends Component {
  constructor(props) {
    super(props);
    
    const { files, types} = this.props 
    this.state = {
      currentType: types[0],
      q: _.shuffle(files[types[0]]),
      pos: 0,
      dropdown: false
    };
  }

  componentDidMount(){
    window.addEventListener('keydown', this.handleKeys)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeys)
  }

  handleKeys = e => {
    switch (e.code) {
      case "ArrowLeft":
      case "KeyA":
        return this.prev();
      case "ArrowRight":
      case "KeyD":
        return this.next();
      case "ArrowDown":
      case "KeyS":
        return this.shuffle();
      default:
        return;
    }
  }

  next = () => {
    const { pos, q } = this.state;
    this.setState({ pos: Math.min(pos + 1, q.length - 1) });
  };

  prev = () => {
    const { pos } = this.state;
    this.setState({ pos: Math.max(pos - 1, 0) });
  };

  shuffle = () => {
    this.setState({ pos: 0, q: _.shuffle(this.state.q) });
  };

  toggle = () => {
    this.setState({ dropdown: !this.state.dropdown });
  }

  select = (event) => {
    const selected = event.target.innerText
    this.setState({
        currentType: selected,
        q: _.shuffle(this.props.files[selected]),
        pos: 0
    })
}

  render() {
    const { q, pos, dropdown, currentType } = this.state;
    const { types } =  this.props
    let dropItems = []
    for (let key in types) {
      dropItems.push(<DropdownItem key={key} onClick={this.select}>{types[key]}</DropdownItem>)
    }
    return (
      <div className="viewer-container">
        <div className="button-container">
          <button disabled={pos === 0} onClick={this.prev}>
            <FaCaretLeft size={40} color='#f8f9fa'/>
          </button>
          <button onClick={this.shuffle}>Shuffle</button>
          <ButtonDropdown isOpen={dropdown} toggle={this.toggle}>
            <DropdownToggle caret color="black">
              {currentType}
            </DropdownToggle>
            <DropdownMenu>
              {dropItems}
            </DropdownMenu>
          </ButtonDropdown>
          <button disabled={pos === q.length - 1} onClick={this.next}>
            <FaCaretRight size={40} color='#f8f9fa'/>
          </button>
        </div>
        <div className="item-container">
          <Show key={q[pos]} link={q[pos]} />
        </div>
      </div>
    );
  }
}
