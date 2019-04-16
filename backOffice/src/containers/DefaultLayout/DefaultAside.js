import React, { Component } from 'react';
import { Nav, NavItem, NavLink} from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultAside extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <Nav tabs>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '1' })}
                     onClick={() => {
                       this.toggle('1');
                     }}>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '2' })}
                     onClick={() => {
                       this.toggle('2');
                     }}>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '3' })}
                     onClick={() => {
                       this.toggle('3');
                     }}>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '4' })}
                     onClick={() => {
                       this.toggle('4');
                     }}>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '5' })}
                     onClick={() => {
                       this.toggle('5');
                     }}>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '6' })}
                     onClick={() => {
                       this.toggle('6');
                     }}>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '7' })}
                     onClick={() => {
                       this.toggle('7');
                     }}>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '8' })}
                     onClick={() => {
                       this.toggle('8');
                     }}>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '9' })}
                     onClick={() => {
                       this.toggle('9');
                     }}>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '10' })}
                     onClick={() => {
                       this.toggle('10');
                     }}>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '11' })}
                     onClick={() => {
                       this.toggle('11');
                     }}>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '12' })}
                     onClick={() => {
                       this.toggle('12');
                     }}>
            </NavLink>
          </NavItem>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultAside.propTypes = propTypes;
DefaultAside.defaultProps = defaultProps;

export default DefaultAside;
