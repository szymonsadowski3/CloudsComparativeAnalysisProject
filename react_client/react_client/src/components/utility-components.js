import {Spin} from "antd";
import React from "react";

import './styles/utility-components.css';

export const UtilityComponents = props => <div className="spin-container"><Spin {...props} /></div>;

export const CenterSpin = () => <Spin size="large" className="center-spin" />;