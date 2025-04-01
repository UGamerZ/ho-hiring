import block from 'bem-cn-lite';
//тело приложения

const b = block('main-body');
import './MainBody.scss';
import {useState} from 'react';
import {DivisionButtons} from '../DivisionButtons';
import {DebtBlock} from '../DebtBlock';
import {LineChartBlock} from '../LineChart';
import {generateData} from '../generateData';

const data = generateData();

export const MainBody = () => {
    //корневые переменные для взаимодействия блока кнопок дивизиона и графика
    const [activeDivision, setActiveDivision] = useState('general');
    const [amountOverall, setAmountOverall] = useState(0);
    const [amountB2B, setAmountB2B] = useState(0);
    const [amountB2C, setAmountB2C] = useState(0);

    return (
        <div className={b()}>
            <div className={b('container')}>
                <h2>Сводный отчёт</h2>
                <div className={b('flex')}>
                    <div className={b('statistics-box')}>
                        <DivisionButtons
                            activeDivision={activeDivision}
                            setActiveDivision={setActiveDivision}
                            amountB2B={amountB2B}
                            amountB2C={amountB2C}
                            amountOverall={amountOverall}
                        />
                        <LineChartBlock
                            Data={data}
                            activeDivision={activeDivision}
                            setAmountOverall={setAmountOverall}
                            setAmountB2B={setAmountB2B}
                            setAmountB2C={setAmountB2C}
                        />
                    </div>
                    <DebtBlock Data={data} />
                </div>
            </div>
        </div>
    );
};
