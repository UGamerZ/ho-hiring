/* eslint-disable no-nested-ternary */
import block from 'bem-cn-lite';
//блок с графиком и его функционалом

const b = block('line-chart-block');
import './LineChartBlock.scss';
import {useEffect, useState} from 'react';
import {LineChart, ShowMarkParams} from '@mui/x-charts';
import {Tab, TabList, TabProvider, User} from '@gravity-ui/uikit';

export const LineChartBlock = ({
    Data,
    activeDivision,
    setAmountOverall,
    setAmountB2B,
    setAmountB2C,
}: {
    Data: {division: string; date: string; amount: number; type: string}[];
    activeDivision: string;
    setAmountOverall: React.Dispatch<React.SetStateAction<number>>;
    setAmountB2B: React.Dispatch<React.SetStateAction<number>>;
    setAmountB2C: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const [divisionFilteredData, setDivisionFilteredData] = useState(Data); //фильтр по дивизиону
    const [periodFilteredData, setPeriodFilteredData] = useState(divisionFilteredData); //фильтр по периоду

    //обновляем данные при изменении Data
    useEffect(() => {
        if (activeDivision === 'general') {
            setDivisionFilteredData(Data.sort(compareDate));
        } else {
            setDivisionFilteredData(
                Data.filter((item) => item.division === activeDivision).sort(compareDate),
            );
        }
    }, [Data, activeDivision]);

    const [currentFilter, setCurrentFilter] = useState('year'); //переменная состояния переключателя периода

    //фильтруем данные после изменения периода
    useEffect(() => {
        if (currentFilter === 'year') {
            setPeriodFilteredData(
                divisionFilteredData.filter(
                    (item) =>
                        new Date(Date.parse(item.date)).getFullYear() ===
                        new Date(Date.now()).getFullYear(),
                ),
            );
        }
        if (currentFilter === 'month') {
            setPeriodFilteredData(
                divisionFilteredData.filter(
                    (item) =>
                        new Date(Date.parse(item.date)).getMonth() ===
                            new Date(Date.now()).getMonth() &&
                        new Date(Date.parse(item.date)).getFullYear() ===
                            new Date(Date.now()).getFullYear(),
                ),
            );
        }
        if (currentFilter === 'week') {
            setPeriodFilteredData(
                divisionFilteredData.filter(
                    (item) =>
                        new Date(Date.now()).getDate() -
                            new Date(Date.parse(item.date)).getDate() <=
                            7 &&
                        new Date(Date.parse(item.date)).getMonth() ===
                            new Date(Date.now()).getMonth() &&
                        new Date(Date.parse(item.date)).getFullYear() ===
                            new Date(Date.now()).getFullYear(),
                ),
            );
        }
    }, [currentFilter, divisionFilteredData]);

    //сравниваем две ближайшие даты для сортировки
    function compareDate(
        item1: {
            division: string;
            date: string;
            amount: number;
            type: string;
        },
        item2: {
            division: string;
            date: string;
            amount: number;
            type: string;
        },
    ) {
        if (Date.parse(item1.date) < Date.parse(item2.date)) {
            return -1;
        }
        if (Date.parse(item1.date) > Date.parse(item2.date)) {
            return 1;
        }
        return 0;
    }

    //переменные для графиков
    let expansesAmountArr = periodFilteredData.filter((item) => item.type === 'expanses');
    let incomeAmountArr = periodFilteredData.filter((item) => item.type === 'income');
    let revenueAmountArr = periodFilteredData.filter((item) => item.type === 'revenue');
    let debtAmountArr = periodFilteredData.filter((item) => item.type === 'debt');

    //преобразуем данные из массива объектов в упорядоченные суммы транзакций для отображения в графике
    function parseToChart(
        dataArr: {
            division: string;
            date: string;
            amount: number;
            type: string;
        }[],
        filter: string,
    ) {
        const finalArr: number[] = [];
        if (filter === 'year') {
            for (let month = 0; month < 12; month++) {
                let sum = 0;
                if (
                    month !== 0 &&
                    dataArr.filter((item) => new Date(item.date).getMonth() === month).length === 0
                ) {
                    sum = finalArr[month - 1];
                }
                for (let i = 0; i < dataArr.length; i++) {
                    if (new Date(dataArr[i].date).getMonth() === month) {
                        sum += dataArr[i].amount;
                    }
                }
                finalArr.push(sum);
            }
            return finalArr;
        }
        if (filter === 'month') {
            for (let day = 1; day <= 31; day++) {
                let sum = 0;
                if (
                    day !== 1 &&
                    dataArr.filter((item) => new Date(item.date).getDate() === day).length === 0
                ) {
                    sum = finalArr[day - 2];
                }
                for (let i = 0; i < dataArr.length; i++) {
                    if (new Date(dataArr[i].date).getDate() === day) {
                        sum += dataArr[i].amount;
                    }
                }
                finalArr.push(sum);
            }
            return finalArr;
        }
        if (filter === 'week') {
            for (let day = 1; day <= 7; day++) {
                let sum = 0;
                if (
                    day !== 1 &&
                    dataArr.filter(
                        (item) =>
                            new Date(Date.now()).getDate() - new Date(item.date).getDate() === day,
                    ).length === 0
                ) {
                    sum = finalArr[day - 2];
                }
                for (let i = 0; i < dataArr.length; i++) {
                    if (
                        new Date(Date.now()).getDate() - new Date(dataArr[i].date).getDate() ===
                        day
                    ) {
                        sum += dataArr[i].amount;
                    }
                }
                finalArr.push(sum);
            }
            return finalArr;
        }
        return [];
    }

    //считаем график итога
    function calcOverall(
        DebtAmountArr: {
            division: string;
            date: string;
            amount: number;
            type: string;
        }[],
        RevenueAmountArr: {
            division: string;
            date: string;
            amount: number;
            type: string;
        }[],
        IncomeAmountArr: {
            division: string;
            date: string;
            amount: number;
            type: string;
        }[],
        ExpansesAmountArr: {
            division: string;
            date: string;
            amount: number;
            type: string;
        }[],
        filter: string,
    ) {
        const overallAmountArr: number[] = [];
        for (let i = 0; i < parseToChart(DebtAmountArr, filter).length; i++) {
            overallAmountArr[i] =
                parseToChart(RevenueAmountArr, filter)[i] +
                parseToChart(IncomeAmountArr, filter)[i] -
                parseToChart(ExpansesAmountArr, filter)[i] -
                parseToChart(DebtAmountArr, filter)[i];
        }
        return overallAmountArr;
    }

    //пересчитываем переменные для графиков при изменении data
    useEffect(() => {
        expansesAmountArr = periodFilteredData.filter((item) => item.type === 'expanses');
        incomeAmountArr = periodFilteredData.filter((item) => item.type === 'income');
        revenueAmountArr = periodFilteredData.filter((item) => item.type === 'revenue');
        debtAmountArr = periodFilteredData.filter((item) => item.type === 'debt');
    }, [periodFilteredData]);

    //переменные для оси X
    const months = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ];
    const days = () => {
        const arr: number[] = [];
        for (let i = 1; i <= 31; i++) {
            arr.push(i);
        }
        return arr;
    };
    const weekDays = [1, 2, 3, 4, 5, 6, 7];

    //конфигурация точек графика, чтобы их не было видно без наведения
    const showMark = (params: ShowMarkParams) => {
        const {position} = params as ShowMarkParams<number>;
        return position === 0;
    };

    //функция для исключения из массива транзакций при подсчёте одинаковых значений
    //(для правильного подсчёта итоговой суммы)
    function onlyUnique(value: number, index: number, array: number[]) {
        return array.indexOf(value) === index;
    }

    //считаем суммы транзакций по дивизионам для блока кнопок и передаём их
    function calcForDivButtons(division: string) {
        let filteredArr: {
            division: string;
            date: string;
            amount: number;
            type: string;
        }[] = [];
        if (division === 'general') {
            filteredArr = Data;
        } else {
            filteredArr = Data.filter((item) => item.division === division);
        }
        filteredArr = filteredArr.filter(
            (item) =>
                new Date(Date.parse(item.date)).getFullYear() ===
                new Date(Date.now()).getFullYear(),
        );
        const expanses = filteredArr.filter((item) => item.type === 'expanses');
        const income = filteredArr.filter((item) => item.type === 'income');
        const revenue = filteredArr.filter((item) => item.type === 'revenue');
        const debt = filteredArr.filter((item) => item.type === 'debt');
        return calcOverall(debt, revenue, income, expanses, 'year')
            .filter(onlyUnique)
            .reduce((partialSum, a) => partialSum + a, 0);
    }

    setAmountB2B(calcForDivButtons('B2B'));
    setAmountB2C(calcForDivButtons('B2C'));
    setAmountOverall(calcForDivButtons('general'));

    return (
        <div className={b()}>
            <div>
                <div className={b('outside-container')}>
                    <h3>Общая статистика</h3>
                    <TabProvider value={currentFilter} onUpdate={setCurrentFilter}>
                        <TabList>
                            <Tab className={b('tab')} value="week">
                                Неделя (в пределах месяца)
                            </Tab>
                            <Tab className={b('tab')} value="month">
                                Месяц
                            </Tab>
                            <Tab className={b('tab')} value="year">
                                Год
                            </Tab>
                        </TabList>
                    </TabProvider>
                </div>
                <LineChart
                    className={b('chart')}
                    height={250}
                    xAxis={[
                        {
                            scaleType: 'band',
                            data:
                                currentFilter === 'year'
                                    ? months
                                    : currentFilter === 'month'
                                      ? days()
                                      : weekDays,
                            id: 'debt',
                        },
                    ]}
                    leftAxis={null}
                    slotProps={{legend: {padding: -1}}}
                    series={[
                        {
                            data: parseToChart(debtAmountArr, currentFilter),
                            label: 'задолжность',
                            showMark,
                        },
                        {
                            data: parseToChart(revenueAmountArr, currentFilter),
                            label: 'выручка',
                            showMark,
                        },
                        {
                            data: parseToChart(incomeAmountArr, currentFilter),
                            label: 'прибыль',
                            showMark,
                        },
                        {
                            data: parseToChart(expansesAmountArr, currentFilter),
                            label: 'затраты',
                            showMark,
                        },
                        {
                            data: calcOverall(
                                debtAmountArr,
                                revenueAmountArr,
                                incomeAmountArr,
                                expansesAmountArr,
                                currentFilter,
                            ),
                            label: 'итог',
                            showMark,
                        },
                    ]}
                />
                <div className={b('outside-container')}>
                    <User
                        avatar={{backgroundColor: 'rgb(2, 178, 175)', text: ''}}
                        size="xs"
                        name={
                            '₽' +
                            parseToChart(debtAmountArr, currentFilter)
                                .filter(onlyUnique)
                                .reduce((partialSum, a) => partialSum + a, 0)
                        }
                    />
                    <User
                        avatar={{backgroundColor: 'rgb(46, 150, 255)', text: ''}}
                        size="xs"
                        name={
                            '₽' +
                            parseToChart(revenueAmountArr, currentFilter)
                                .filter(onlyUnique)
                                .reduce((partialSum, a) => partialSum + a, 0)
                        }
                    />
                    <User
                        avatar={{backgroundColor: 'rgb(184, 0, 216)', text: ''}}
                        size="xs"
                        name={
                            '₽' +
                            parseToChart(incomeAmountArr, currentFilter)
                                .filter(onlyUnique)
                                .reduce((partialSum, a) => partialSum + a, 0)
                        }
                    />
                    <User
                        avatar={{backgroundColor: 'rgb(96, 0, 155)', text: ''}}
                        size="xs"
                        name={
                            '₽' +
                            parseToChart(expansesAmountArr, currentFilter)
                                .filter(onlyUnique)
                                .reduce((partialSum, a) => partialSum + a, 0)
                        }
                    />
                    <User
                        avatar={{backgroundColor: 'rgb(39, 49, 200)', text: ''}}
                        size="xs"
                        name={
                            '₽' +
                            calcOverall(
                                debtAmountArr,
                                revenueAmountArr,
                                incomeAmountArr,
                                expansesAmountArr,
                                currentFilter,
                            )
                                .filter(onlyUnique)
                                .reduce((partialSum, a) => partialSum + a, 0)
                        }
                    />
                </div>
            </div>
        </div>
    );
};
