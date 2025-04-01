/* eslint-disable no-nested-ternary */
//блок кнопок выбора дивизиона
import {Label} from '@gravity-ui/uikit';
import {SetStateAction} from 'react';
import block from 'bem-cn-lite';

const generalRevenue = Math.random() * 200 - 100;
const B2CRevenue = Math.random() * 200 - 100;
const B2BRevenue = Math.random() * 200 - 100;

const b = block('division-button-list');
import './DivisionButtons.scss';

interface Props {
    setActiveDivision: React.Dispatch<SetStateAction<string>>;
    activeDivision: string;
    amountOverall: number;
    amountB2B: number;
    amountB2C: number;
}

export const DivisionButtons = ({
    setActiveDivision,
    activeDivision,
    amountOverall,
    amountB2B,
    amountB2C,
}: Props) => {
    return (
        <div className={b()}>
            <div
                onClick={() => setActiveDivision('general')}
                style={
                    activeDivision === 'general' ? {backgroundColor: '#54D3C2', color: 'white'} : {}
                }
                className={b('division-button')}
            >
                <Label
                    size="m"
                    theme={
                        activeDivision === 'general'
                            ? 'normal'
                            : generalRevenue > 0
                              ? 'success'
                              : 'danger'
                    }
                >
                    {generalRevenue.toFixed(1)}%
                </Label>
                <h2>₽ {amountOverall}</h2>
                <span className={b('division-label')}>итоги</span>
            </div>
            <div
                onClick={() => setActiveDivision('B2B')}
                style={activeDivision === 'B2B' ? {backgroundColor: '#54D3C2', color: 'white'} : {}}
                className={b('division-button')}
            >
                <Label
                    size="m"
                    theme={
                        activeDivision === 'B2B' ? 'normal' : B2BRevenue > 0 ? 'success' : 'danger'
                    }
                >
                    {B2BRevenue.toFixed(1)}%
                </Label>
                <h2>₽ {amountB2B}</h2>
                <span className={b('division-label')}>B2B</span>
            </div>
            <div
                onClick={() => setActiveDivision('B2C')}
                style={activeDivision === 'B2C' ? {backgroundColor: '#54D3C2', color: 'white'} : {}}
                className={b('division-button')}
            >
                <Label
                    size="m"
                    theme={
                        activeDivision === 'B2C' ? 'normal' : B2CRevenue > 0 ? 'success' : 'danger'
                    }
                >
                    {B2CRevenue.toFixed(1)}%
                </Label>
                <h2>₽ {amountB2C}</h2>
                <span className={b('division-label')}>B2C</span>
            </div>
        </div>
    );
};
