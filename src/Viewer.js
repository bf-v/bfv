import React, { Component } from "react";
import Show from "./Show";
import "./Viewer.css";
import _ from "lodash";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup } from "reactstrap";
import { FaCaretLeft, FaCaretRight, FaStarOfLife } from "react-icons/fa";


export default class Viewer extends Component {
  constructor(props) {
    super(props);
    
    const { content, types} = this.props;

    this.state = {
      currentType: types[0],
      q: _.shuffle(content[types[0]]),
      pos: 0,
      dropdown: false,
      WindowWidth: window.innerWidth,
      isMobile: window.innerWidth <= 600,
      dropItems: this.createDropItems(),
      ButtonIconSize: 40 
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.types !== prevProps.types) {
      this.setState({dropItems: this.createDropItems()})
    }
  }

  createDropItems = () => {
    const { types } = this.props
    let dropItems = [];
    for (let key in types) {
      dropItems.push(<DropdownItem key={key} onClick={this.select}>{types[key]}</DropdownItem>)
    }
    return dropItems

  }

  componentDidMount(){
    window.addEventListener('keydown', this.handleKeys);
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeys);
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleKeys = e => {
    switch (e.code) {
      case "ArrowLeft":
      case "KeyA":
        return this.prev();
      case "ArrowRight":
      case "KeyD":
        return this.next();
      default:
        return;
    }
  };

  next = () => {
   const { pos, q } = this.state
    this.setState({
      pos: Math.min(pos + 1, q.length - 1)
    });
  };

  prev = () => {
    const { pos } = this.state;
    this.setState({ pos: Math.max(pos - 1, 0) });
  };


  toggle = () => {
    this.setState({ dropdown: !this.state.dropdown });
  }

  select = (event) => {
    const selected = event.target.innerText
    this.setState({
        currentType: selected,
        q: _.shuffle(this.props.content[selected]),
        pos: 0
    })
  }

  handleWindowSizeChange = () => {
    this.setState({ 
      WindowWidth: window.innerWidth,
      isMobile : this.state.WindowWidth <= 600
    });
  }

  renderButtonDropDown = () => {
    const { dropdown, currentType, dropItems, isMobile } = this.state;
    let toggle = isMobile ? <FaStarOfLife size={this.state.ButtonIconSize} color='#f8f9fa'/> : currentType
    return (
      <ButtonDropdown className="dropdown-selector" isOpen={dropdown} toggle={this.toggle}>
        <DropdownToggle color="black" caret={!isMobile}>
          {toggle}
        </DropdownToggle>
        <DropdownMenu>
          {dropItems}
        </DropdownMenu>
      </ButtonDropdown>)
    }

  renderButtonBar = () => {
    const { q, pos, isMobile } = this.state;
    return <ButtonGroup vertical={isMobile} block className="button-container">
      <button disabled={pos === 0} onClick={this.prev}>
        <FaCaretLeft size={this.state.ButtonIconSize} color='#f8f9fa'/>
      </button>
      { this.renderButtonDropDown() }
      <button disabled={pos === q.length - 1} onClick={this.next}>
        <FaCaretRight size={this.state.ButtonIconSize} color='#f8f9fa'/>
      </button>
    </ButtonGroup>
  }

  render() {
    const { pos, q, currentType } = this.state;

    return (
      <div className="viewer-container">
        { this.renderButtonBar() }
        <Show link={[currentType, q[pos]]} />
      </div>
    );
  }
}
