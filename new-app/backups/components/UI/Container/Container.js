import React from 'react';
import './Container.css';

const UIConteiner = ({ children }) => (
    <div
        className="ui-container"
    >
        {children}
    </div>
)

export default UIConteiner;