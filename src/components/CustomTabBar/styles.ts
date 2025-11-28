import { StyleSheet } from 'react-native';
import { themas } from '../../global/themes';

export const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    backgroundColor: themas.colors.primary,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
    color: '#666',
  },
  activeIcon: {
    color: '#fff',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  activeLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
});