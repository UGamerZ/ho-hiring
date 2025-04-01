import block from 'bem-cn-lite';
//стилистическая обёртка приложения

import './Wrapper.scss';
import {Header} from '../Header';
import {MainBody} from '../MainBody';

const b = block('wrapper');

export const Wrapper = () => {
    return (
        <div className={b()}>
            <div className={b('layout')}>
                <Header />
                <div className={b('content')}>
                    <MainBody />
                </div>
            </div>
        </div>
    );
};
