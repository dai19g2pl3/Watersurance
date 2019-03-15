//eslint-disable-next-line
import React, { Component, lazy, Suspense } from 'react';
// eslint-disable-next-line
import { Bar, Line } from 'react-chartjs-2';
import {
  // eslint-disable-next-line
  Badge,
  // eslint-disable-next-line
  Button,
  // eslint-disable-next-line
  ButtonDropdown,
  // eslint-disable-next-line
  ButtonGroup,
  // eslint-disable-next-line
  ButtonToolbar,
  // eslint-disable-next-line
  Card,
  // eslint-disable-next-line
  CardBody,
  // eslint-disable-next-line
  CardFooter,
  // eslint-disable-next-line
  CardHeader,
  // eslint-disable-next-line
  CardTitle,
  // eslint-disable-next-line
  Col,
  // eslint-disable-next-line
  Dropdown,
  // eslint-disable-next-line
  DropdownItem,
  // eslint-disable-next-line
  DropdownMenu,
  // eslint-disable-next-line
  DropdownToggle,
  // eslint-disable-next-line
  Progress,
  // eslint-disable-next-line
  Row,
  // eslint-disable-next-line
  Table,
} from 'reactstrap';
// eslint-disable-next-line
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
// eslint-disable-next-line
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
// eslint-disable-next-line
const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));
// eslint-disable-next-line
const brandPrimary = getStyle('--primary')
// eslint-disable-next-line
const brandSuccess = getStyle('--success')
// eslint-disable-next-line
const brandInfo = getStyle('--info')
// eslint-disable-next-line
const brandWarning = getStyle('--warning')
// eslint-disable-next-line
const brandDanger = getStyle('--danger')

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    return (
      <div className="animated fadeIn">
      </div>
    );
  }
}

export default Dashboard;
