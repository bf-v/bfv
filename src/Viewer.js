import React, { Component } from "react";
import Show from "./Show";
import "./Viewer.css";
import shuffle from "lodash/shuffle";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup } from "reactstrap";
import { FaCaretLeft, FaCaretRight, FaStarOfLife } from "react-icons/fa";


export default class Viewer extends Component {
  constructor(props) {
    super(props);
    
    const { content } = this.props;

    const types = Object.keys(content).sort();
    this.state = {
      currentType: types[0],
      types: types,
      q: shuffle(content[types[0]]),
      pos: 0,
      dropdown: false,
      isMobile: window.innerWidth <= 600,
      dropItems: this.createDropItems(),
      ButtonIconSize: 40 
    };
  }

  componentDidUpdate() {
    const { content } = this.props;
    let newTypes = Object.keys(content).sort();
    if (this.state.types.length !== newTypes.length) {
      this.setState({
        types: newTypes,
        currentType: newTypes[0],
        q: shuffle(content[newTypes[0]]),
        dropItems: this.createDropItems()
      })
    }
  }

  createDropItems = () => {
    const { content } = this.props
    return Object.keys(content).sort().map((contentType, index) => {
      return (<DropdownItem key={index} onClick={this.select}>{contentType}</DropdownItem>)
    })
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
    if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) {
      return;
    }
    const video = document.querySelector(".item-container > video");

    switch (e.code) {
      case "ArrowLeft":
      case "KeyA":
        return this.prev();
      case "ArrowRight":
      case "KeyD":
        return this.next();
      case "KeyF":
        if (video) {
          (
            video.requestFullscreen ||
            video.webkitRequestFullScreen ||
            video.mozRequestFullScreen ||
            video.msRequestFullScreen ||
            video.webkitEnterFullScreen ||
            (() => null)
          ).bind(video)();
        }
        return;
      case "Space":
        if (video) {
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        }
        return;
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
        q: shuffle(this.props.content[selected]),
        pos: 0
    })
  }

  handleWindowSizeChange = () => {
    this.setState({ 
      isMobile: window.innerWidth <= 600
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
    return <ButtonGroup vertical={isMobile} className="button-container">
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
    const { pos, q } = this.state;

    return (
      <div className="viewer-container">
        { this.renderButtonBar() }
        <Show link={q[pos]} />
      </div>
    );
  }
}
