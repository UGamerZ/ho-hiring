//блок случайной генерации данных для приложения

export const generateData = () => {
    //образцы типов, дивизионов, массива данных
    const types = ['income', 'expanses', 'revenue', 'debt'];
    const divisions = ['B2B', 'B2C'];
    const data: {
        division: string;
        date: string;
        amount: number;
        type: string;
    }[] = [];

    //генерируем случайное колличество транзакций (от 50 до 70)
    for (let i = 0; i < Math.round(Math.random() * 20 + 50); i++) {
        data.push({
            division: divisions[Math.round(Math.random())],
            //случайная дата в диапазоне текущего года (можно поставить ограничение на Date.now())
            //вместо Date.parse('2025-12-31')
            date: new Date(
                Math.round(
                    Math.random() * (Date.parse('2025-12-31') - Date.parse('2025-01-01')) +
                        Date.parse('2025-01-01'),
                ),
            ).toString(),
            //случайная сумма транзакции (от 500тыс до 10тыс)
            amount: Math.round(Math.random() * 490000 + 10000),
            type: types[Math.round(Math.random() * 3)],
        });
    }
    return data;
};
