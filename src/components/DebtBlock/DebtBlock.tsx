import block from 'bem-cn-lite';

const b = block('debt-block');
import './DebtBlock.scss';
import {User} from '@gravity-ui/uikit';

//блок проблемных зон. Не совсем понял про какой лимит идёт речь, поэтому использовал просто транзакции с типом: задолжность
//но в любой момент эти данные можно заменить на другие

export const DebtBlock = ({
    Data,
}: {
    Data: {division: string; date: string; amount: number; type: string}[];
}) => {
    //создаём массив элементов с зонами, если сумма транзакции больше 50тыс, окрашиваем в красный
    //вместо наименования зоны используем дивизион транзакции
    const debts = Data.filter((item) => item.type === 'debt').map((item) => (
        <User
            className={b('debt')}
            name={'₽' + item.amount}
            description={item.division}
            avatar={
                item.amount > 50000
                    ? {text: 'I', backgroundColor: '#FC5C65', color: 'white'}
                    : {text: 'I', backgroundColor: '#F7B731', color: 'white'}
            }
        />
    ));

    //выводим первые 10 зон
    return (
        <div className={b()}>
            <h3>Проблемные зоны</h3>
            <div className={b('container')}>
                {debts[0]}
                {debts[1]}
                {debts[2]}
                {debts[3]}
                {debts[4]}
                {debts[5]}
                {debts[6]}
                {debts[7]}
                {debts[8]}
                {debts[9]}
            </div>
        </div>
    );
};
