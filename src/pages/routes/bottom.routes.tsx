import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Inicio from '../inicio';
import Usuario from '../usuario';
import CustomTabBar from '../../components/CustomTabBar';
import {MissignProvider} from '../../context/authContext_desa';

const Tab =createBottomTabNavigator();

export default function BottomRoutes() {
    return (
        <MissignProvider>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false
                }}
                tabBar={props => <CustomTabBar {...props} />}
                initialRouteName='Inicio'
            >
                <Tab.Screen
                    name='Inicio'
                    component={Inicio}
                />
                <Tab.Screen
                    name='Usuario'
                    component={Usuario}
                />
            </Tab.Navigator>
        </MissignProvider>
    )
}