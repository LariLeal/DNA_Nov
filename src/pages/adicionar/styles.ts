import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  content: {
    padding: 20,
    paddingBottom: 40
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
    marginTop: 30
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6
  },
  button: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#007AFF',
    marginTop: 20
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 20
  }
});