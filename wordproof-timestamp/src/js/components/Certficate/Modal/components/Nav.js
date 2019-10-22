import React from 'react';
import Logo from './Logo';
import {Close} from './Icons';

export default class Nav extends React.Component {
    close = () => {
        document.dispatchEvent(new Event('wordproof.modal.close'));
    };

    render() {
        return (
            <div className={'flex flex-row items-center py-3 px-3 border-b-2 border-solid border-gray-300'}>
                <div className={'w-1/3'}>
                    <Logo/>
                </div>
                <div className={'w-2/3 flex flex-row items-center justify-end'}>
                    <span>{ this.props.title}</span>
                    <Close className={'cursor-pointer ml-3'} onClick={this.close}/>
                </div>
            </div>
        );
    }
}
