import React, { Component } from "react";
import Show from "./Show";
import "./Viewer.css";
import _ from "lodash";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup } from "reactstrap";
import { FaCaretLeft, FaCaretRight, FaRandom, FaStarOfLife } from "react-icons/fa";

export default class Viewer extends Component {
  constructor(props) {
    super(props);
    
    const { files, types} = this.props;

    //only need to be generated once
    let dropItemsLocal = [];
    for (let key in types) {
      dropItemsLocal.push(<DropdownItem key={key} onClick={this.select}>{types[key]}</DropdownItem>)
    }

    this.state = {
      currentType: types[0],
      q: _.shuffle(files[types[0]]),
      pos: 0,
      dropdown: false,
      WindowWidth: window.innerWidth,
      isMobile: window.innerWidth <= 600,
      dropItems: dropItemsLocal,
      ButtonIconSize: 40 
    };
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

  handleWindowSizeChange = () => {
    this.setState({ 
      WindowWidth: window.innerWidth,
      isMobile : this.state.WindowWidth <= 600
    });
  }

  renderButtonDropDown = () => {
    const isMobile = this.state.isMobile;
    const { dropdown, currentType, dropItems } = this.state;

    if(isMobile){//mobile style
    return (<ButtonDropdown isOpen={dropdown} toggle={this.toggle}>
      <DropdownToggle color="black">
        <FaStarOfLife size={this.state.ButtonIconSize} color='#f8f9fa'/>
      </DropdownToggle>
      <DropdownMenu>
        {dropItems}
      </DropdownMenu>
    </ButtonDropdown>)
    }else{ //desktop style
    return (<ButtonDropdown isOpen={dropdown} toggle={this.toggle}>
      <DropdownToggle caret color="black">
        {currentType}
      </DropdownToggle>
      <DropdownMenu>
        {dropItems}
      </DropdownMenu>
    </ButtonDropdown>)
    }
  }

  renderButtonBar = () => {
    const { q, pos, isMobile } = this.state;
    if(isMobile){
      return <ButtonGroup vertical block className="button-container">
        <button disabled={pos === 0} onClick={this.prev}>
          <FaCaretLeft size={this.state.ButtonIconSize} color='#f8f9fa'/>
        </button>
        <button onClick={this.shuffle}> 
          { isMobile ? <FaRandom size={this.state.ButtonIconSize} color='#f8f9fa'/>:"Shuffle" }
        </button>

        { this.renderButtonDropDown() }
        <button disabled={pos === q.length - 1} onClick={this.next}>
          <FaCaretRight size={this.state.ButtonIconSize} color='#f8f9fa'/>
        </button>
      </ButtonGroup>
    }else{
      return <ButtonGroup className="button-container">
        <button disabled={pos === 0} onClick={this.prev}>
          <FaCaretLeft size={this.state.ButtonIconSize} color='#f8f9fa'/>
        </button>
        <button onClick={this.shuffle}> 
          { isMobile ? <FaRandom size={this.state.ButtonIconSize} color='#f8f9fa'/>:"Shuffle" }  
        </button>

        { this.renderButtonDropDown() }
        <button disabled={pos === q.length - 1} onClick={this.next}>
          <FaCaretRight size={this.state.ButtonIconSize} color='#f8f9fa'/>
        </button>
      </ButtonGroup>
    }
  }

  render() {
    const { q, pos } = this.state;

    return (
      <div className="viewer-container">
        { this.renderButtonBar() }
        <div className="item-container">
          <Show key={q[pos]} link={q[pos]} />
        </div>
      </div>
    );
  }
}
