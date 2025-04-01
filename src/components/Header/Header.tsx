import {ArrowToggle, Button, Tab, TabList, TabProvider, User} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
//блок заголовка со вкладками, пользователем

const b = block('header');
import './Header.scss';

import {useEffect, useState} from 'react';

export const Header = () => {
    const [activeTab, setActiveTab] = useState('2');
    const [activeTabIndex, setActiveTabIndex] = useState(2);

    //переключение вкладок по кнопкам, хук useEffect() используется чтобы убедиться, что индекс активной вкладки успел измениться
    const nextTab = () => {
        if (activeTabIndex < 3) {
            setActiveTabIndex(activeTabIndex + 1);
        }
    };
    const prevTab = () => {
        if (activeTabIndex > 1) {
            setActiveTabIndex(activeTabIndex - 1);
        }
    };

    useEffect(() => {
        setActiveTab(activeTabIndex.toString());
    }, [activeTabIndex]);
    useEffect(() => {
        setActiveTabIndex(Number.parseInt(activeTab, 10));
    }, [activeTab]);

    return (
        <div className={b()}>
            <div className={b('button-container')}>
                <Button onClick={prevTab}>
                    <ArrowToggle direction="left" />
                </Button>
                <Button onClick={nextTab}>
                    <ArrowToggle direction="right" />
                </Button>
            </div>
            <TabProvider value={activeTab} onUpdate={setActiveTab}>
                <TabList>
                    <Tab className={b('tab')} value="1">
                        Свод данных по сотрудникам
                    </Tab>
                    <Tab className={b('tab')} value="2">
                        Сводный отчёт внутри компании
                    </Tab>
                    <Tab className={b('tab')} value="3">
                        Сводный отчёт по сделкам
                    </Tab>
                </TabList>
            </TabProvider>
            <User
                avatar="https://scarlet-acute-wildfowl-532.mypinata.cloud/ipfs/bafkreidgplfjzjeb5fioyljkagus2vyns4bdnvyeyc34noeysb2k3upsca?pinataGatewayToken=JHH6XsTDaT1SdpSD2qazwIkmfAnHwHDR6KEZgIqUEJFrUq4GSL4h3yw1boz6kqI2"
                name="Kristina🐰"
                description="менеджер продаж"
                size="l"
            />
        </div>
    );
};
