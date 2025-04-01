import {AsideHeader} from '@gravity-ui/navigation';
//корневой элемент приложения, обёрнутый в оболочку бокового меню

import h2o from './assets/icons/h20.svg?react';
import menuic1 from './assets/icons/menuicon1.svg?react';
import menuic2 from './assets/icons/menuicon2.svg?react';
import menuic3 from './assets/icons/menuicon3.svg?react';
import menuic4 from './assets/icons/menuicon4.svg?react';
import menuic5 from './assets/icons/menuicon5.svg?react';
import menuic6 from './assets/icons/menuicon6.svg?react';
import settings from './assets/icons/settings.svg?react';

import {Wrapper} from './components/Wrapper';
import {ThemeProvider} from '@gravity-ui/uikit';

const App = () => {
    return (
        <ThemeProvider theme={'light'}>
            <AsideHeader
                className="content"
                menuItems={[
                    //массив кнопок меню, ручная установка светлой темы выше
                    //для корректного отображения всех элементов библиотеки компонентов
                    {
                        icon: menuic1,
                        id: '',
                        title: 'Иконка меню',
                    },
                    {
                        icon: menuic2,
                        id: '',
                        title: 'Иконка меню',
                    },
                    {
                        icon: menuic3,
                        id: '',
                        title: 'Иконка меню',
                    },
                    {
                        icon: menuic4,
                        id: '',
                        title: 'Иконка меню',
                    },
                    {
                        icon: menuic5,
                        id: '',
                        title: 'Иконка меню',
                    },
                    {
                        icon: menuic6,
                        id: '',
                        title: 'Иконка меню',
                        current: true,
                    },
                    {
                        icon: settings,
                        id: '',
                        title: 'Настройки',
                    },
                ]}
                logo={{icon: h2o, text: '', iconSize: 35}}
                compact={true}
                hideCollapseButton={true}
                renderContent={() => <Wrapper />}
            />
        </ThemeProvider>
    );
};

export default App;
