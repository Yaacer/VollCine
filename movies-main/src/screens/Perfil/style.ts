import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  plan: {
    fontSize: 18,
    color: '#aaa',
    marginBottom: 20,
  },
  personalInfo: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 16,
    color: '#aaa',
  },
  infoValue: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#333',
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  separator: {
    height: 1,
    backgroundColor: '#444',
    width: '100%',
    marginVertical: 10,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    height: '70%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default styles;
